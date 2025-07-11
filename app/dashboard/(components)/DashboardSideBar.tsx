"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  ChartSpline,
  Home,
  Maximize2,
  NotebookPen,
  Shrink,
  SquareChartGantt,
} from "lucide-react";
import {
  IconArrowLeft,
  IconArrowRight,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";

const DashboardSideBar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const pathName = usePathname();
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Sidebar Wrapper: This controls slide in/out */}
      <div
        className={clsx(
          "fixed top-0 left-0 z-40 h-full flex items-start transition-transform duration-300 ",
          {
            "translate-x-0": isOpen,
            "-translate-x-[calc(100%-32px)]": !isOpen,
          }
        )}
      >
        {/* Sidebar */}
        <div className="w-64 h-full bg-white dark:bg-[#1a1a1a] shadow pt-16 border-r border-gray-200 dark:border-zinc-700">
          <div className="flex h-full flex-col gap-2">
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <Link
                  href="/dashboard"
                  className={clsx(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    {
                      "bg-violet-600 text-white": pathName === "/dashboard",
                    }
                  )}
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>

                <Link
                  href="/dashboard/metrics"
                  className={clsx(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    {
                      "bg-violet-600 text-primary":
                        pathName === "/dashboard/metrics",
                    }
                  )}
                >
                  <ChartSpline className="h-4 w-4" />
                  Metrics
                </Link>

                <Link
                  href="/dashboard/quiz"
                  className={clsx(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    {
                      "bg-violet-600 text-primary":
                        pathName === "/dashboard/quiz",
                    }
                  )}
                >
                  <NotebookPen className="h-4 w-4" />
                  Create Project
                </Link>

                <Link
                  href="/dashboard/contact"
                  className={clsx(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    {
                      "bg-violet-600 text-primary":
                        pathName === "/dashboard/contact",
                    }
                  )}
                >
                  <SquareChartGantt className="h-4 w-4" />
                  Projects
                </Link>
              </nav>
            </div>

            <div className="mt-auto p-4 text-xs text-center text-gray-400">
              &copy; {currentYear} Tommy Vong.
            </div>
          </div>
        </div>

        {/* Toggle Button (attached at the edge of the sidebar) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close panel" : "Open panel"}
          className="group cursor-pointer h-8 w-8 mt-24 flex items-center justify-center text-white bg-violet-600 rounded-tr-sm rounded-br-sm transition hover:bg-violet-700"
        >
          {isOpen ? <IconX size={16} /> : <Maximize2 size={14} />}
        </button>
      </div>
    </>
  );
};

export default DashboardSideBar;
