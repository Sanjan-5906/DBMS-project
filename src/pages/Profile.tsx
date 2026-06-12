import React from "react";
import { UserCircle, Mail, Phone, MapPin, Shield, Key } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="space-y-8 pb-10 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          Profile Management
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Manage your personal information and security settings.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6 flex flex-col items-center text-center space-y-4 md:col-span-1"
        >
          <div className="h-24 w-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
            <UserCircle className="h-12 w-12" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{user?.username || "Admin User"}</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">{user?.role || "Administrator"}</p>
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Edit Photo
          </Button>
        </motion.div>

        {/* Info & Settings */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6 md:col-span-2 space-y-6"
        >
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white border-b border-zinc-100 pb-2 mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-zinc-400" />
                <div>
                  <p className="text-xs text-zinc-500 font-semibold uppercase">Email Address</p>
                  <p className="text-sm font-medium text-zinc-900">{user?.username || "admin"}@banking-system.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-zinc-400" />
                <div>
                  <p className="text-xs text-zinc-500 font-semibold uppercase">Phone Number</p>
                  <p className="text-sm font-medium text-zinc-900">+1 (555) 000-0000</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-zinc-400" />
                <div>
                  <p className="text-xs text-zinc-500 font-semibold uppercase">Location</p>
                  <p className="text-sm font-medium text-zinc-900">Headquarters - New York</p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="mt-4 text-blue-600 border-blue-200 hover:bg-blue-50">
              Update Information
            </Button>
          </div>

          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white border-b border-zinc-100 pb-2 mb-4">Security</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-3 h-12 text-zinc-700">
                <Key className="h-5 w-5 text-zinc-400" />
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12 text-zinc-700">
                <Shield className="h-5 w-5 text-zinc-400" />
                Two-Factor Authentication (2FA)
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
