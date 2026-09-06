import type { CurrencyCode, QuickCaptureResult } from "@/types/finance";

type CategoryRule = { terms: string[]; category: string };

const categoryRules: CategoryRule[] = [
  { terms: ["uber", "99", "combustÃ­vel", "combustivel", "gasolina", "posto", "metrÃ´", "metro", "Ã´nibus", "onibus"], category: "Transporte" },
  { terms: ["ifood", "i food", "rappi", "restaurante", "lanche"], category: "AlimentaÃ§Ã£o" },
  { terms: ["spotify", "netflix", "prime", "assinatura"], category: "Assinatura" },
  { terms: ["tim", "vivo", "claro", "celular", "telefone"], category: "Celular" },
  { terms: ["mercado", "supermercado", "feira"], category: "Mercado" },
  { terms: ["farmÃ¡cia", "farmacia", "remÃ©dio", "remedio", "consulta"], category: "SaÃºde" },
];

const incomeTerms = ["recebi", "receita", "salÃ¡rio", "salario", "pix recebido", "entrada", "rendimento"];

function parseAmount(source: string): { amount: number; raw: string } | null {
  const matches = [...source.matchAll(/(?:r\$\s*)?(\d{1,3}(?:\.\d{3})*(?:,\d{1,2})?|\d+(?:,\d{1,2})?)/gi)];
  const match = matches.at(-1);
  if (!match?.[1]) return null;
  const raw = match[1];
  const normalized = raw.includes(",") ? raw.replace(/\./g, "").replace(",", ".") : raw;
  const amount = Number(normalized);
  return Number.isFinite(amount) && amount > 0 ? { amount, raw } : null;
}

function findCategory(source: string, type: QuickCaptureResult["type"]): { category: string; confidence: QuickCaptureResult["confidence"] } {
  const normalized = source.toLocaleLowerCase("pt-BR");
  if (type === "income") return { category: "Receita", confidence: "high" };
  const rule = categoryRules.find(({ terms }) => terms.some((term) => normalized.includes(term)));
  return rule ? { category: rule.category, confidence: "high" } : { category: "Outros", confidence: "medium" };
}

function cleanDescription(source: string, rawAmount: string) {
  return source.replace(new RegExp(`r\\$?\\s*${rawAmount.replace(/[.,]/g, "[.,]")}`, "i"), "").replace(/\b\d+x\b/gi, "").replace(/\s+/g, " ").trim() || "MovimentaÃ§Ã£o rÃ¡pida";
}

export function parseQuickCapture(source: string, currency: CurrencyCode = "BRL"): QuickCaptureResult | null {
  const value = source.trim();
  const parsedAmount = parseAmount(value);
  if (!parsedAmount) return null;
  const normalized = value.toLocaleLowerCase("pt-BR");
  const type: QuickCaptureResult["type"] = incomeTerms.some((term) => normalized.includes(term)) ? "income" : "expense";
  const categoryResult = findCategory(value, type);
  return { source: value, description: cleanDescription(value, parsedAmount.raw), amount: parsedAmount.amount, currency, type, category: categoryResult.category, category_type: type === "income" ? "income" : "expense", confidence: categoryResult.confidence, needs_confirmation: categoryResult.confidence !== "high" };
}

