"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, FolderTree, File, X } from "lucide-react";
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
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    for (const parent of categories) {
      if (parent.id === value || parent.children.some((c) => c.id === value)) {
        initial.add(parent.id);
      }
    }
    return initial;
  });

  const selectedName = (() => {
    for (const parent of categories) {
      if (parent.id === value) return parent.name;
      for (const child of parent.children) {
        if (child.id === value) return `${parent.name} / ${child.name}`;
      }
    }
    return null;
  })();

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-2">
      {selectedName && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-md text-sm font-medium">
          <span className="flex-1 truncate">{selectedName}</span>
          <button type="button" onClick={() => onChange("")} className="hover:text-primary/70">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <div className="border rounded-md max-h-60 overflow-y-auto p-1.5 space-y-0.5">
        {categories.map((parent) => {
          const isExpanded = expanded.has(parent.id);
          const hasChildren = parent.children.length > 0;

          return (
            <div key={parent.id}>
              <div className="flex items-center gap-1">
                {hasChildren ? (
                  <button
                    type="button"
                    onClick={() => toggleExpand(parent.id)}
                    className="p-0.5 rounded hover:bg-muted"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </button>
                ) : (
                  <span className="w-5" />
                )}
                <button
                  type="button"
                  onClick={() => onChange(parent.id)}
                  className={cn(
                    "flex-1 flex items-center gap-2 text-left px-2 py-1.5 rounded text-sm font-medium hover:bg-muted transition-colors",
                    value === parent.id && "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  <FolderTree className="h-3.5 w-3.5 flex-shrink-0" />
                  {parent.name}
                </button>
              </div>

              {hasChildren && isExpanded && (
                <div className="ml-5 pl-2 border-l border-muted space-y-0.5">
                  {parent.children.map((child) => (
                    <button
                      key={child.id}
                      type="button"
                      onClick={() => onChange(child.id)}
                      className={cn(
                        "w-full flex items-center gap-2 text-left px-2 py-1.5 rounded text-sm hover:bg-muted transition-colors",
                        value === child.id && "bg-primary text-primary-foreground hover:bg-primary/90"
                      )}
                    >
                      <File className="h-3.5 w-3.5 flex-shrink-0" />
                      {child.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
