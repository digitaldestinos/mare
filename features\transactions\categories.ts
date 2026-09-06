import type { DefaultCategory } from "@/types/finance";

export const defaultCategories: readonly DefaultCategory[] = [
  { key: "salary", name: "SalÃ¡rio", type: "income" },
  { key: "freelance", name: "Freelance", type: "income" },
  { key: "investments", name: "Investimentos", type: "income" },
  { key: "food", name: "AlimentaÃ§Ã£o", type: "expense" },
  { key: "housing", name: "Moradia", type: "expense" },
  { key: "transport", name: "Transporte", type: "expense" },
  { key: "health", name: "SaÃºde", type: "expense" },
  { key: "education", name: "EducaÃ§Ã£o", type: "expense" },
  { key: "leisure", name: "Lazer", type: "expense" },
  { key: "shopping", name: "Compras", type: "expense" },
  { key: "services", name: "ServiÃ§os", type: "expense" },
  { key: "other", name: "Outros", type: "expense" },
];

