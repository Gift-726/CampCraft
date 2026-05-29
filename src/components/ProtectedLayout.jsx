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
  FileText,
  Bell,
  Search,
  MessageSquare,
  Star,
  Headphones,
  ChevronDown,
} from 'lucide-react';

export default function ProtectedLayout({ allowedRoles }) {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  if (!currentUser) return <Navigate to="/login" state={{ from: location }} replace />;
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    if (currentUser.role === 'resident') return <Navigate to="/resident/dashboard" replace />;
    if (currentUser.role === 'artisan')  return <Navigate to="/artisan/dashboard" replace />;
    if (currentUser.role === 'admin')    return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  const handleLogout = async () => {
    try { await logout(); } catch (err) { console.error('Failed to log out', err); }
  };

  const getNavItems = () => {
    switch (currentUser.role) {
      case 'resident':
        return [
          { label: 'Dashboard',      path: '/resident/dashboard', icon: LayoutDashboard },
          { label: 'Browse Artisans',path: '/resident/browse',    icon: Users },
          { label: 'Post a Job',     path: '/resident/post-job',  icon: PlusCircle },
          { label: 'My Jobs',        path: '/resident/my-jobs',   icon: Briefcase },
          { label: 'Messages',       path: '/resident/messages',  icon: MessageSquare },
          { label: 'My Reviews',     path: '/resident/reviews',   icon: Star },
          { label: 'Profile',        path: '/resident/profile',   icon: User },
        ];
      case 'artisan':
        return [
          { label: 'Dashboard', path: '/artisan/dashboard',  icon: LayoutDashboard },
          { label: 'Find Jobs', path: '/artisan/find-jobs',  icon: Briefcase },
          { label: 'My Jobs',   path: '/artisan/my-jobs',    icon: FileText },
          { label: 'Earnings',  path: '/artisan/earnings',   icon: DollarSign },
          { label: 'Profile',   path: '/artisan/profile',    icon: User },
        ];
      case 'admin':
        return [
          { label: 'Dashboard',        path: '/admin/dashboard',    icon: LayoutDashboard },
          { label: 'Pending Artisans', path: '/admin/pending',      icon: CheckSquare },
          { label: 'All Artisans',     path: '/admin/all-artisans', icon: Users },
          { label: 'All Jobs',         path: '/admin/all-jobs',     icon: Briefcase },
          { label: 'Reports',          path: '/admin/reports',      icon: BarChart3 },
          { label: 'Settings',         path: '/admin/settings',     icon: Settings },
        ];
      default: return [];
    }
  };

  const navItems = getNavItems();
  const initials = currentUser.fullName
    ? currentUser.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : (currentUser.email ? currentUser.email.split('@')[0].slice(0, 2).toUpperCase() : 'U');

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800 font-sans">

      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-slate-200 sticky top-0 h-screen shrink-0">

        {/* Logo */}
        <div className="px-5 pt-5 pb-3">
          <Link to="/">
            <img src="/campcraft-logo.png" alt="CampCraft" className="h-11 w-auto object-contain logo-tint" />
          </Link>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path ||
              (item.path !== '/resident/browse' && item.path !== '/artisan/find-jobs' &&
               location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-semibold'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors mt-1"
          >
            <LogOut className="w-[18px] h-[18px] shrink-0" />
            <span>Logout</span>
          </button>
        </nav>

        {/* Need Help? card */}
        <div className="mx-3 mb-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-center space-y-2">
          <div className="w-10 h-10 mx-auto rounded-full bg-emerald-800 flex items-center justify-center">
            <Headphones className="w-5 h-5 text-white" />
          </div>
          <p className="text-xs font-bold text-slate-800">Need Help?</p>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            We're here to help you find the right artisan.
          </p>
          <button className="w-full py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition">
            Contact Support
          </button>
        </div>
      </aside>

      {/* ── RIGHT SIDE (top header + content) ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* TOP HEADER */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40 flex items-center px-6 py-3 gap-4">

          {/* Mobile menu button */}
          <button
            className="md:hidden p-1 text-slate-500 hover:text-slate-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Mobile logo */}
          <Link to="/" className="md:hidden">
            <img src="/campcraft-logo.png" alt="CampCraft" className="h-9 w-auto object-contain logo-tint" />
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search artisans, services or categories..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-700 placeholder-slate-400"
            />
          </div>

          <div className="ml-auto flex items-center gap-4">
            {/* Notification bell */}
            <button className="relative p-2 rounded-xl hover:bg-slate-100 transition">
              <Bell className="w-5 h-5 text-slate-500" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-600 rounded-full text-[9px] font-bold text-white flex items-center justify-center">3</span>
            </button>

            {/* User avatar + name */}
            <button className="flex items-center gap-2.5 hover:bg-slate-50 px-2 py-1.5 rounded-xl transition">
              <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {initials}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-tight">{currentUser.fullName || currentUser.email || 'User'}</p>
                <p className="text-[10px] text-slate-500 capitalize">{currentUser.role}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>
          </div>
        </header>

        {/* MOBILE SLIDE-DOWN MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-sm pt-16"
               onClick={() => setMobileMenuOpen(false)}>
            <div className="bg-white m-4 rounded-2xl p-5 shadow-xl space-y-1"
                 onClick={e => e.stopPropagation()}>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <button
                onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-5 md:p-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
