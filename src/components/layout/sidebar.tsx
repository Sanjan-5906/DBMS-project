import { NavLink, useLocation } from "react-router-dom";
import { 
  Menu, Building2, LayoutDashboard, Users, CreditCard, Landmark, 
  Repeat, ShieldAlert, FileText, Zap, 
  LogOut, UserCircle, Settings, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth-context";

const navigationItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/customers", label: "Customers", icon: Users },
  { path: "/accounts", label: "Accounts", icon: Landmark },
  { path: "/cards", label: "Cards", icon: CreditCard },
  { path: "/transactions", label: "Transactions", icon: Repeat },
  { path: "/branches", label: "Branches", icon: Building2 },
  { path: "/audit-logs", label: "Audit Logs", icon: ShieldAlert },
];

const technicalItems = [
  { path: "/procedures", label: "Procedures", icon: FileText },
  { path: "/triggers", label: "Triggers", icon: Zap },
];

function SidebarContent() {
  const location = useLocation();
  const { logout, user } = useAuth();

  return (
    <div className="flex h-full flex-col bg-white text-slate-600 border-r border-slate-100 overflow-hidden">
      <div className="flex flex-col gap-6 px-6 py-8">
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Main Menu</p>
          <nav className="space-y-0.5">
            {navigationItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all",
                      isActive
                        ? "bg-yellow-50 text-amber-700 shadow-[inset_3px_0_0_0_#d97706]"
                        : "hover:bg-slate-50 hover:text-slate-900"
                    )
                  }
                >
                  <item.icon className={cn("h-4 w-4", active ? "text-amber-700" : "text-slate-400 group-hover:text-slate-600")} />
                  <span className="flex-1">{item.label}</span>
                  {active && <ChevronRight className="h-3 w-3 text-amber-400" />}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="space-y-1">
          <p className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">System Control</p>
          <nav className="space-y-0.5">
            {technicalItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all",
                      isActive
                        ? "bg-yellow-50 text-amber-700 shadow-[inset_3px_0_0_0_#d97706]"
                        : "hover:bg-slate-50 hover:text-slate-900"
                    )
                  }
                >
                  <item.icon className={cn("h-4 w-4", active ? "text-amber-700" : "text-slate-400 group-hover:text-slate-600")} />
                  <span className="flex-1">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-slate-50">
        <Button 
          onClick={logout}
          variant="ghost" 
          className="w-full justify-start gap-3 h-11 text-xs font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md"
        >
          <LogOut className="h-4 w-4" />
          Logout Session
        </Button>
      </div>
    </div>
  );
}

export function DesktopSidebar() {
  return (
    <aside className="sticky top-[120px] hidden h-[calc(100vh-120px)] w-64 shrink-0 bg-white md:block">
      <SidebarContent />
    </aside>
  );
}

export function SidebarMenuButton() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-md border border-slate-200">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0 border-none">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </div>
  );
}
