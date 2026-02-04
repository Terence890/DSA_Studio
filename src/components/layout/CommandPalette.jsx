import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Command, Keyboard, Search, X } from "lucide-react";

const isMac =
  typeof navigator !== "undefined" &&
  navigator.userAgent.toLowerCase().includes("mac");

const defaultShortcut = isMac ? "⌘K" : "Ctrl K";

export default function CommandPalette({
  open,
  onClose,
  actions = [],
  title = "Quick actions",
  placeholder = "Search destinations or actions…",
  hotkeyHint = defaultShortcut,
}) {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return actions;
    return actions.filter((item) => {
      const haystack = [
        item.label,
        item.group,
        ...(item.keywords || []),
        item.shortcut,
        item.hint,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalized);
    });
  }, [actions, query]);

  const grouped = useMemo(() => {
    const map = new Map();
    filtered.forEach((item) => {
      const key = item.group || "General";
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(item);
    });
    return Array.from(map.entries());
  }, [filtered]);

  const handleSelect = useCallback(
    (item) => {
      if (item.onSelect) item.onSelect();
      if (item.href) window.open(item.href, item.target || "_self");
      onClose?.();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((idx) =>
          Math.min(idx + 1, Math.max(filtered.length - 1, 0)),
        );
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((idx) => Math.max(idx - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const item =
          filtered[Math.min(activeIndex, Math.max(filtered.length - 1, 0))];
        if (item) handleSelect(item);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, activeIndex, handleSelect, onClose]);

  if (!open) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose?.();
        }}
      />
      <div className="relative z-10 mx-auto mt-20 w-full max-w-2xl px-4">
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-xl ring-1 ring-border/60">
          <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <div className="inline-flex items-center justify-center rounded-lg bg-primary/10 p-2 text-primary ring-1 ring-primary/20">
                <Command className="h-4 w-4" />
              </div>
              {title}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="hidden sm:inline-flex items-center gap-1 rounded-md border border-border/70 px-2 py-1">
                <Keyboard className="h-3 w-3" />
                {hotkeyHint}
              </span>
              <button
                type="button"
                className="inline-flex size-8 items-center justify-center rounded-md border border-border/70 text-muted-foreground hover:bg-muted"
                onClick={onClose}
                aria-label="Close command palette"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="border-b border-border/60 px-4 py-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="pl-9 text-sm"
              />
            </div>
          </div>

          <div className="max-h-[360px] overflow-y-auto px-1 pb-3 pt-2">
            {filtered.length === 0 && (
              <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                No results for “{query}”.
              </div>
            )}

            {grouped.map(([group, items]) => (
              <div key={group} className="py-1">
                <div className="flex items-center justify-between px-3 pb-1 text-[11px] uppercase tracking-wide text-muted-foreground">
                  <span>{group}</span>
                </div>
                <Separator className="mb-1" />
                <ul className="space-y-1">
                  {items.map((item) => {
                    const index = filtered.indexOf(item);
                    const isActive = index === activeIndex;
                    return (
                      <li key={item.id || item.label}>
                        <button
                          type="button"
                          onClick={() => handleSelect(item)}
                          className={cn(
                            "group flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left transition-all",
                            "hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            isActive
                              ? "bg-muted text-foreground"
                              : "text-muted-foreground",
                          )}
                          data-state={isActive ? "active" : "inactive"}
                        >
                          <div className="flex items-center gap-3">
                            {item.icon && (
                              <span className="text-foreground/80">
                                {item.icon}
                              </span>
                            )}
                            <div className="flex flex-col">
                              <span
                                className={cn(
                                  "text-sm font-medium",
                                  isActive && "text-foreground",
                                )}
                              >
                                {item.label}
                              </span>
                              {item.hint && (
                                <span className="text-xs text-muted-foreground">
                                  {item.hint}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.badge && (
                              <Badge
                                variant="outline"
                                className="px-2 py-0 text-[11px]"
                              >
                                {item.badge}
                              </Badge>
                            )}
                            {item.shortcut && (
                              <span className="rounded-md border border-border/60 bg-card px-2 py-1 text-[11px] text-muted-foreground">
                                {item.shortcut}
                              </span>
                            )}
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
