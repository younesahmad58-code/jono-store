"use client";

import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  children: { id: string; name: string }[];
}

interface CategoryTreeSelectorProps {
  categories: Category[];
  value: string;
  onChange: (id: string) => void;
}

export function CategoryTreeSelector({ categories, value, onChange }: CategoryTreeSelectorProps) {
  return (
    <div className="border rounded-md max-h-60 overflow-y-auto p-2 space-y-1">
      {categories.map((parent) => (
        <div key={parent.id}>
          <button
            type="button"
            onClick={() => onChange(parent.id)}
            className={cn(
              "w-full text-left px-3 py-1.5 rounded text-sm font-medium hover:bg-muted transition-colors",
              value === parent.id && "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            {parent.name}
          </button>
          {parent.children.map((child) => (
            <button
              key={child.id}
              type="button"
              onClick={() => onChange(child.id)}
              className={cn(
                "w-full text-left pl-8 pr-3 py-1.5 rounded text-sm hover:bg-muted transition-colors",
                value === child.id && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              {child.name}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
