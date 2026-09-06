import type { Category } from "@/types/finance";
import { CategoryRepository } from "@/repositories/finance/category.repository";
export class CategoryService { constructor(private readonly repository = new CategoryRepository()) {} list(userId: string): Promise<Category[]> { return this.repository.listForUser(userId); } }
export const categoryService = new CategoryService();
