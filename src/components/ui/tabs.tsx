import * as React from "react";

import { cn } from "@/lib/utils";

type TabsContextValue = {
  value: string | undefined;
  setValue: (next: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

type TabsProps = React.PropsWithChildren<{
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}>;

function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
  children,
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<
    string | undefined
  >(defaultValue);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const setValue = React.useCallback(
    (next: string) => {
      if (!isControlled) {
        setUncontrolledValue(next);
      }
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={cn("flex w-full flex-col gap-2", className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

type TabsListProps = React.ComponentPropsWithoutRef<"div">;

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="tablist"
      className={cn(
        "inline-flex items-center justify-start gap-1 rounded-lg bg-muted p-1 text-muted-foreground shadow-xs",
        className,
      )}
      {...props}
    />
  ),
);
TabsList.displayName = "TabsList";

type TabsTriggerProps = React.ComponentPropsWithoutRef<"button"> & {
  value: string;
};

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value: triggerValue, disabled, children, ...props }, ref) => {
    const ctx = React.useContext(TabsContext);
    if (!ctx) throw new Error("TabsTrigger must be used within Tabs");

    const { value, setValue } = ctx;
    const isActive = value === triggerValue;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        aria-disabled={disabled}
        data-state={isActive ? "active" : "inactive"}
        data-value={triggerValue}
        disabled={disabled}
        onClick={() => setValue(triggerValue)}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
          "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs",
          "data-[state=inactive]:text-muted-foreground",
          "disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
TabsTrigger.displayName = "TabsTrigger";

type TabsContentProps = React.ComponentPropsWithoutRef<"div"> & {
  value: string;
};

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value: contentValue, children, ...props }, ref) => {
    const ctx = React.useContext(TabsContext);
    if (!ctx) throw new Error("TabsContent must be used within Tabs");

    const { value } = ctx;
    const isActive = value === contentValue;

    return (
      <div
        ref={ref}
        role="tabpanel"
        data-state={isActive ? "active" : "inactive"}
        data-value={contentValue}
        hidden={!isActive}
        className={cn(
          "mt-1 rounded-lg border border-border/60 bg-card/70 p-4 outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
        {...props}
      >
        {isActive ? children : null}
      </div>
    );
  },
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
