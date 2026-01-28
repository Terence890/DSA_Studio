import {
  Brain,
  BookOpen,
  Home,
  Layers,
  LineChart,
  PlayCircle,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, path: "/" },
  { id: "big-o", label: "Big-O Playground", icon: LineChart, path: "/big-o" },
  {
    id: "sorting",
    label: "Sorting Visualizer",
    icon: Layers,
    path: "/sorting",
  },
  {
    id: "practice",
    label: "Practice Mode",
    icon: PlayCircle,
    path: "/practice",
  },
  {
    id: "curriculum",
    label: "Curriculum",
    icon: BookOpen,
    path: "/curriculum",
  },
];

export function Sidebar({
  className,
  activePage = "dashboard",
  onNavigate,
  theme = "light",
  onToggleTheme,
}) {
  return (
    <aside
      className={cn(
        "flex h-full w-[190px] lg:w-72 flex-col gap-4 border-r border-border bg-sidebar px-4 py-6 text-sidebar-foreground",
        "shadow-xs",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
            <Brain className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">DSA Studio</span>
            <Badge variant="secondary" className="w-fit px-2 py-0">
              MVP Scope
            </Badge>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-1"
          onClick={onToggleTheme}
        >
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </Button>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-border/60 bg-card px-3 py-2">
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            Overall Progress
          </p>
          <p className="text-sm font-semibold">32% Complete</p>
        </div>
        <Badge variant="outline" className="px-2">
          +8% this week
        </Badge>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map(({ id, label, icon: Icon, path }) => {
          return (
            <NavLink
              key={id}
              to={path}
              className={({ isActive }) =>
                cn(
                  "justify-start gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent",
                  (isActive || activePage === id) &&
                    "bg-sidebar-accent text-foreground ring-1 ring-sidebar-ring",
                  "flex items-center",
                )
              }
              onClick={() => onNavigate?.(id)}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={cn(
                      "size-4",
                      isActive || activePage === id
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <Separator className="my-1" />

      <div className="rounded-xl border border-border/60 bg-card px-4 py-3">
        <p className="text-sm font-semibold">Need a hint?</p>
        <p className="text-xs text-muted-foreground">
          Use the Practice Mode to get guided hints and complexity insights.
        </p>
        <div className="mt-3 flex gap-2">
          <Badge variant="secondary" className="px-2 py-0">
            New
          </Badge>
          <Badge variant="outline" className="px-2 py-0">
            Interview Mode (soon)
          </Badge>
        </div>
      </div>

      <div className="mt-auto space-y-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start gap-2 rounded-lg"
        >
          <PlayCircle className="size-4" />
          Continue Learning
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="w-full justify-start gap-2 rounded-lg"
        >
          <LineChart className="size-4" />
          Open Big-O Visualizer
        </Button>
      </div>
    </aside>
  );
}

export default Sidebar;
