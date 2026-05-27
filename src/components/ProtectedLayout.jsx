import React from 'react';
import { Navigate, Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  PlusCircle, 
  Briefcase, 
  DollarSign, 
  User, 
  Settings, 
  LogOut, 
  CheckSquare, 
  BarChart3,
  Menu,
  X,
  FileText
} from 'lucide-react';

export default function ProtectedLayout({ allowedRoles }) {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Guard: if not authenticated, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Guard: if role is not allowed, redirect to correct default page
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    if (currentUser.role === 'resident') return <Navigate to="/resident/dashboard" replace />;
    if (currentUser.role === 'artisan') return <Navigate to="/artisan/dashboard" replace />;
    if (currentUser.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  // Handle Logout
  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Failed to log out", err);
    }
  };

  // Define Navigation Sidebar items based on role
  const getNavItems = () => {
    switch (currentUser.role) {
      case 'resident':
        return [
          { label: 'Dashboard', path: '/resident/dashboard', icon: LayoutDashboard },
          { label: 'Browse Artisans', path: '/resident/browse', icon: Users },
          { label: 'Post a Job', path: '/resident/post-job', icon: PlusCircle },
          { label: 'My Jobs', path: '/resident/my-jobs', icon: Briefcase },
        ];
      case 'artisan':
        return [
          { label: 'Dashboard', path: '/artisan/dashboard', icon: LayoutDashboard },
          { label: 'Find Jobs', path: '/artisan/find-jobs', icon: Briefcase },
          { label: 'My Jobs', path: '/artisan/my-jobs', icon: FileText },
          { label: 'Earnings', path: '/artisan/earnings', icon: DollarSign },
          { label: 'Profile', path: '/artisan/profile', icon: User },
        ];
      case 'admin':
        return [
          { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
          { label: 'Pending Artisans', path: '/admin/pending', icon: CheckSquare },
          { label: 'All Artisans', path: '/admin/all-artisans', icon: Users },
          { label: 'All Jobs', path: '/admin/all-jobs', icon: Briefcase },
          { label: 'Reports', path: '/admin/reports', icon: BarChart3 },
          { label: 'Settings', path: '/admin/settings', icon: Settings },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row text-slate-100 font-sans">
      
      {/* SIDEBAR FOR DESKTOP */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800/80 sticky top-0 h-screen p-5 justify-between">
        <div className="space-y-8">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-amber-500 flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
              CampCraft
            </span>
          </Link>

          {/* User profile capsule in sidebar */}
          <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-emerald-400">
              {currentUser.fullName ? currentUser.fullName[0].toUpperCase() : 'U'}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-white truncate">{currentUser.fullName}</h4>
              <p className="text-[10px] uppercase font-semibold text-emerald-500 tracking-wider">
                {currentUser.role}
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive 
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/10' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout button at bottom of sidebar */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors mt-auto"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </aside>

      {/* MOBILE HEADER */}
      <header className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-40">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-amber-500 flex items-center justify-center text-slate-950 font-bold text-sm">
            ⛺
          </div>
          <span className="font-bold text-white">CampCraft</span>
        </Link>

        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1 rounded-md text-slate-400 hover:text-white focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* MOBILE SIDEBAR MODAL OVERLAY */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-slate-950/90 flex flex-col p-6 space-y-6 pt-24 animate-fade-in">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-4 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  isActive 
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/10' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleLogout();
            }}
            className="flex items-center space-x-4 px-4 py-3 rounded-xl text-base font-semibold text-slate-400 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      )}

      {/* MAIN VIEW CONTENT CONTAINER */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 min-h-screen">
        <Outlet />
      </main>
      
    </div>
  );
}
