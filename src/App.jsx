import "./App.css";
import { useEffect, useState } from "react";

import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";

import Dashboard from "@/pages/Dashboard";

import BigOPlayground from "@/pages/BigOPlayground";

import SortingVisualizer from "@/pages/SortingVisualizer";

import Practice from "@/pages/Practice";
import ProblemDetail from "@/pages/ProblemDetail";
import Curriculum from "@/pages/Curriculum";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    () => localStorage.getItem("dsa-theme") || "dark",
  );
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("dsa-theme", theme);
  }, [theme]);

  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const navConfig = [
    { id: "dashboard", path: "/", label: "Dashboard", title: "Dashboard" },
    {
      id: "big-o",
      path: "/big-o",
      label: "Big-O",
      title: "Big-O Playground",
    },
    {
      id: "sorting",
      path: "/sorting",
      label: "Sorting",
      title: "Sorting Visualizer",
    },
    {
      id: "practice",
      path: "/practice",
      label: "Practice",
      title: "Practice Mode",
    },
    {
      id: "curriculum",
      path: "/curriculum",
      label: "Curriculum",
      title: "Curriculum",
    },
  ];

  const resolveActivePage = (pathname) =>
    navConfig.find(
      (item) => pathname === item.path || pathname.startsWith(`${item.path}/`),
    )?.id ?? "dashboard";

  const activePage = resolveActivePage(location.pathname);
  const pageTitle =
    navConfig.find((item) => item.id === activePage)?.title || "Dashboard";

  

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-[1900px] flex-col gap-4 px-4 py-4 lg:flex-row lg:gap-6 lg:px-8">
        <Sidebar
          className="hidden lg:flex"
          activePage={activePage}
          theme={theme}
          onToggleTheme={toggleTheme}
          onNavigate={(id) => {
            const target =
              navConfig.find((item) => item.id === id)?.path || "/";
            navigate(target);
          }}
        />
        <div className="flex w-full flex-1 min-w-0 flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/70 shadow-sm ring-1 ring-border/40">
          <header className="flex items-center justify-between border-b border-border/60 px-4 py-3 lg:hidden">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileNavOpen(true)}
                className="inline-flex items-center justify-center rounded-lg border border-border/70 bg-card px-2 py-1 text-muted-foreground shadow-xs"
                aria-label="Open navigation"
              >
                <Menu className="size-5" />
              </button>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span className="inline-flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                  D
                </span>
                {pageTitle}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center justify-center rounded-lg border border-border/70 bg-card px-2 py-1 text-xs font-medium text-muted-foreground shadow-xs hover:bg-muted"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                )}
              </button>
            </div>
          </header>

          {isMobileNavOpen && (
            <div className="fixed inset-0 z-40 lg:hidden">
              <button
                type="button"
                className="absolute right-4 top-4 z-20 rounded-full border border-border/70 bg-card p-2 text-muted-foreground shadow"
                onClick={() => setIsMobileNavOpen(false)}
                aria-label="Close navigation"
              >
                <X className="size-5" />
              </button>
              <div className="flex h-full w-full">
                <div className="relative flex h-full w-[300px] sm:w-[260px] max-w-[90vw] overflow-y-auto bg-sidebar text-sidebar-foreground shadow-2xl">
                  <Sidebar
                    className="flex h-full w-full"
                    activePage={activePage}
                    theme={theme}
                    onToggleTheme={() => {
                      toggleTheme();
                      setIsMobileNavOpen(false);
                    }}
                    onNavigate={(id) => {
                      const target =
                        navConfig.find((item) => item.id === id)?.path || "/";
                      navigate(target);
                      setIsMobileNavOpen(false);
                    }}
                  />
                </div>
                <button
                  type="button"
                  className="flex-1 bg-background/70 backdrop-blur-sm"
                  onClick={() => setIsMobileNavOpen(false)}
                  aria-label="Close navigation backdrop"
                />
              </div>
            </div>
          )}

          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/big-o" element={<BigOPlayground />} />

            <Route path="/sorting" element={<SortingVisualizer />} />

            <Route path="/practice" element={<Practice />} />
            <Route path="/practice/:slug" element={<ProblemDetail />} />

            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
