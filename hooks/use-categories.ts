"use client";
import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "@/lib/query-keys";
import { categoryService } from "@/services/finance/category.service";
export function useCategories(userId?: string) { return useQuery({ queryKey: categoryKeys.list(userId ?? ""), queryFn: () => categoryService.list(userId!), enabled: Boolean(userId) }); }
