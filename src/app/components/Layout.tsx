import { Link, useLocation, useNavigate, Outlet } from "react-router";
import {
  LayoutDashboard,
  Upload,
  FolderKanban,
  MessageSquare,
  User,
  FileBarChart,
  Globe,
  Search,
  Command,
  Settings,
  Network,
  LogOut,
} from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { KeyboardShortcutsDialog } from "./KeyboardShortcutsDialog";
import { useAuthStore } from "../../stores/authStore";
import { useUnlockStore } from "../../stores/unlockStore";

interface NavItem {
  name: string;
  href: string;
  icon: any;
  key?: string;
  step?: number;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

const sections: NavSection[] = [
  {
    label: "Main Flow",
    items: [
      { name: "Upload & Parse", href: "/app/upload", icon: Upload, key: "u", step: 1 },
      { name: "Projects",       href: "/app/projects", icon: FolderKanban, key: "p", step: 2 },
      { name: "Assessments",    href: "/app/assessments", icon: FileBarChart, key: "a", step: 3 },
      { name: "Publish Proof",  href: "/app/proof-pages", icon: Globe, key: "g", step: 4 },
    ],
  },
  {
    label: "Explore",
    items: [
      { name: "Conversations",  href: "/app/conversations", icon: MessageSquare, key: "c" },
      { name: "Work Profile",   href: "/app/work-profile", icon: User, key: "w" },
      { name: "Knowledge Map",  href: "/app/knowledge-map", icon: Network, key: "k" },
    ],
  },
  {
    label: "Workspace",
    items: [
      { name: "Dashboard",      href: "/app", icon: LayoutDashboard, key: "d" },
      { name: "Search",         href: "/app/search", icon: Search, key: "/" },
    ],
  },
];

// Flat list for keyboard shortcut lookup
const allNavItems = sections.flatMap((s) => s.items);

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearToken } = useAuthStore();
  const unlocked = useUnlockStore((s) => s.unlocked);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command/Ctrl + K for shortcuts dialog
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShortcutsOpen(true);
        return;
      }

      // Navigation shortcuts (Cmd/Ctrl + Shift + key)
      if ((e.metaKey || e.ctrlKey) && e.shiftKey) {
        const nav = allNavItems.find((n) => n.key === e.key.toLowerCase());
        if (nav) {
          e.preventDefault();
          navigate(nav.href);
        }
      }

      // Quick search (just "/" key)
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
        const target = e.target as HTMLElement;
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
          e.preventDefault();
          navigate("/app/search");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const isActiveHref = (href: string) => {
    if (href === "/app") return location.pathname === "/app";
    return location.pathname === href || location.pathname.startsWith(href + "/");
  };

  return (
    <div className={`flex h-screen ${unlocked ? "bg-[var(--pro-blue-light)]" : "bg-[#FAFAFA]"}`}>
      {/* Sidebar */}
      <aside className={`w-64 border-r ${unlocked ? "border-[var(--pro-blue-border)]" : "border-[rgba(0,0,0,0.08)]"} bg-white flex flex-col`}>
        {/* Logo/Brand */}
        <div className={`border-b px-6 py-5 ${unlocked ? "border-[var(--pro-blue-border)]" : "border-[rgba(0,0,0,0.08)]"}`}>
          <div className="flex items-center gap-2">
            <h1 className={`text-[15px] tracking-tight ${unlocked ? "text-[var(--pro-blue)]" : ""}`}>Proof of AI Work</h1>
            {unlocked && (
              <span className="inline-flex items-center rounded-sm bg-[var(--pro-green-light)] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[var(--pro-green)] border border-[var(--pro-green-border)]">
                Pro
              </span>
            )}
          </div>
          <p className="mt-0.5 font-mono text-[11px] text-[#717182]">
            {unlocked ? "Verified · Maelstrom LLC" : "Forensic Evidence"}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {sections.map((section, sIdx) => {
            const isPrimary = section.label === "Main Flow";
            return (
              <div key={section.label}>
                <div
                  className={`mb-2 px-3 text-[10px] font-medium uppercase tracking-[0.12em] ${
                    isPrimary ? "text-[#030213]" : "text-[#C0C0C5]"
                  }`}
                >
                  {section.label}
                </div>
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const isActive = isActiveHref(item.href);
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center gap-3 rounded-md px-3 py-2 text-[13px] transition-colors ${
                          isActive
                            ? isPrimary
                              ? "bg-[#030213] text-white"
                              : "bg-[#F5F5F7] text-[#030213]"
                            : isPrimary
                            ? "text-[#3A3A3A] hover:bg-[#FAFAFA] hover:text-[#030213]"
                            : "text-[#717182] hover:bg-[#FAFAFA] hover:text-[#030213]"
                        }`}
                      >
                        {item.step && (
                          <span
                            className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full font-mono text-[10px] ${
                              isActive
                                ? "bg-white/15 text-white"
                                : "bg-[#F5F5F7] text-[#717182]"
                            }`}
                          >
                            {item.step}
                          </span>
                        )}
                        {!item.step && <item.icon className="h-4 w-4 flex-shrink-0" />}
                        <span className="flex-1">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
                {sIdx === 0 && (
                  <div className="mt-4 h-px bg-[rgba(0,0,0,0.06)]" />
                )}
              </div>
            );
          })}
        </nav>

        {/* Account section */}
        <div className="border-t border-[rgba(0,0,0,0.08)] p-3 space-y-0.5">
          <div className="mb-1 px-3 text-[10px] font-medium uppercase tracking-[0.12em] text-[#C0C0C5]">
            Account
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-[13px] text-[#717182] font-normal"
            onClick={() => setShortcutsOpen(true)}
          >
            <Command className="mr-3 h-4 w-4" />
            Keyboard Shortcuts
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-[13px] text-[#717182] font-normal"
            onClick={() => navigate("/app/account")}
          >
            <Settings className="mr-3 h-4 w-4" />
            Account & Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-[13px] text-red-500 hover:text-red-600 hover:bg-red-50 font-normal"
            onClick={() => {
              clearToken();
              navigate("/sign-in");
            }}
          >
            <LogOut className="mr-3 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Keyboard Shortcuts Dialog */}
      <KeyboardShortcutsDialog open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
    </div>
  );
}
