import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import { useAuth } from './contexts/AuthContext';
import ProtectedLayout from './components/ProtectedLayout';
import { 
  Star, Search, MapPin, AlertCircle, Wrench, UploadCloud, ChevronRight,
  PlusCircle, User, Settings
} from 'lucide-react';

// ==========================================
// PUBLIC PAGES
// ==========================================

// 1. Landing Page
function LandingPage() {
  const { currentUser } = useAuth();
  const categories = [
    { name: 'Plumbing', icon: '🚿', color: 'from-blue-500/20 to-cyan-500/20 text-blue-400' },
    { name: 'Electrical', icon: '⚡', color: 'from-yellow-500/20 to-amber-500/20 text-yellow-400' },
    { name: 'Carpentry', icon: '🪚', color: 'from-orange-500/20 to-amber-600/20 text-orange-400' },
    { name: 'Painting', icon: '🎨', color: 'from-pink-500/20 to-rose-500/20 text-pink-400' },
    { name: 'Welding', icon: '🔥', color: 'from-red-500/20 to-orange-500/20 text-red-400' },
    { name: 'Generator Repair', icon: '⚙️', color: 'from-indigo-500/20 to-purple-500/20 text-indigo-400' },
    { name: 'Laundry Services', icon: '🧺', color: 'from-teal-500/20 to-emerald-500/20 text-teal-400' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-amber-500 flex items-center justify-center text-slate-950 font-extrabold shadow-md">
              ⛺
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">CampCraft</span>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm text-slate-400">
            <a href="#how" className="hover:text-emerald-400 transition-colors">How It Works</a>
            <a href="#categories" className="hover:text-emerald-400 transition-colors">Categories</a>
            <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
          </nav>
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <Link 
                to={`/${currentUser.role}/dashboard`}
                className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition">Login</Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-6 text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <span>Redemption City's Trusted Network</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Find Trusted Artisans <br/>
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400 bg-clip-text text-transparent">
              in Redemption City
            </span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl font-light">
            CampCraft connects residents with verified local tradespeople. Fast, reliable, and verified.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link 
              to="/login"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 shadow-lg shadow-emerald-500/10 hover:scale-[1.02] active:scale-[0.98] transition-all text-center"
            >
              Find a Service
            </Link>
            <Link 
              to="/register" 
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white font-semibold transition text-center"
            >
              Join as Artisan
            </Link>
          </div>
        </div>
        
        {/* Right side illustration simulation */}
        <div className="flex-1 w-full max-w-md md:max-w-none relative aspect-[4/3] rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/80 p-8 flex items-center justify-center overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full"></div>
          <div className="z-10 text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center shadow-xl">
              <Wrench className="w-10 h-10 text-slate-950" />
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-400 tracking-widest uppercase">Redemption Network</p>
              <h3 className="text-xl font-bold text-white mt-1">Verified Professionalism</h3>
            </div>
            <div className="flex justify-center space-x-2">
              <span className="px-2.5 py-1 rounded bg-slate-800 text-[10px] font-semibold text-slate-400">🛡️ 100% Insured</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-[10px] font-semibold text-slate-400">⚡ Fast Dispatch</span>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section id="categories" className="max-w-6xl mx-auto px-4 py-16 border-t border-slate-900 space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Popular Categories</h2>
            <p className="text-slate-500 text-sm mt-1">Browse our hand-picked and verified services.</p>
          </div>
          <Link to="/login" className="text-emerald-400 text-sm hover:underline flex items-center space-x-1">
            <span>View all</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((c, i) => (
            <Link 
              key={i} 
              to="/login"
              className={`p-6 rounded-2xl bg-gradient-to-br ${c.color} border border-slate-800 hover:border-slate-700 hover:scale-[1.03] transition-all flex flex-col justify-between h-36 text-left group`}
            >
              <span className="text-3xl">{c.icon}</span>
              <div>
                <h4 className="font-bold text-white mt-2 group-hover:text-emerald-400 transition-colors">{c.name}</h4>
                <p className="text-xs text-slate-400 mt-1">Explore listings</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/40 py-8 text-center text-xs text-slate-600">
        <p>© {new Date().getFullYear()} CampCraft Systems. Matching residents with verified artisans in Redemption City.</p>
      </footer>
    </div>
  );
}

// 2. Register Chooser & Form
function RegisterPage() {
  const { registerResident, registerArtisan, registerAdmin } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState(null); // 'resident' | 'artisan' | 'admin'

  // Input states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [zone, setZone] = useState('Zone A');
  const [category, setCategory] = useState('Plumbing');
  const [experienceYears, setExperienceYears] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!fullName || !email || !password) {
      setError('Please fill in all primary fields.');
      return;
    }

    try {
      if (role === 'resident') {
        if (!phone) throw new Error('Phone number is required.');
        await registerResident(fullName, email, password, phone, zone);
        navigate('/resident/dashboard');
      } else if (role === 'artisan') {
        if (!phone || !experienceYears || !bio) throw new Error('Please fill in phone, experience, and bio.');
        await registerArtisan(fullName, email, password, phone, zone, category, experienceYears, bio);
        navigate('/artisan/dashboard');
      } else if (role === 'admin') {
        await registerAdmin(fullName, email, password);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative">
      <div className="absolute top-8 left-8">
        <Link to="/" className="flex items-center space-x-2 font-bold text-white">
          <span>⛺</span>
          <span>CampCraft</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative">
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-2xl font-bold text-white">Create Your Account</h1>
          <p className="text-slate-400 text-sm">Select your role to get started</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* ROLE CHOOSER */}
        {!role ? (
          <div className="space-y-4">
            <button 
              onClick={() => setRole('resident')}
              className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition flex items-center space-x-4 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white group-hover:text-emerald-400">Resident</h4>
                <p className="text-xs text-slate-500">Find and hire verified artisans</p>
              </div>
            </button>

            <button 
              onClick={() => setRole('artisan')}
              className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 hover:bg-blue-500/5 transition flex items-center space-x-4 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white group-hover:text-blue-400">Artisan</h4>
                <p className="text-xs text-slate-500">Offer your skills and find jobs</p>
              </div>
            </button>

            <button 
              onClick={() => setRole('admin')}
              className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 hover:bg-amber-500/5 transition flex items-center space-x-4 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white group-hover:text-amber-400">Admin</h4>
                <p className="text-xs text-slate-500">Verify artisans and manage platform</p>
              </div>
            </button>

            <div className="text-center pt-4 text-xs text-slate-500">
              Already have an account? <Link to="/login" className="text-emerald-400 hover:underline">Sign In</Link>
            </div>
          </div>
        ) : (
          /* REGISTRATION FORM FOR CHOSEN ROLE */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between items-center bg-slate-950 p-2 rounded-xl border border-slate-800/80 mb-2">
              <span className="text-xs text-slate-400">Role: <strong className="text-white capitalize">{role}</strong></span>
              <button 
                type="button" 
                onClick={() => setRole(null)} 
                className="text-xs text-emerald-400 hover:underline"
              >
                Change Role
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Full Name</label>
              <input 
                type="text" 
                placeholder="e.g. Mary Johnson"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-white"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Email address</label>
              <input 
                type="email" 
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-white"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <input 
                type="password" 
                placeholder="••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-white"
                required
              />
            </div>

            {/* Role Extra inputs */}
            {(role === 'resident' || role === 'artisan') && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Phone number</label>
                  <input 
                    type="tel" 
                    placeholder="e.g. 08031234567"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-white"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Zone location</label>
                  <select 
                    value={zone}
                    onChange={e => setZone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-white"
                  >
                    <option value="Zone A">Zone A</option>
                    <option value="Zone B">Zone B</option>
                    <option value="Zone C">Zone C</option>
                  </select>
                </div>
              </>
            )}

            {role === 'artisan' && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Service Category</label>
                  <select 
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-white"
                  >
                    <option value="Plumbing">🚿 Plumbing</option>
                    <option value="Electrical">⚡ Electrical</option>
                    <option value="Carpentry">🪚 Carpentry</option>
                    <option value="Painting">🎨 Painting</option>
                    <option value="Welding">🔥 Welding</option>
                    <option value="Generator Repair">⚙️ Generator Repair</option>
                    <option value="Laundry Services">🧺 Laundry Services</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Experience (Years)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 5"
                    value={experienceYears}
                    onChange={e => setExperienceYears(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-white"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Professional Bio</label>
                  <textarea 
                    placeholder="Describe your skills and services..."
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-white resize-none"
                    required
                  />
                </div>
              </>
            )}

            <button 
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition"
            >
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// 3. Login Page
function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      if (user.role === 'resident') navigate('/resident/dashboard');
      else if (user.role === 'artisan') navigate('/artisan/dashboard');
      else if (user.role === 'admin') navigate('/admin/dashboard');
      else navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid credentials. Try artisan@example.com / resident@example.com / admin@example.com');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative">
      <div className="absolute top-8 left-8">
        <Link to="/" className="flex items-center space-x-2 font-bold text-white">
          <span>⛺</span>
          <span>CampCraft</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative">
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-slate-400 text-sm">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Email address</label>
            <input 
              type="email" 
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-white"
              required
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <Link to="/forgot-password" className="text-xs text-emerald-400 hover:underline">Forgot password?</Link>
            </div>
            <input 
              type="password" 
              placeholder="••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-white"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="remember" className="rounded bg-slate-950 border-slate-800 text-emerald-500 focus:ring-0" />
            <label htmlFor="remember" className="text-xs text-slate-400">Remember me</label>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center pt-6 text-xs text-slate-500">
          Don't have an account? <Link to="/register" className="text-emerald-400 hover:underline">Register</Link>
        </div>
      </div>
    </div>
  );
}

// 4. Forgot Password Page
function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative">
      <div className="absolute top-8 left-8">
        <Link to="/" className="flex items-center space-x-2 font-bold text-white">
          <span>⛺</span>
          <span>CampCraft</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative">
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-2xl font-bold text-white">Reset Your Password</h1>
          <p className="text-slate-400 text-sm">Enter your email and we'll send you a link to reset your password.</p>
        </div>

        {sent ? (
          <div className="space-y-4 text-center">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-xl">
              Password reset link sent! Check your inbox.
            </div>
            <Link to="/login" className="block text-xs text-emerald-400 hover:underline">Back to login</Link>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Email address</label>
              <input 
                type="email" 
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-white"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition"
            >
              Send Reset Link
            </button>
            <div className="text-center pt-2">
              <Link to="/login" className="text-xs text-slate-500 hover:text-white transition">Back to login</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}


// ==========================================
// RESIDENT PAGES
// ==========================================

// 5. Resident Dashboard
function ResidentDashboard() {
  const { currentUser, getJobs } = useAuth();
  const jobs = getJobs().filter(j => j.residentId === currentUser.uid);

  const activeCount = jobs.filter(j => j.status === 'open').length;
  const progressCount = jobs.filter(j => j.status === 'in-progress').length;
  const completedCount = jobs.filter(j => j.status === 'completed').length;

  return (
    <div className="space-y-8 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back,</h1>
          <h2 className="text-xl text-emerald-400 font-semibold">{currentUser.fullName}</h2>
        </div>
        <Link 
          to="/resident/post-job" 
          className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition flex items-center space-x-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post a New Job</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-slate-500 text-xs font-semibold uppercase">Active Listings</span>
          <p className="text-3xl font-extrabold text-white mt-1">{activeCount}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-slate-500 text-xs font-semibold uppercase">In Progress</span>
          <p className="text-3xl font-extrabold text-white mt-1">{progressCount}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-slate-500 text-xs font-semibold uppercase">Completed</span>
          <p className="text-3xl font-extrabold text-white mt-1">{completedCount}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-slate-500 text-xs font-semibold uppercase">Avg Rating Given</span>
          <p className="text-3xl font-extrabold text-white mt-1 flex items-center space-x-1">
            <span>4.5</span>
            <Star className="w-5 h-5 text-amber-400 fill-amber-400 inline" />
          </p>
        </div>
      </div>

      {/* Recent Jobs */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Recent Jobs</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-400">
            <thead className="text-xs text-slate-500 uppercase border-b border-slate-800">
              <tr>
                <th className="pb-3">Job Name</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Zone</th>
                <th className="pb-3">Bids Received</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-slate-500 text-xs">
                    No jobs posted yet. Click "Post a New Job" to start.
                  </td>
                </tr>
              ) : (
                jobs.slice(0, 5).map(job => (
                  <tr key={job.id} className="hover:bg-slate-950/40">
                    <td className="py-4 font-semibold text-white">{job.title}</td>
                    <td className="py-4">{job.category}</td>
                    <td className="py-4">{job.zone}</td>
                    <td className="py-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-xs text-slate-300 font-semibold">
                        {job.bids?.length || 0} bids
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                        job.status === 'open' ? 'bg-emerald-500/10 text-emerald-400' :
                        job.status === 'in-progress' ? 'bg-blue-500/10 text-blue-400' :
                        job.status === 'completed' ? 'bg-slate-800 text-slate-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <Link 
                        to={`/resident/job/${job.id}`}
                        className="text-emerald-400 hover:text-emerald-300 text-xs font-bold"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 6. Browse Artisans
function BrowseArtisans() {
  const { getArtisans } = useAuth();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [zoneFilter, setZoneFilter] = useState('All');

  const artisans = getArtisans().filter(a => a.status === 'approved');

  // Filter logic
  const filtered = artisans.filter(a => {
    const matchesSearch = a.fullName.toLowerCase().includes(search.toLowerCase()) || 
                          a.bio.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || a.category === categoryFilter;
    const matchesZone = zoneFilter === 'All' || a.zone === zoneFilter;
    return matchesSearch && matchesCategory && matchesZone;
  });

  return (
    <div className="space-y-6 text-left">
      <div>
        <h1 className="text-2xl font-bold text-white">Browse Artisans</h1>
        <p className="text-slate-400 text-xs mt-1">Search and filter verified local tradespeople in Redemption City.</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input 
            type="text" 
            placeholder="Search artisans by name, skill, or bio..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-slate-200"
          />
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <select 
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="flex-1 md:w-48 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200"
          >
            <option value="All">All Categories</option>
            <option value="Plumbing">🚿 Plumbing</option>
            <option value="Electrical">⚡ Electrical</option>
            <option value="Carpentry">🪚 Carpentry</option>
            <option value="Painting">🎨 Painting</option>
            <option value="Welding">🔥 Welding</option>
            <option value="Generator Repair">⚙️ Generator Repair</option>
            <option value="Laundry Services">🧺 Laundry Services</option>
          </select>

          <select 
            value={zoneFilter}
            onChange={e => setZoneFilter(e.target.value)}
            className="flex-1 md:w-36 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200"
          >
            <option value="All">All Zones</option>
            <option value="Zone A">Zone A</option>
            <option value="Zone B">Zone B</option>
            <option value="Zone C">Zone C</option>
          </select>
        </div>
      </div>

      {/* Artisan List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-2 p-12 text-center text-slate-500 text-sm bg-slate-900 border border-slate-800 rounded-2xl">
            No artisans found matching the criteria.
          </div>
        ) : (
          filtered.map(art => (
            <div key={art.uid} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-lg border border-emerald-500/20 shadow">
                  {art.fullName[0]}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-white text-base">{art.fullName}</h3>
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <span className="text-emerald-400 font-semibold">{art.category}</span>
                    <span>•</span>
                    <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {art.zone}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-amber-400 pt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-bold">{art.ratingAverage || 'New'}</span>
                    <span className="text-slate-500">({art.ratingCount || 0} reviews)</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">{art.experienceYears}+ years exp</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between h-full min-h-[90px]">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase">
                  Available
                </span>
                <Link 
                  to={`/resident/profile/${art.uid}`}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition mt-4"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// 7. Artisan Profile (View)
function ArtisanProfileView() {
  const { artisanId } = useParams();
  const { getArtisans, getRatings } = useAuth();
  const artisans = getArtisans();
  const art = artisans.find(a => a.uid === artisanId);
  const reviews = getRatings().filter(r => r.artisanId === artisanId);

  if (!art) {
    return <div className="text-left text-red-400">Artisan profile not found.</div>;
  }

  return (
    <div className="space-y-6 text-left max-w-2xl mx-auto bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl">
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-extrabold text-2xl">
            {art.fullName[0]}
          </div>
          <div className="text-center sm:text-left space-y-1">
            <h1 className="text-xl font-bold text-white">{art.fullName}</h1>
            <p className="text-sm text-emerald-400 font-semibold">{art.category} • {art.zone}</p>
            <div className="flex items-center justify-center sm:justify-start space-x-1.5 text-amber-400 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-bold">{art.ratingAverage || 'New'}</span>
              <span className="text-slate-500">({art.ratingCount || 0} ratings)</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">{art.experienceYears}+ years experience</span>
            </div>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400">
          Verified Status
        </span>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">About</h3>
        <p className="text-slate-400 text-sm leading-relaxed font-light">{art.bio}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Services Provided</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-lg bg-slate-950 text-xs text-slate-300 border border-slate-800">
            • General {art.category} Fixes
          </span>
          <span className="px-3 py-1 rounded-lg bg-slate-950 text-xs text-slate-300 border border-slate-800">
            • Emergency Dispatch
          </span>
          <span className="px-3 py-1 rounded-lg bg-slate-950 text-xs text-slate-300 border border-slate-800">
            • Maintenance Checks
          </span>
        </div>
      </div>

      {/* Contact card panel */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500">Need immediate help?</p>
          <p className="text-sm font-bold text-white mt-0.5">{art.phone || 'No phone supplied'}</p>
        </div>
        <a 
          href={`tel:${art.phone}`}
          className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition"
        >
          Call / Contact
        </a>
      </div>

      {/* Reviews Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Recent Reviews ({reviews.length})</h3>
        <div className="space-y-3">
          {reviews.length === 0 ? (
            <p className="text-xs text-slate-500 font-light">No reviews left yet for this artisan.</p>
          ) : (
            reviews.map(rev => (
              <div key={rev.id} className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-300">{rev.residentName}</span>
                  <div className="flex items-center text-amber-400 space-x-1">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{rev.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 italic font-light">"{rev.reviewText}"</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// 8. Post a Job
function PostJobPage() {
  const { currentUser, createJob } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Plumbing');
  const [zone, setZone] = useState('Zone A');
  const [locationDetails, setLocationDetails] = useState('');
  const [budget, setBudget] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !locationDetails) {
      alert('Please fill out title, description, and location details.');
      return;
    }

    createJob({
      title,
      category,
      zone,
      locationDetails,
      budget: budget || 'Contact for Budget',
      residentId: currentUser.uid,
      residentName: currentUser.fullName
    });

    navigate('/resident/my-jobs');
  };

  return (
    <div className="max-w-xl mx-auto text-left bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Post a New Job</h1>
        <p className="text-slate-400 text-xs mt-1">Describe what needs fixing, choose your zone, and list your budget.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Job Title</label>
          <input 
            type="text" 
            placeholder="e.g. Fix kitchen tap"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-white"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Category</label>
            <select 
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-white"
            >
              <option value="Plumbing">🚿 Plumbing</option>
              <option value="Electrical">⚡ Electrical</option>
              <option value="Carpentry">🪚 Carpentry</option>
              <option value="Painting">🎨 Painting</option>
              <option value="Welding">🔥 Welding</option>
              <option value="Generator Repair">⚙️ Generator Repair</option>
              <option value="Laundry Services">🧺 Laundry Services</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Zone</label>
            <select 
              value={zone}
              onChange={e => setZone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-white"
            >
              <option value="Zone A">Zone A</option>
              <option value="Zone B">Zone B</option>
              <option value="Zone C">Zone C</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Budget Details (Optional)</label>
          <input 
            type="text" 
            placeholder="e.g. ₦5,000 - ₦8,000"
            value={budget}
            onChange={e => setBudget(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-white"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Location Address Details</label>
          <input 
            type="text" 
            placeholder="House Number, Street name, landmarks..."
            value={locationDetails}
            onChange={e => setLocationDetails(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-white"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Job Description</label>
          <textarea 
            placeholder="Describe what needs to be done. The more specific, the better the bids..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows="4"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-white resize-none"
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}

// 9. My Jobs (Resident View)
function ResidentJobsPage() {
  const { currentUser, getJobs } = useAuth();
  const [tab, setTab] = useState('All'); // 'All' | 'open' | 'in-progress' | 'completed' | 'cancelled'
  const jobs = getJobs().filter(j => j.residentId === currentUser.uid);

  const filtered = jobs.filter(j => tab === 'All' || j.status === tab);

  const tabs = ['All', 'open', 'in-progress', 'completed', 'cancelled'];

  return (
    <div className="space-y-6 text-left">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">My Jobs</h1>
          <p className="text-slate-400 text-xs mt-1">Manage listings and view bids.</p>
        </div>
        <Link 
          to="/resident/post-job"
          className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition"
        >
          Post a New Job
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors ${
              tab === t 
                ? 'border-emerald-500 text-emerald-400' 
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-2 p-12 text-center text-slate-500 text-xs bg-slate-900 border border-slate-800 rounded-2xl">
            No jobs found in this category.
          </div>
        ) : (
          filtered.map(job => (
            <div key={job.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-white text-base leading-tight">{job.title}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                    job.status === 'open' ? 'bg-emerald-500/10 text-emerald-400' :
                    job.status === 'in-progress' ? 'bg-blue-500/10 text-blue-400' :
                    job.status === 'completed' ? 'bg-slate-850 text-slate-400 border border-slate-800' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {job.status}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <span className="text-emerald-400 font-semibold">{job.category}</span>
                  <span>•</span>
                  <span>{job.zone}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 font-light">{job.description}</p>
              </div>

              <div className="flex items-center justify-between border-t border-slate-850 pt-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Budget</span>
                  <span className="font-bold text-slate-300">{job.budget}</span>
                </div>

                <div className="flex items-center space-x-2">
                  {job.status === 'completed' && (
                    <Link 
                      to={`/resident/leave-rating/${job.id}`}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition"
                    >
                      Rate Artisan
                    </Link>
                  )}
                  <Link 
                    to={`/resident/job/${job.id}`}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold transition"
                  >
                    View Details ({job.bids?.length || 0})
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// 10. Job Details (Resident View with Bid Management)
function JobDetailsPage() {
  const { jobId } = useParams();
  const { getJobs, hireArtisanForJob, cancelJob } = useAuth();

  const job = getJobs().find(j => j.id === jobId);
  const bids = job ? job.bids || [] : [];

  if (!job) {
    return <div className="text-left text-red-400">Job not found.</div>;
  }

  const handleHire = (artisanId, price) => {
    hireArtisanForJob(job.id, artisanId, price);
    alert('Artisan hired successfully!');
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel this job?')) {
      cancelJob(job.id);
      alert('Job cancelled.');
    }
  };

  return (
    <div className="space-y-6 text-left max-w-3xl mx-auto">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase">
              {job.category}
            </span>
            <h1 className="text-xl font-bold text-white mt-1">{job.title}</h1>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
            job.status === 'open' ? 'bg-emerald-500/10 text-emerald-400' :
            job.status === 'in-progress' ? 'bg-blue-500/10 text-blue-400' :
            job.status === 'completed' ? 'bg-slate-800 text-slate-400' :
            'bg-red-500/10 text-red-400'
          }`}>
            {job.status}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-850">
          <div>
            <span className="text-slate-500 block">Zone Location</span>
            <span className="font-bold text-slate-300">{job.zone}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Budget Range</span>
            <span className="font-bold text-slate-300">{job.budget}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Date Posted</span>
            <span className="font-bold text-slate-300">{new Date(job.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Description</h3>
          <p className="text-slate-400 text-sm leading-relaxed font-light">{job.description}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Exact Location Details</h3>
          <p className="text-slate-400 text-sm font-light">{job.locationDetails}</p>
        </div>

        {job.hiredArtisanId && (
          <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs text-blue-400 font-bold block uppercase tracking-wider">Hired Artisan</span>
              <span className="text-sm font-bold text-white">{job.hiredArtisanName}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block text-right">Agreed Price</span>
              <span className="text-sm font-extrabold text-blue-400">₦{(job.agreedPrice || 0).toLocaleString()}</span>
            </div>
          </div>
        )}

        {job.status === 'open' && (
          <button 
            onClick={handleCancel}
            className="w-full py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 text-xs font-bold transition"
          >
            Cancel Job
          </button>
        )}
      </div>

      {/* Bids List */}
      {job.status === 'open' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Artisan Bids ({bids.length})</h2>
          
          <div className="space-y-3">
            {bids.length === 0 ? (
              <p className="text-sm text-slate-500">Waiting for bids from artisans...</p>
            ) : (
              bids.map(bid => (
                <div key={bid.artisanId} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center font-bold text-emerald-400">
                        {bid.artisanName[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{bid.artisanName}</h4>
                        <div className="flex items-center space-x-1.5 text-xs text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span className="font-bold">{bid.artisanRating}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 italic">"{bid.description}"</p>
                  </div>

                  <div className="flex md:flex-col justify-between items-end shrink-0">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block">Bid Price</span>
                      <span className="text-lg font-extrabold text-emerald-400">₦{Number(bid.price).toLocaleString()}</span>
                    </div>

                    <button 
                      onClick={() => handleHire(bid.artisanId, bid.price)}
                      className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition"
                    >
                      Accept Bid
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// 11. Leave Rating
function LeaveRatingPage() {
  const { jobId } = useParams();
  const { getJobs, submitRating, currentUser } = useAuth();
  const navigate = useNavigate();

  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const job = getJobs().find(j => j.id === jobId);

  if (!job) {
    return <div className="text-left text-red-400">Job not found.</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) {
      alert('Please fill out review text.');
      return;
    }

    submitRating({
      jobId: job.id,
      residentId: currentUser.uid,
      residentName: currentUser.fullName,
      artisanId: job.hiredArtisanId,
      artisanName: job.hiredArtisanName,
      rating,
      reviewText
    });

    alert('Thank you for your review!');
    navigate('/resident/my-jobs');
  };

  return (
    <div className="max-w-md mx-auto text-left bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-xl font-bold text-white">Rate Your Experience</h1>
        <p className="text-xs text-slate-400">Rate the quality of service for job: <strong className="text-slate-200">{job.title}</strong></p>
      </div>

      <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl text-center">
        <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold mb-1">Artisan</span>
        <span className="font-bold text-white text-base">{job.hiredArtisanName}</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Star Rating picker */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 block text-center">How would you rate the work?</label>
          <div className="flex justify-center space-x-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button 
                type="button" 
                key={star} 
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star className={`w-8 h-8 ${
                  star <= rating 
                    ? 'text-amber-400 fill-amber-400' 
                    : 'text-slate-700 hover:text-slate-500'
                }`} />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Your Review (Optional)</label>
          <textarea 
            placeholder="Great work! Very professional and on time..."
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
            rows="4"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-white resize-none"
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}


// ==========================================
// ARTISAN PAGES
// ==========================================

// 12. Artisan Dashboard
function ArtisanDashboard() {
  const { currentUser, getJobs, getArtisans } = useAuth();
  const artisanProfile = getArtisans().find(a => a.uid === currentUser.uid) || {};

  const jobs = getJobs().filter(j => j.hiredArtisanId === currentUser.uid);

  const pendingBidsCount = getJobs().filter(j => 
    j.status === 'open' && j.bids.some(b => b.artisanId === currentUser.uid)
  ).length;

  const inProgressCount = jobs.filter(j => j.status === 'in-progress').length;
  const completedCount = jobs.filter(j => j.status === 'completed').length;

  return (
    <div className="space-y-8 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back,</h1>
          <h2 className="text-xl text-blue-400 font-semibold">{currentUser.fullName}</h2>
        </div>
        <Link 
          to="/artisan/find-jobs"
          className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition flex items-center space-x-2"
        >
          <Search className="w-4 h-4" />
          <span>Find Available Jobs</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-slate-500 text-xs font-semibold uppercase">Pending Bids</span>
          <p className="text-3xl font-extrabold text-white mt-1">{pendingBidsCount}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-slate-500 text-xs font-semibold uppercase">In Progress</span>
          <p className="text-3xl font-extrabold text-white mt-1">{inProgressCount}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-slate-500 text-xs font-semibold uppercase">Completed Jobs</span>
          <p className="text-3xl font-extrabold text-white mt-1">{completedCount}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-slate-500 text-xs font-semibold uppercase">Avg rating</span>
          <p className="text-3xl font-extrabold text-white mt-1 flex items-center space-x-1">
            <span>{artisanProfile.ratingAverage || '0'}</span>
            <Star className="w-5 h-5 text-amber-400 fill-amber-400 inline" />
          </p>
        </div>
      </div>

      {/* Recent Jobs */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Your Recent Contracts</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-400">
            <thead className="text-xs text-slate-500 uppercase border-b border-slate-800">
              <tr>
                <th className="pb-3">Job Name</th>
                <th className="pb-3">Resident</th>
                <th className="pb-3">Agreed Price</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-slate-500 text-xs">
                    No hired contracts yet. Navigate to "Find Jobs" to apply.
                  </td>
                </tr>
              ) : (
                jobs.slice(0, 5).map(job => (
                  <tr key={job.id} className="hover:bg-slate-950/40">
                    <td className="py-4 font-semibold text-white">{job.title}</td>
                    <td className="py-4">{job.residentName}</td>
                    <td className="py-4 text-emerald-400 font-bold">₦{(job.agreedPrice || 0).toLocaleString()}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                        job.status === 'in-progress' ? 'bg-blue-500/10 text-blue-400' :
                        job.status === 'completed' ? 'bg-slate-800 text-slate-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <Link 
                        to={`/artisan/job/${job.id}`}
                        className="text-emerald-400 hover:text-emerald-300 text-xs font-bold"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 13. Find Jobs (Artisan View to browse and bid)
function FindJobsPage() {
  const { getJobs, currentUser } = useAuth();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [zoneFilter, setZoneFilter] = useState('All');

  // Filter open jobs
  const openJobs = getJobs().filter(j => j.status === 'open');

  const filtered = openJobs.filter(j => {
    const matchesSearch = j.title.toLowerCase().includes(search.toLowerCase()) || 
                          j.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || j.category === categoryFilter;
    const matchesZone = zoneFilter === 'All' || j.zone === zoneFilter;
    return matchesSearch && matchesCategory && matchesZone;
  });

  return (
    <div className="space-y-6 text-left">
      <div>
        <h1 className="text-2xl font-bold text-white">Find Jobs</h1>
        <p className="text-slate-400 text-xs mt-1">Browse active listings posted by residents in Redemption City.</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input 
            type="text" 
            placeholder="Search active jobs..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-slate-200"
          />
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <select 
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="flex-1 md:w-48 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200"
          >
            <option value="All">All Categories</option>
            <option value="Plumbing">🚿 Plumbing</option>
            <option value="Electrical">⚡ Electrical</option>
            <option value="Carpentry">🪚 Carpentry</option>
            <option value="Painting">🎨 Painting</option>
            <option value="Welding">🔥 Welding</option>
            <option value="Generator Repair">⚙️ Generator Repair</option>
            <option value="Laundry Services">🧺 Laundry Services</option>
          </select>

          <select 
            value={zoneFilter}
            onChange={e => setZoneFilter(e.target.value)}
            className="flex-1 md:w-36 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200"
          >
            <option value="All">All Zones</option>
            <option value="Zone A">Zone A</option>
            <option value="Zone B">Zone B</option>
            <option value="Zone C">Zone C</option>
          </select>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-2 p-12 text-center text-slate-500 text-xs bg-slate-900 border border-slate-800 rounded-2xl">
            No active jobs match these filters. Check back later!
          </div>
        ) : (
          filtered.map(job => {
            const hasBid = job.bids?.some(b => b.artisanId === currentUser.uid);
            return (
              <div key={job.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-white text-base leading-tight">{job.title}</h3>
                    {hasBid && (
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase">
                        Applied
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <span className="text-emerald-400 font-semibold">{job.category}</span>
                    <span>•</span>
                    <span>{job.zone}</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 font-light">{job.description}</p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-850 pt-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Resident Budget</span>
                    <span className="font-bold text-slate-350">{job.budget}</span>
                  </div>

                  <Link 
                    to={`/artisan/job/${job.id}`}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition"
                  >
                    View & Bid
                  </Link>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  );
}

// 14. Job Details (Artisan View to bid / mark complete)
function ArtisanJobDetailsPage() {
  const { jobId } = useParams();
  const { getJobs, placeBid, getArtisans, currentUser, completeJob } = useAuth();

  const [bidPrice, setBidPrice] = useState('');
  const [bidDesc, setBidDesc] = useState('');

  const artisanProfile = getArtisans().find(a => a.uid === currentUser.uid) || {};

  const job = getJobs().find(j => j.id === jobId);

  if (!job) {
    return <div className="text-left text-red-400">Job not found.</div>;
  }

  const handlePlaceBid = (e) => {
    e.preventDefault();
    if (!bidPrice || !bidDesc.trim()) {
      alert('Please fill out bid amount and cover message.');
      return;
    }

    placeBid(job.id, {
      artisanId: currentUser.uid,
      artisanName: currentUser.fullName,
      artisanRating: artisanProfile.ratingAverage || 4.5,
      price: Number(bidPrice),
      description: bidDesc.trim()
    });

    alert('Your bid was submitted!');
    setBidPrice('');
    setBidDesc('');
  };

  const handleMarkComplete = () => {
    completeJob(job.id);
    alert('Contract completed successfully!');
  };

  const myBid = job.bids?.find(b => b.artisanId === currentUser.uid);

  return (
    <div className="space-y-6 text-left max-w-3xl mx-auto">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase">
              {job.category}
            </span>
            <h1 className="text-xl font-bold text-white mt-1">{job.title}</h1>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
            job.status === 'open' ? 'bg-emerald-500/10 text-emerald-400' :
            job.status === 'in-progress' ? 'bg-blue-500/10 text-blue-400' :
            job.status === 'completed' ? 'bg-slate-800 text-slate-400' :
            'bg-red-500/10 text-red-400'
          }`}>
            {job.status}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-850">
          <div>
            <span className="text-slate-500 block">Resident Customer</span>
            <span className="font-bold text-slate-300">{job.residentName}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Budget Offered</span>
            <span className="font-bold text-slate-300">{job.budget}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Location Area</span>
            <span className="font-bold text-slate-300">{job.zone}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Job Description</h3>
          <p className="text-slate-400 text-sm leading-relaxed font-light">{job.description}</p>
        </div>

        {/* If hired for this job */}
        {job.hiredArtisanId === currentUser.uid && (
          <div className="p-4 bg-emerald-500/5 border border-emerald-500/25 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] text-emerald-400 font-bold block uppercase tracking-wider">Hired agreed price</span>
                <span className="text-base font-extrabold text-white">₦{(job.agreedPrice || 0).toLocaleString()}</span>
              </div>
              <span className="text-xs text-slate-400 font-light">Location: {job.locationDetails}</span>
            </div>

            {job.status === 'in-progress' && (
              <button 
                onClick={handleMarkComplete}
                className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition"
              >
                Mark as Completed
              </button>
            )}
          </div>
        )}
      </div>

      {/* Place a Bid form */}
      {job.status === 'open' && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-white">Place a Bid</h2>
          
          {myBid ? (
            <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20 space-y-2 text-xs">
              <p className="text-slate-350">You have already submitted a bid for this job:</p>
              <div className="flex justify-between font-bold">
                <span>Proposed Price:</span>
                <span className="text-emerald-400">₦{Number(myBid.price).toLocaleString()}</span>
              </div>
              <p className="text-slate-400 italic">"{myBid.description}"</p>
            </div>
          ) : (
            <form onSubmit={handlePlaceBid} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Your Bid Amount (₦)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 6500"
                  value={bidPrice}
                  onChange={e => setBidPrice(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Proposal cover letter</label>
                <textarea 
                  placeholder="Tell the resident why they should hire you, your experience, etc..."
                  value={bidDesc}
                  onChange={e => setBidDesc(e.target.value)}
                  rows="3"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-white resize-none"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition"
              >
                Submit Bid
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

// 15. My Jobs (Artisan View)
function ArtisanJobsPage() {
  const { currentUser, getJobs } = useAuth();
  const [tab, setTab] = useState('All');
  const jobs = getJobs().filter(j => j.hiredArtisanId === currentUser.uid);

  const filtered = jobs.filter(j => tab === 'All' || j.status === tab);

  const tabs = ['All', 'in-progress', 'completed'];

  return (
    <div className="space-y-6 text-left">
      <div>
        <h1 className="text-2xl font-bold text-white">Your Contracts</h1>
        <p className="text-slate-400 text-xs mt-1">Manage current agreements and past work history.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors ${
              tab === t 
                ? 'border-emerald-500 text-emerald-400' 
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-2 p-12 text-center text-slate-500 text-xs bg-slate-900 border border-slate-800 rounded-2xl">
            No jobs found in this section.
          </div>
        ) : (
          filtered.map(job => (
            <div key={job.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-white text-base leading-tight">{job.title}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                    job.status === 'in-progress' ? 'bg-blue-500/10 text-blue-400' :
                    'bg-slate-800 text-slate-400'
                  }`}>
                    {job.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400">Customer: <strong className="text-slate-200">{job.residentName}</strong></p>
                <p className="text-xs text-slate-500 line-clamp-2 font-light">{job.description}</p>
              </div>

              <div className="flex items-center justify-between border-t border-slate-850 pt-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Agreed Price</span>
                  <span className="font-bold text-emerald-400">₦{(job.agreedPrice || 0).toLocaleString()}</span>
                </div>

                <Link 
                  to={`/artisan/job/${job.id}`}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold transition"
                >
                  Manage Contract
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// 17. Earnings
function EarningsPage() {
  const { currentUser, getJobs } = useAuth();
  const completedJobs = getJobs().filter(j => j.hiredArtisanId === currentUser.uid && j.status === 'completed');

  const totalEarnings = completedJobs.reduce((acc, curr) => acc + (curr.agreedPrice || 0), 0);

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white">Earnings</h1>
        <p className="text-slate-400 text-xs mt-1">Track your payout history and payout statistics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Earnings Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between min-h-[160px]">
          <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Earnings</span>
          <p className="text-3xl font-extrabold text-white mt-1">₦{totalEarnings.toLocaleString()}</p>
          <span className="text-[10px] text-emerald-400 font-medium">⚡ Instant Bank Settlement Enabled</span>
        </div>

        {/* Visual Custom Chart Bar Mock */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl md:col-span-2 space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-white">Monthly Revenue Breakdown</span>
            <span className="text-slate-500">Last 4 weeks</span>
          </div>

          {/* Simple Custom Bar Graphic */}
          <div className="flex items-end justify-between space-x-4 h-24 pt-4">
            <div className="flex-1 flex flex-col items-center space-y-2">
              <div className="w-full bg-slate-800 rounded-t-lg h-6"></div>
              <span className="text-[9px] text-slate-500">May 1-7</span>
            </div>
            <div className="flex-1 flex flex-col items-center space-y-2">
              <div className="w-full bg-emerald-500/40 rounded-t-lg h-12"></div>
              <span className="text-[9px] text-slate-500">May 8-14</span>
            </div>
            <div className="flex-1 flex flex-col items-center space-y-2">
              <div className="w-full bg-emerald-500 rounded-t-lg h-20"></div>
              <span className="text-[9px] text-slate-500">May 15-21</span>
            </div>
            <div className="flex-1 flex flex-col items-center space-y-2">
              <div className="w-full bg-slate-800 rounded-t-lg.h-4"></div>
              <span className="text-[9px] text-slate-500">May 22-28</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Recent Transactions</h3>
        <div className="divide-y divide-slate-800/60">
          {completedJobs.length === 0 ? (
            <p className="py-6 text-center text-slate-500 text-xs font-light">No earnings transactions posted yet.</p>
          ) : (
            completedJobs.map(job => (
              <div key={job.id} className="py-4 flex justify-between items-center text-sm">
                <div>
                  <h4 className="font-semibold text-white">{job.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Paid by {job.residentName} • {new Date(job.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-400 block">+ ₦{(job.agreedPrice || 0).toLocaleString()}</span>
                  <span className="text-[10px] text-slate-500">Settled</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// 18. Profile (Artisan View to edit)
function ArtisanProfilePage() {
  const { currentUser, getArtisans, updateArtisanProfile } = useAuth();
  const profile = getArtisans().find(a => a.uid === currentUser.uid) || {};

  const [fullName, setFullName] = useState(profile.fullName || '');
  const [phone, setPhone] = useState(profile.phone || '');
  const [zone, setZone] = useState(profile.zone || 'Zone A');
  const [experience, setExperience] = useState(profile.experienceYears || '');
  const [bio, setBio] = useState(profile.bio || '');

  const handleUpdate = (e) => {
    e.preventDefault();
    updateArtisanProfile(currentUser.uid, {
      fullName,
      phone,
      zone,
      experienceYears: Number(experience),
      bio
    });
    alert('Profile updated successfully!');
  };

  return (
    <div className="max-w-xl mx-auto text-left bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Edit Profile Info</h1>
        <p className="text-slate-400 text-xs mt-1">Keep your contact and skill information up to date.</p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Full Name</label>
          <input 
            type="text" 
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-white"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Phone Number</label>
          <input 
            type="text" 
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-white"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Zone Area</label>
            <select 
              value={zone}
              onChange={e => setZone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-white"
            >
              <option value="Zone A">Zone A</option>
              <option value="Zone B">Zone B</option>
              <option value="Zone C">Zone C</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Experience (Years)</label>
            <input 
              type="number" 
              value={experience}
              onChange={e => setExperience(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-white"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Professional Bio</label>
          <textarea 
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows="4"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-white resize-none"
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}


// ==========================================
// ADMIN PAGES
// ==========================================

// 19. Admin Dashboard
function AdminDashboard() {
  const { getArtisans, getJobs } = useAuth();
  const artisans = getArtisans();
  const jobs = getJobs();

  const pendingArtisans = artisans.filter(a => a.status === 'pending');
  const activeArtisans = artisans.filter(a => a.status === 'approved');

  return (
    <div className="space-y-8 text-left">
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Control Panel</h1>
        <p className="text-slate-400 text-xs mt-1">Overview of Redemption City's service marketplace network.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-slate-500 text-xs font-semibold uppercase">Pending Verification</span>
          <p className="text-3xl font-extrabold text-amber-500 mt-1">{pendingArtisans.length}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-slate-500 text-xs font-semibold uppercase">Active Artisans</span>
          <p className="text-3xl font-extrabold text-emerald-400 mt-1">{activeArtisans.length}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-slate-500 text-xs font-semibold uppercase">Total Jobs Posted</span>
          <p className="text-3xl font-extrabold text-white mt-1">{jobs.length}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-slate-500 text-xs font-semibold uppercase">Total Residents</span>
          <p className="text-3xl font-extrabold text-white mt-1">389</p>
        </div>
      </div>

      {/* Quick pending approval links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-850 pb-3">
            <h3 className="font-bold text-white text-base">Verification Queue</h3>
            <Link to="/admin/pending" className="text-xs text-emerald-400 hover:underline">View Queue</Link>
          </div>
          
          <div className="divide-y divide-slate-800/40">
            {pendingArtisans.length === 0 ? (
              <p className="py-4 text-xs text-slate-500">No applications pending verification.</p>
            ) : (
              pendingArtisans.slice(0, 3).map(art => (
                <div key={art.uid} className="py-3 flex justify-between items-center text-xs">
                  <div>
                    <h4 className="font-semibold text-white">{art.fullName}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">{art.category} • {art.zone}</p>
                  </div>
                  <Link 
                    to={`/admin/artisan/${art.uid}`}
                    className="px-2.5 py-1 rounded bg-emerald-500 text-slate-950 font-bold text-[10px] hover:bg-emerald-400 transition"
                  >
                    Verify
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-850 pb-3">
            <h3 className="font-bold text-white text-base">System Job Logs</h3>
            <Link to="/admin/all-jobs" className="text-xs text-emerald-400 hover:underline">All Jobs</Link>
          </div>
          
          <div className="divide-y divide-slate-800/40">
            {jobs.slice(0, 3).map(job => (
              <div key={job.id} className="py-3 flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-semibold text-white">{job.title}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">By {job.residentName} • Status: {job.status}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                  job.status === 'open' ? 'bg-emerald-500/10 text-emerald-400' :
                  job.status === 'in-progress' ? 'bg-blue-500/10 text-blue-400' :
                  'bg-slate-800 text-slate-400'
                }`}>
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 20. Pending Artisans
function PendingArtisansPage() {
  const { getArtisans, updateArtisanStatus } = useAuth();
  const artisans = getArtisans().filter(a => a.status === 'pending');

  const handleApprove = (uid) => {
    updateArtisanStatus(uid, 'approved');
    alert('Artisan approved!');
  };

  const handleReject = (uid) => {
    updateArtisanStatus(uid, 'rejected');
    alert('Artisan application rejected.');
  };

  return (
    <div className="space-y-6 text-left">
      <div>
        <h1 className="text-2xl font-bold text-white">Pending Registrations</h1>
        <p className="text-slate-400 text-xs mt-1">Review credentials and approve new trade contractors.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="divide-y divide-slate-800/60">
          {artisans.length === 0 ? (
            <p className="py-6 text-center text-slate-500 text-xs">No pending artisan registration applications found.</p>
          ) : (
            artisans.map(art => (
              <div key={art.uid} className="py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-white text-base">{art.fullName}</h3>
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <span className="text-emerald-400 font-semibold">{art.category}</span>
                    <span>•</span>
                    <span>{art.zone}</span>
                    <span>•</span>
                    <span>{art.experienceYears} Years Exp</span>
                  </div>
                  <p className="text-xs text-slate-500 font-light max-w-xl italic mt-1">"{art.bio}"</p>
                </div>

                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <Link 
                    to={`/admin/artisan/${art.uid}`}
                    className="flex-1 md:flex-none px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-bold hover:bg-slate-750 transition text-center"
                  >
                    View Details
                  </Link>
                  <button 
                    onClick={() => handleApprove(art.uid)}
                    className="flex-1 md:flex-none px-3.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleReject(art.uid)}
                    className="flex-1 md:flex-none px-3.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold hover:bg-red-500/20 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// 21. Artisan Details (Admin View)
function AdminArtisanDetailsPage() {
  const { artisanId } = useParams();
  const { getArtisans, updateArtisanStatus } = useAuth();
  const navigate = useNavigate();

  const art = getArtisans().find(a => a.uid === artisanId);

  if (!art) {
    return <div className="text-left text-red-400">Artisan application data not found.</div>;
  }

  const handleApprove = () => {
    updateArtisanStatus(art.uid, 'approved');
    alert('Artisan approved!');
    navigate('/admin/pending');
  };

  const handleReject = () => {
    updateArtisanStatus(art.uid, 'rejected');
    alert('Artisan rejected.');
    navigate('/admin/pending');
  };

  return (
    <div className="space-y-6 text-left max-w-2xl mx-auto bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl">
      <div className="pb-6 border-b border-slate-800/80">
        <h1 className="text-xl font-bold text-white">Review Registration Application</h1>
        <p className="text-xs text-slate-400 mt-1">Pending verification details for {art.fullName}.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-850">
        <div>
          <span className="text-slate-500 block">Experience</span>
          <span className="font-bold text-slate-350">{art.experienceYears} Years</span>
        </div>
        <div>
          <span className="text-slate-500 block">Service Category</span>
          <span className="font-bold text-slate-350">{art.category}</span>
        </div>
        <div>
          <span className="text-slate-500 block">Zone Area</span>
          <span className="font-bold text-slate-350">{art.zone}</span>
        </div>
        <div>
          <span className="text-slate-500 block">Contact Info</span>
          <span className="font-bold text-slate-350">{art.phone || 'No phone'}</span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Professional Bio</h3>
        <p className="text-slate-400 text-sm leading-relaxed font-light">{art.bio}</p>
      </div>

      {/* Simulated Document Uploads */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Uploaded Certificates / IDs</h3>
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center space-x-3 text-xs text-slate-400">
          <UploadCloud className="w-5 h-5 text-emerald-400" />
          <div>
            <p className="font-semibold text-white">national_id_card.pdf</p>
            <p className="text-[10px] text-slate-500">Government-issued Identity Document verified</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button 
          onClick={handleApprove}
          className="flex-1 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition"
        >
          Approve & Verify
        </button>
        <button 
          onClick={handleReject}
          className="flex-1 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-bold hover:bg-red-500/20 transition"
        >
          Reject Application
        </button>
      </div>
    </div>
  );
}

// 22. All Artisans
function AllArtisansPage() {
  const { getArtisans } = useAuth();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const artisans = getArtisans();

  const filtered = artisans.filter(a => {
    const matchesSearch = a.fullName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || a.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 text-left">
      <div>
        <h1 className="text-2xl font-bold text-white">System Artisans</h1>
        <p className="text-slate-400 text-xs mt-1">Overview of registered trade professionals in the database.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input 
            type="text" 
            placeholder="Search artisans by name..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm text-slate-200"
          />
        </div>

        <select 
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="w-full md:w-48 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200"
        >
          <option value="All">All Categories</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
          <option value="Carpentry">Carpentry</option>
          <option value="Painting">Painting</option>
          <option value="Welding">Welding</option>
        </select>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-400">
            <thead className="text-xs text-slate-500 uppercase bg-slate-950/60 border-b border-slate-800">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Zone</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map(art => (
                <tr key={art.uid} className="hover:bg-slate-950/30">
                  <td className="p-4 font-semibold text-white">{art.fullName}</td>
                  <td className="p-4">{art.category}</td>
                  <td className="p-4">{art.zone}</td>
                  <td className="p-4">
                    <span className="flex items-center text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                      {art.ratingAverage || '0'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      art.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' :
                      art.status === 'pending' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {art.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link 
                      to={`/admin/artisan/${art.uid}`}
                      className="text-emerald-400 hover:text-emerald-300 text-xs font-bold"
                    >
                      Verify Info
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 23. All Jobs
function AllJobsPage() {
  const { getJobs } = useAuth();
  const jobs = getJobs();

  return (
    <div className="space-y-6 text-left">
      <div>
        <h1 className="text-2xl font-bold text-white">System Job Board Log</h1>
        <p className="text-slate-400 text-xs mt-1">Audit active service listings, contract prices, and bids.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-400">
            <thead className="text-xs text-slate-500 uppercase bg-slate-950/60 border-b border-slate-800">
              <tr>
                <th className="p-4">Job Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Resident</th>
                <th className="p-4">Hired Artisan</th>
                <th className="p-4">Budget / Payout</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {jobs.map(job => (
                <tr key={job.id} className="hover:bg-slate-950/30">
                  <td className="p-4 font-semibold text-white">{job.title}</td>
                  <td className="p-4">{job.category}</td>
                  <td className="p-4">{job.residentName}</td>
                  <td className="p-4">{job.hiredArtisanName || <span className="text-slate-650">Not hired yet</span>}</td>
                  <td className="p-4 font-bold text-slate-350">
                    {job.agreedPrice ? `₦${job.agreedPrice.toLocaleString()}` : job.budget}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      job.status === 'open' ? 'bg-emerald-500/10 text-emerald-400' :
                      job.status === 'in-progress' ? 'bg-blue-500/10 text-blue-400' :
                      job.status === 'completed' ? 'bg-slate-850 text-slate-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 24. Reports
function ReportsPage() {
  const { getJobs } = useAuth();
  const jobs = getJobs();

  const completed = jobs.filter(j => j.status === 'completed');
  const revenue = completed.reduce((acc, curr) => acc + (curr.agreedPrice || 0), 0);

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white">Reports & System Metrics</h1>
        <p className="text-slate-400 text-xs mt-1">Statistical analysis of Redemption City's service marketplace transactions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
          <span className="text-slate-500 text-xs font-semibold uppercase">Platform Volume</span>
          <p className="text-3xl font-extrabold text-white mt-1">{jobs.length} Jobs</p>
          <span className="text-[10px] text-slate-500">Cumulative postings</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
          <span className="text-slate-500 text-xs font-semibold uppercase">Completed Projects</span>
          <p className="text-3xl font-extrabold text-emerald-400 mt-1">{completed.length} Jobs</p>
          <span className="text-[10px] text-slate-500">Success rate: {Math.round((completed.length / (jobs.length || 1)) * 100)}%</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
          <span className="text-slate-500 text-xs font-semibold uppercase">Platform Gross Settlement</span>
          <p className="text-3xl font-extrabold text-emerald-400 mt-1">₦{revenue.toLocaleString()}</p>
          <span className="text-[10px] text-slate-500">Total settled payouts</span>
        </div>
      </div>

      {/* Graphical Overview representation */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
        <div>
          <h3 className="font-bold text-white text-base">Weekly Activity Overview</h3>
          <p className="text-xs text-slate-500">Represented in active posts per week</p>
        </div>

        {/* CSS Graph Line Mock */}
        <div className="relative h-48 border border-slate-800/80 rounded-2xl bg-slate-950 p-6 flex flex-col justify-between">
          <div className="flex items-end justify-between h-36">
            <div className="h-10 w-2.5 bg-emerald-500/20 rounded-full flex flex-col justify-end">
              <div className="h-6 w-full bg-emerald-500 rounded-full"></div>
            </div>
            <div className="h-20 w-2.5 bg-emerald-500/20 rounded-full flex flex-col justify-end">
              <div className="h-14 w-full bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
            <div className="h-32 w-2.5 bg-emerald-500/20 rounded-full flex flex-col justify-end">
              <div className="h-24 w-full bg-emerald-500 rounded-full"></div>
            </div>
            <div className="h-16 w-2.5 bg-emerald-500/20 rounded-full flex flex-col justify-end">
              <div className="h-8 w-full bg-emerald-500 rounded-full"></div>
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>May 1-7</span>
            <span>May 8-14</span>
            <span>May 15-21</span>
            <span>May 22-28</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 25. Settings
function SettingsPage() {
  return (
    <div className="space-y-6 text-left max-w-xl mx-auto bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl">
      <div>
        <h1 className="text-xl font-bold text-white">General Settings</h1>
        <p className="text-slate-400 text-xs mt-1">Configure categories, zones, and platform parameters.</p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl space-y-2">
          <h3 className="text-sm font-bold text-white">Manage Service Zones</h3>
          <p className="text-xs text-slate-500">Add or edit operational boundaries within Redemption City.</p>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="px-2.5 py-1 rounded bg-slate-900 text-xs text-slate-350 border border-slate-800">Zone A (Active)</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 text-xs text-slate-350 border border-slate-800">Zone B (Active)</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 text-xs text-slate-350 border border-slate-800">Zone C (Active)</span>
          </div>
        </div>

        <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl space-y-2">
          <h3 className="text-sm font-bold text-white">Artisan Verification Rules</h3>
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-slate-400">Require government identity document</span>
            <span className="text-emerald-400 font-bold">Enabled</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Require certifications for electricians</span>
            <span className="text-emerald-400 font-bold">Enabled</span>
          </div>
        </div>

        <button 
          onClick={() => alert('Settings saved!')}
          className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition"
        >
          Save Platform Changes
        </button>
      </div>
    </div>
  );
}


// ==========================================
// CORE APP ROUTER WRAPPER
// ==========================================

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routing */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Protected Resident Routing */}
          <Route element={<ProtectedLayout allowedRoles={['resident']} />}>
            <Route path="/resident/dashboard" element={<ResidentDashboard />} />
            <Route path="/resident/browse" element={<BrowseArtisans />} />
            <Route path="/resident/profile/:artisanId" element={<ArtisanProfileView />} />
            <Route path="/resident/post-job" element={<PostJobPage />} />
            <Route path="/resident/my-jobs" element={<ResidentJobsPage />} />
            <Route path="/resident/job/:jobId" element={<JobDetailsPage />} />
            <Route path="/resident/leave-rating/:jobId" element={<LeaveRatingPage />} />
          </Route>

          {/* Protected Artisan Routing */}
          <Route element={<ProtectedLayout allowedRoles={['artisan']} />}>
            <Route path="/artisan/dashboard" element={<ArtisanDashboard />} />
            <Route path="/artisan/find-jobs" element={<FindJobsPage />} />
            <Route path="/artisan/my-jobs" element={<ArtisanJobsPage />} />
            <Route path="/artisan/job/:jobId" element={<ArtisanJobDetailsPage />} />
            <Route path="/artisan/earnings" element={<EarningsPage />} />
            <Route path="/artisan/profile" element={<ArtisanProfilePage />} />
          </Route>

          {/* Protected Admin Routing */}
          <Route element={<ProtectedLayout allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/pending" element={<PendingArtisansPage />} />
            <Route path="/admin/artisan/:artisanId" element={<AdminArtisanDetailsPage />} />
            <Route path="/admin/all-artisans" element={<AllArtisansPage />} />
            <Route path="/admin/all-jobs" element={<AllJobsPage />} />
            <Route path="/admin/reports" element={<ReportsPage />} />
            <Route path="/admin/settings" element={<SettingsPage />} />
          </Route>

          {/* Catch-all redirection */}
          <Route path="*" element={<Link to="/" className="text-center p-12 text-sm text-emerald-400 block hover:underline">Page not found. Return to Home</Link>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
