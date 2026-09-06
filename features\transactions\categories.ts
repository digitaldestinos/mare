import type { DefaultCategory } from "@/types/finance";

export const defaultCategories: readonly DefaultCategory[] = [
  { key: "salary", name: "Salário", type: "income" },
  { key: "freelance", name: "Freelance", type: "income" },
  { key: "investments", name: "Investimentos", type: "income" },
  { key: "food", name: "Alimentação", type: "expense" },
  { key: "housing", name: "Moradia", type: "expense" },
  { key: "transport", name: "Transporte", type: "expense" },
  { key: "health", name: "Saúde", type: "expense" },
  { key: "education", name: "Educação", type: "expense" },
  { key: "leisure", name: "Lazer", type: "expense" },
  { key: "shopping", name: "Compras", type: "expense" },
  { key: "services", name: "Serviços", type: "expense" },
  { key: "other", name: "Outros", type: "expense" },
];
