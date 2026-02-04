import * as React from "react";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type Crumb = {
  label: React.ReactNode;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
};

type BreadcrumbProps = {
  items: Crumb[];
  className?: string;
  separator?: React.ReactNode;
  "aria-label"?: string;
};

function Breadcrumb({
  items,
  className,
  separator = <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />,
  "aria-label": ariaLabel = "Breadcrumb",
}: BreadcrumbProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={cn("flex items-center gap-1 text-sm text-muted-foreground", className)}
    >
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <li
                className={cn(
                  "inline-flex items-center gap-1 rounded-md px-1 py-0.5",
                  isLast ? "text-foreground font-medium" : "hover:text-foreground"
                )}
              >
                {item.icon && <span className="text-muted-foreground">{item.icon}</span>}
                {item.href || item.onClick ? (
                  <a
                    href={item.href}
                    onClick={item.onClick}
                    className={cn(
                      "inline-flex items-center gap-1",
                      !isLast && "hover:underline hover:underline-offset-4"
                    )}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span aria-current={isLast ? "page" : undefined}>{item.label}</span>
                )}
              </li>
              {!isLast && <span className="px-0.5">{separator}</span>}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

export { Breadcrumb };
