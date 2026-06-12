import { SidebarMenuButton } from "@/components/layout/sidebar";
import { Search, UserCircle, Bell, HelpCircle, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";

export function Header({ title, subtitle }: { title: string; subtitle: string }) {
  const { user } = useAuth();

  return (
    <div className="flex flex-col w-full sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Utility Bar */}
      <div className="hidden lg:flex h-10 items-center justify-between px-8 bg-slate-50 border-b border-slate-100 text-[11px] font-medium text-slate-500">
        <div className="flex items-center gap-6">
          <Link to="#" className="hover:text-amber-600 transition-colors uppercase tracking-wider">For Individuals</Link>
          <Link to="#" className="hover:text-amber-600 transition-colors uppercase tracking-wider">For Businesses</Link>
          <Link to="#" className="hover:text-amber-600 transition-colors uppercase tracking-wider">For Institutions</Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> English</span>
          <span className="h-3 w-px bg-slate-200"></span>
          <Link to="#" className="hover:text-amber-600 transition-colors">Help Center</Link>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="flex h-20 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-8">
          <SidebarMenuButton />
          
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500 text-white font-black text-xl italic shadow-md shadow-yellow-200">
              B
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-bold tracking-tighter text-amber-600">Banking</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Management</span>
            </div>
          </Link>

          <Button 
            onClick={() => toast.info("Check out our Customers and Accounts modules!")}
            variant="ghost" className="hidden xl:flex items-center gap-2 rounded-md bg-yellow-50 text-amber-700 hover:bg-yellow-100 px-4 h-11 font-bold"
          >
            Explore Services <ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-1 max-w-2xl mx-8 relative group hidden md:block">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search accounts, transactions, or documentation..." 
            onKeyDown={(e) => e.key === 'Enter' && toast.info(`Searching for: ${e.currentTarget.value}`)}
            className="w-full h-11 rounded-md border-2 border-slate-200 bg-white pl-12 pr-4 text-sm focus:border-yellow-500 focus:ring-0 transition-all outline-none"
          />
          <Button 
            onClick={() => toast.info("Search functionality coming soon!")}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 bg-yellow-500 hover:bg-yellow-600 rounded-md p-0"
          >
            <Search className="h-4 w-4 text-white" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-slate-500 hover:text-amber-600 rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          
          <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>

          {user ? (
            <Link to="/profile" className="flex items-center gap-3 pl-2 group">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{user.username}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{user.role}</p>
              </div>
              <div className="h-10 w-10 rounded-full border-2 border-slate-100 bg-slate-50 flex items-center justify-center text-amber-600 group-hover:border-amber-600 transition-all">
                <UserCircle className="h-6 w-6" />
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="text-amber-600 font-bold hover:bg-yellow-50">Log In</Button>
              <Button className="bg-yellow-500 hover:bg-yellow-600 font-bold text-white px-6">Join For Free</Button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
