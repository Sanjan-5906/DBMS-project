import React, { useEffect, useState } from "react";
import { 
  Wallet, ArrowUpRight, Activity, CreditCard, Send, Search, Filter,
  ArrowRight, Landmark, Target, ShieldCheck, TrendingUp, ChevronRight,
  Plus, CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/loading-state";
import { EmptyState } from "@/components/ui/empty-state";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Transfer form state
  const [transferAmount, setTransferAmount] = useState("");
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data for new features
  const [savingsGoals, setSavingsGoals] = useState([
    { id: 1, name: "Luxury Villa", target: 500000, current: 250000, color: "bg-yellow-500" },
    { id: 2, name: "Global Investment", target: 100000, current: 80000, color: "bg-amber-600" },
    { id: 3, name: "Royal Retirement", target: 1000000, current: 150000, color: "bg-yellow-600" },
  ]);

  const fetchData = async () => {
    try {
      const [accRes, txRes] = await Promise.all([
        fetch("http://localhost:5002/api/accounts"),
        fetch("http://localhost:5002/api/transactions")
      ]);

      const [accData, txData] = await Promise.all([
        accRes.json(), txRes.json()
      ]);

      if (accData.success) {
        setAccounts(accData.data);
        if (accData.data.length > 0 && !selectedAccountId) {
          setSelectedAccountId(accData.data[0].account_id.toString());
        }
      }
      if (txData.success) setTransactions(txData.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTransfer = async () => {
    if (!transferAmount || parseFloat(transferAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch("http://localhost:5002/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          account_id: selectedAccountId,
          transaction_type: "wire",
          amount: parseFloat(transferAmount)
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Funds wired successfully!");
        setTransferAmount("");
        fetchData(); // Refresh data
      } else {
        toast.error(data.message || "Failed to process transfer");
      }
    } catch (error) {
      toast.error("An error occurred during the transfer");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return <LoadingState fullScreen message="Personalizing your financial dashboard..." />;
  }

  const totalBalance = accounts.reduce((sum, a) => sum + parseFloat(a.balance), 0);

  return (
    <div className="flex flex-col w-full pb-20 overflow-x-hidden">
      {/* 1. Coursera-inspired Hero Section */}
      <section className="hero-gradient relative w-full overflow-hidden px-6 py-16 sm:px-12 sm:py-24 text-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
              <ShieldCheck className="h-3 w-3 text-amber-300" />
              Verified Premium Account
            </div>
            <h1 className="text-4xl sm:text-6xl font-black leading-[1.1] tracking-tighter">
              Secure Your Prosperity with <span className="text-amber-300">Golden Reserve.</span>
            </h1>
            <p className="text-lg sm:text-xl text-yellow-100 max-w-lg leading-relaxed">
              Experience the next generation of banking. Advanced analytics, real-time security, and seamless capital management.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                onClick={() => toast.info("Savings Goals feature coming soon!")}
                size="lg" className="h-14 px-8 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-md shadow-xl shadow-amber-900/40"
              >
                Start Saving Goal
              </Button>
              <Button 
                asChild
                size="lg" variant="ghost" className="h-14 px-8 text-white hover:bg-white/10 font-bold"
              >
                <Link to="/accounts">
                  View My Portfolios <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden lg:flex justify-end"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-[100px] opacity-20"></div>
              <div className="glass-card bg-white/10 border-white/20 backdrop-blur-xl p-8 rounded-3xl w-[400px] shadow-2xl relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center border border-yellow-400/30">
                    <TrendingUp className="h-5 w-5 text-amber-300" />
                  </div>
                  <span className="text-xs font-bold text-amber-200">LIVE MARKET DATA</span>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-white/10 pb-4">
                    <div>
                      <p className="text-xs text-amber-300 font-bold uppercase tracking-widest mb-1">Liquidity</p>
                      <h3 className="text-3xl font-black">${totalBalance.toLocaleString()}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-400">+4.2%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-[10px] text-amber-200 uppercase font-bold tracking-tighter mb-2">Daily Limit</p>
                      <p className="text-lg font-bold text-white">$5,000</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-[10px] text-amber-200 uppercase font-bold tracking-tighter mb-2">Status</p>
                      <p className="text-lg font-bold text-emerald-400">Stable</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Background shapes */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-yellow-400/10 to-transparent skew-x-12 transform origin-top-right"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-yellow-600/30 rounded-full blur-[80px]"></div>
      </section>

      {/* 2. Partner-like Account Bar */}
      <section className="bg-slate-50 border-b border-slate-200 px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Active Asset Nodes</p>
          <div className="flex flex-wrap items-center gap-8 md:gap-16 opacity-70">
            {accounts.slice(0, 3).map(acc => (
              <div key={acc.account_id} className="flex items-center gap-3">
                <Landmark className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-500">{acc.account_type}</p>
                  <p className="text-sm font-bold text-slate-900">${parseFloat(acc.balance).toLocaleString()}</p>
                </div>
              </div>
            ))}
            <Link to="/accounts" className="text-sm font-bold text-amber-600 hover:underline flex items-center gap-1">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Main Bento Grid Content */}
      <main className="max-w-7xl mx-auto w-full px-6 mt-12 grid lg:grid-cols-12 gap-8">
        
        {/* Left: New Feature - Savings Goals Tracker */}
        <div className="lg:col-span-8 space-y-8">
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900">Financial Objectives</h2>
                <p className="text-sm text-slate-500">Track and manage your long-term saving targets.</p>
              </div>
              <Button 
                onClick={() => toast.info("Goal management coming soon!")}
                variant="outline" size="sm" className="rounded-md border-slate-200 text-amber-600 hover:bg-yellow-50"
              >
                <Plus className="h-4 w-4 mr-1" /> New Goal
              </Button>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {savingsGoals.map(goal => (
                <div key={goal.id} className="glass-card p-6 hover:shadow-md transition-shadow group cursor-pointer" onClick={() => toast.info(`Managing goal: ${goal.name}`)}>
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-12 w-12 rounded-lg bg-yellow-50 flex items-center justify-center text-amber-600 group-hover:bg-yellow-500 group-hover:text-white transition-all">
                      <Target className="h-6 w-6" />
                    </div>
                    {goal.current >= goal.target && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{goal.name}</h3>
                  <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-tighter mb-3">
                    <span>Target: ${goal.target.toLocaleString()}</span>
                    <span>{Math.round((goal.current / goal.target) * 100)}%</span>
                  </div>
                  <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                  <p className="mt-4 text-xs font-medium text-slate-500">
                    ${goal.current.toLocaleString()} saved so far
                  </p>
                </div>
              ))}
              <div 
                onClick={() => toast.info("Custom goal creation coming soon!")}
                className="border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center p-6 text-slate-400 hover:border-yellow-300 hover:bg-yellow-50/50 transition-all cursor-pointer group"
              >
                <Plus className="h-8 w-8 mb-2 group-hover:text-amber-500" />
                <p className="text-sm font-bold">Add Custom Goal</p>
              </div>
            </div>
          </section>

          <section className="glass-card overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-black text-slate-900">Recent Ledger Activity</h3>
              <Link to="/transactions" className="text-xs font-bold text-amber-600 hover:underline uppercase tracking-widest">History</Link>
            </div>
            <div className="divide-y divide-slate-50">
              {transactions.slice(0, 5).map(tx => (
                <div key={tx.transaction_id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${tx.transaction_type === 'deposit' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                      {tx.transaction_type === 'deposit' ? <ArrowUpRight className="h-5 w-5" /> : <Activity className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 capitalize">{tx.transaction_type}</p>
                      <p className="text-[10px] font-medium text-slate-400">{new Date(tx.transaction_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-black ${tx.transaction_type === 'deposit' ? 'text-emerald-600' : 'text-slate-900'}`}>
                      {tx.transaction_type === 'deposit' ? '+' : '-'}${parseFloat(tx.amount).toFixed(2)}
                    </p>
                    <p className="text-[10px] text-slate-300 font-bold uppercase">TXID: #{tx.transaction_id}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-50 text-center">
              <Button 
                asChild
                variant="ghost" className="text-amber-600 text-[10px] font-black hover:bg-yellow-50 tracking-widest"
              >
                <Link to="/transactions">VIEW ALL TRANSACTIONS</Link>
              </Button>
            </div>
          </section>
        </div>

        {/* Right: Quick Actions and Account List */}
        <aside className="lg:col-span-4 space-y-8">
          <section className="glass-card p-8 bg-slate-900 text-white border-none shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Send className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-black italic tracking-tighter">FastCapital™</h3>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Source</label>
                <select 
                  value={selectedAccountId}
                  onChange={(e) => setSelectedAccountId(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-md p-3 text-xs font-bold outline-none focus:border-yellow-500 transition-all text-white"
                >
                  {accounts.map(acc => (
                    <option key={acc.account_id} value={acc.account_id} className="text-slate-900">{acc.account_type} (****{acc.account_id})</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Amount ($)</label>
                <input 
                  type="number" 
                  placeholder="0.00" 
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-md p-3 text-lg font-black outline-none focus:border-yellow-500 transition-all placeholder:text-slate-700 text-white" 
                />
              </div>
              <Button 
                onClick={handleTransfer}
                disabled={isProcessing}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-black py-7 text-lg rounded-md transition-all active:scale-95 shadow-xl shadow-amber-900/60"
              >
                {isProcessing ? "Processing..." : "Wire Funds Now"}
              </Button>
              <p className="text-[10px] text-center text-slate-500 font-medium">Standard processing times apply. End-to-end encrypted.</p>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">My Asset Nodes</h3>
            <div className="space-y-3">
              {accounts.slice(0, 5).map(acc => (
                <div key={acc.account_id} className="flex items-center gap-4 p-4 glass-card hover:bg-slate-50 transition-all cursor-pointer group">
                  <div className="h-10 w-10 rounded-md border border-slate-100 bg-white flex items-center justify-center text-slate-400 group-hover:text-amber-600 group-hover:border-yellow-100 transition-all">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-slate-900 truncate">{acc.account_type}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">ID: ****{acc.account_id}</p>
                  </div>
                  <p className="text-xs font-black text-slate-900">${parseFloat(acc.balance).toLocaleString()}</p>
                </div>
              ))}
              <Button 
                asChild
                variant="ghost" className="w-full text-[10px] font-black text-slate-400 hover:text-amber-600 tracking-widest uppercase py-6"
              >
                <Link to="/accounts">Manage All Accounts</Link>
              </Button>
            </div>
          </section>
        </aside>

      </main>
    </div>
  );
}
