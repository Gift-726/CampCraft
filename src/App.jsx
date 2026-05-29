import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import { useAuth } from './contexts/AuthContext';
import ProtectedLayout from './components/ProtectedLayout';
import { 
  Star, Search, MapPin, AlertCircle, Wrench, UploadCloud, ChevronRight,
  PlusCircle, User, Settings, Droplets, Zap, Hammer, Paintbrush,
  Flame, Cpu, WashingMachine, ShieldCheck, Home, Briefcase
} from 'lucide-react';

// ==========================================
// PUBLIC PAGES
// ==========================================

// 1. Landing Page
function LandingPage() {
  const { currentUser } = useAuth();
  const categories = [
    { name: 'Plumbing', Icon: Droplets },
    { name: 'Electrical', Icon: Zap },
    { name: 'Carpentry', Icon: Hammer },
    { name: 'Painting', Icon: Paintbrush },
    { name: 'Welding', Icon: Flame },
    { name: 'Generator Repair', Icon: Cpu },
    { name: 'Laundry Services', Icon: WashingMachine },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/campcraft-logo.png" alt="CampCraft" className="h-14 w-auto object-contain logo-tint" />
          </div>
          <nav className="hidden md:flex space-x-8 text-sm text-slate-600 font-medium">
            <a href="#how" className="hover:text-emerald-800 transition-colors">How It Works</a>
            <a href="#categories" className="hover:text-emerald-800 transition-colors">Categories</a>
            <a href="#about" className="hover:text-emerald-800 transition-colors">About</a>
          </nav>
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <Link 
                to={`/${currentUser.role}/dashboard`}
                className="px-4 py-2 rounded-lg bg-emerald-800 text-white font-bold text-sm hover:bg-emerald-900 transition"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition">Login</Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 rounded-lg bg-emerald-800 text-white font-bold text-sm hover:bg-emerald-900 transition shadow-sm"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 space-y-6 text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Find Trusted Artisans <br/>
            <span className="text-emerald-800">
              in Redemption City
            </span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-xl font-light">
            CampCraft connects residents with verified local tradespeople. Fast, reliable, accountable.
          </p>
          <div className="flex flex-row items-center gap-4 pt-2">
            <Link 
              to="/login"
              className="px-6 py-2.5 rounded-lg bg-emerald-800 text-white font-bold hover:bg-emerald-900 shadow transition-all text-center text-sm"
            >
              Find Service
            </Link>
            <Link 
              to="/register" 
              className="px-6 py-2.5 rounded-lg border border-slate-350 text-slate-700 bg-white font-bold hover:bg-slate-50 transition text-center text-sm"
            >
              Join as Artisan
            </Link>
          </div>
          
          {/* Trust Banner / Stats */}
          <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200">
            <div>
              <div className="text-xl md:text-2xl font-black text-emerald-800">50+</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Verified Artisans</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-black text-emerald-800">100%</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Secure Hires</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-black text-emerald-800">24/7</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Support</div>
            </div>
          </div>
        </div>
        
        {/* Right side hero illustration */}
        <div className="flex-1 w-full max-w-md md:max-w-none flex items-center justify-center">
          <img
            src="/right-hero.png"
            alt="Trusted artisans in Redemption City"
            className="w-full h-auto object-contain drop-shadow-lg"
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="max-w-6xl mx-auto px-4 py-12 border-t border-slate-200 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900">How It Works</h2>
          <p className="text-slate-500 text-sm font-light">Simple steps to get your home tasks solved in Redemption City.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-left space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-black">1</div>
            <h3 className="text-base font-bold text-slate-900">Post a Job Request</h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-light">Specify what repair or service you need, set your budget, and post it to our board.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-left space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-black">2</div>
            <h3 className="text-base font-bold text-slate-900">Compare Artisan Bids</h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-light">Verified local professionals will bid on your job. Compare reviews, experience, and pricing.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-left space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-black">3</div>
            <h3 className="text-base font-bold text-slate-900">Hire and Track</h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-light">Choose the best fit, monitor task progress, and release payment only when fully satisfied.</p>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section id="categories" className="max-w-6xl mx-auto px-4 py-12 border-t border-slate-200 space-y-8 bg-white rounded-3xl shadow-sm mb-12">
        <div className="flex items-end justify-between px-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Popular Categories</h2>
            <p className="text-slate-500 text-sm mt-1">Browse trade professionals by category.</p>
          </div>
          <Link to="/login" className="text-emerald-800 text-sm font-bold hover:underline flex items-center space-x-1">
            <span>View all</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
          {categories.map((c, i) => {
            const CatIcon = c.Icon;
            return (
              <Link 
                key={i} 
                to="/login"
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-800 hover:shadow-md transition-all flex flex-col justify-between h-32 text-left group"
              >
                <div className="flex items-center justify-between">
                  <span className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-800 border border-emerald-100">
                    <CatIcon className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Browse</span>
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors">{c.name}</h4>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-6xl mx-auto px-4 py-12 border-t border-slate-200 space-y-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">Why Choose CampCraft?</h2>
            <p className="text-slate-500 text-sm leading-relaxed font-light">
              CampCraft is built specifically for Redemption City residents to ensure safe, transparent, and prompt home maintenance services. We bridge the gap between skill and need with accountability.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Rigorous Artisan Vetting</h4>
                  <p className="text-slate-500 text-xs font-light">Every artisan profile is reviewed by our admin team with background checks before approval.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">No Hidden Charges</h4>
                  <p className="text-slate-500 text-xs font-light">All pricing and negotiation happen transparently on our platform before work starts.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Community Driven Trust</h4>
                  <p className="text-slate-500 text-xs font-light">Honest resident feedback and rating system ensures consistently high standard of service.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-emerald-800 text-white p-8 rounded-3xl space-y-6 relative overflow-hidden shadow-lg">
            <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-48 h-48 rounded-full bg-emerald-700/50"></div>
            <h3 className="text-xl md:text-2xl font-black relative z-10">Ready to hire or showcase your skills?</h3>
            <p className="text-emerald-100 text-xs md:text-sm font-light relative z-10 leading-relaxed">
              Join thousands of residents and trade experts today. Get work done or grow your business.
            </p>
            <div className="flex flex-row items-center gap-4 relative z-10 pt-2">
              <Link to="/register" className="px-5 py-2.5 rounded-xl bg-white text-emerald-800 font-bold hover:bg-slate-50 text-xs md:text-sm shadow transition-all">
                Get Started
              </Link>
              <Link to="/login" className="px-5 py-2.5 rounded-xl border border-emerald-600 hover:bg-emerald-750 text-white font-bold text-xs md:text-sm transition-all">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500 shadow-inner">
        <p>© {new Date().getFullYear()} CampCraft. Redemption City's Artisan & Service Finder.</p>
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
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-center items-center px-4 py-12 relative">
      <div className="absolute top-8 left-8">
        <Link to="/">
          <img src="/campcraft-logo.png" alt="CampCraft" className="h-14 w-auto object-contain logo-tint" />
        </Link>
      </div>

      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-xl relative">
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Create Your Account</h1>
          <p className="text-slate-500 text-sm">Select your role to get started</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* ROLE CHOOSER */}
        {!role ? (
          <div className="space-y-4">
            <button 
              onClick={() => setRole('resident')}
              className="w-full p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-800 hover:bg-emerald-50/20 transition flex items-center space-x-4 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 group-hover:text-emerald-850">Resident</h4>
                <p className="text-xs text-slate-500">Find and hire verified artisans</p>
              </div>
            </button>

            <button 
              onClick={() => setRole('artisan')}
              className="w-full p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-800 hover:bg-emerald-50/20 transition flex items-center space-x-4 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 group-hover:text-emerald-850">Artisan</h4>
                <p className="text-xs text-slate-500">Offer your skills and find jobs</p>
              </div>
            </button>

            <div className="text-center pt-4 text-xs text-slate-500">
              Already have an account? <Link to="/login" className="text-emerald-800 font-bold hover:underline">Sign In</Link>
            </div>
          </div>
        ) : (
          /* REGISTRATION FORM FOR CHOSEN ROLE */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200 mb-2">
              <span className="text-xs text-slate-600">Role: <strong className="text-emerald-850 capitalize font-extrabold">{role}</strong></span>
              <button 
                type="button" 
                onClick={() => setRole(null)} 
                className="text-xs text-emerald-800 font-bold hover:underline"
              >
                Change Role
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Full Name</label>
              <input 
                type="text" 
                placeholder="e.g. Mary Johnson"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Email address</label>
              <input 
                type="email" 
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Password</label>
              <input 
                type="password" 
                placeholder="••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800"
                required
              />
            </div>

            {/* Role Extra inputs */}
            {(role === 'resident' || role === 'artisan') && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Phone number</label>
                  <input 
                    type="tel" 
                    placeholder="e.g. 08031234567"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Zone location</label>
                  <select 
                    value={zone}
                    onChange={e => setZone(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800"
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
                  <label className="text-xs font-semibold text-slate-600">Service Category</label>
                  <select 
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800"
                  >
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Carpentry">Carpentry</option>
                    <option value="Painting">Painting</option>
                    <option value="Welding">Welding</option>
                    <option value="Generator Repair">Generator Repair</option>
                    <option value="Laundry Services">Laundry Services</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Experience (Years)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 5"
                    value={experienceYears}
                    onChange={e => setExperienceYears(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Professional Bio</label>
                  <textarea 
                    placeholder="Describe your skills and services..."
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800 resize-none"
                    required
                  />
                </div>
              </>
            )}

            <button 
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold shadow transition"
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
      setError(err.message || 'Invalid credentials. Try resident@example.com / artisan@example.com');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-center items-center px-4 py-12 relative">
      <div className="absolute top-8 left-8">
        <Link to="/">
          <img src="/campcraft-logo.png" alt="CampCraft" className="h-14 w-auto object-contain logo-tint" />
        </Link>
      </div>

      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-xl relative">
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-505 text-sm">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">Email address</label>
            <input 
              type="email" 
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800"
              required
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-600">Password</label>
              <Link to="/forgot-password" className="text-xs text-emerald-850 font-semibold hover:underline">Forgot password?</Link>
            </div>
            <input 
              type="password" 
              placeholder="••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="remember" className="rounded border-slate-300 text-emerald-800 focus:ring-0" />
            <label htmlFor="remember" className="text-xs text-slate-500 font-medium">Remember me</label>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold shadow transition disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center pt-6 text-xs text-slate-500">
          Don't have an account? <Link to="/register" className="text-emerald-800 font-bold hover:underline">Register</Link>
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
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-center items-center px-4 py-12 relative">
      <div className="absolute top-8 left-8">
        <Link to="/">
          <img src="/campcraft-logo.png" alt="CampCraft" className="h-14 w-auto object-contain logo-tint" />
        </Link>
      </div>

      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-xl relative">
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Reset Your Password</h1>
          <p className="text-slate-500 text-sm">Enter your email and we'll send you a link to reset your password.</p>
        </div>

        {sent ? (
          <div className="space-y-4 text-center">
            <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm rounded-xl">
              Password reset link sent! Check your inbox.
            </div>
            <Link to="/login" className="block text-xs text-emerald-800 font-bold hover:underline">Back to login</Link>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Email address</label>
              <input 
                type="email" 
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold shadow transition"
            >
              Send Reset Link
            </button>
            <div className="text-center pt-2">
              <Link to="/login" className="text-xs text-slate-500 hover:text-slate-800 transition">Back to login</Link>
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
  const { currentUser, getJobs, getArtisans, getRatings } = useAuth();
  const allJobs   = getJobs().filter(j => j.residentId === currentUser.uid);
  const artisans  = getArtisans().filter(a => a.status === 'approved');
  const ratings   = getRatings().filter(r => r.residentId === currentUser.uid);

  const postedCount    = allJobs.length;
  const progressCount  = allJobs.filter(j => j.status === 'in-progress').length;
  const completedCount = allJobs.filter(j => j.status === 'completed').length;
  const cancelledCount = allJobs.filter(j => j.status === 'cancelled').length;
  const openCount      = allJobs.filter(j => j.status === 'open').length;
  const avgRating = ratings.length
    ? (ratings.reduce((s, r) => s + r.rating, 0) / ratings.length).toFixed(1)
    : '—';

  const [jobTab, setJobTab] = useState('all');
  const filteredJobs = jobTab === 'all' ? allJobs
    : allJobs.filter(j => j.status === jobTab);

  const categoryIcons = {
    Plumbing: Droplets, Electrical: Zap, Carpentry: Hammer,
    Painting: Paintbrush, Welding: Flame, 'Generator Repair': Cpu,
    'Laundry Services': WashingMachine,
  };

  const catColors = {
    Plumbing: 'bg-blue-50 text-blue-700',
    Electrical: 'bg-yellow-50 text-yellow-700',
    Carpentry: 'bg-amber-50 text-amber-700',
    Painting: 'bg-purple-50 text-purple-700',
    Welding: 'bg-red-50 text-red-700',
    'Generator Repair': 'bg-slate-100 text-slate-700',
    'Laundry Services': 'bg-teal-50 text-teal-700',
  };

  const statusStyle = s => ({
    'open':        'bg-emerald-50 text-emerald-700',
    'in-progress': 'bg-blue-50 text-blue-700',
    'completed':   'bg-slate-100 text-slate-600',
    'cancelled':   'bg-red-50 text-red-700',
  }[s] || 'bg-slate-100 text-slate-600');

  const jobColorDot = s => ({
    'open': 'bg-emerald-500', 'in-progress': 'bg-blue-500',
    'completed': 'bg-slate-400', 'cancelled': 'bg-red-400',
  }[s] || 'bg-slate-300');

  return (
    <div className="space-y-6 text-left">

      {/* ── WELCOME HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-slate-500 text-sm">Find trusted artisans and get your jobs done.</p>
          <h1 className="text-2xl font-black text-slate-900 mt-0.5">
            Welcome back, {currentUser.fullName} 👋
          </h1>
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Jobs Posted',     value: postedCount,    icon: Briefcase,  bg: 'bg-emerald-50', color: 'text-emerald-700' },
          { label: 'In Progress',     value: progressCount,  icon: Wrench,     bg: 'bg-blue-50',    color: 'text-blue-700' },
          { label: 'Completed',       value: completedCount, icon: ShieldCheck,bg: 'bg-amber-50',   color: 'text-amber-600' },
          { label: 'Avg. Rating Given', value: avgRating,   icon: Star,       bg: 'bg-slate-50',   color: 'text-slate-700' },
        ].map(({ label, value, icon: Icon, bg, color }) => (
          <div key={label} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
            <div className={`w-11 h-11 rounded-xl ${bg} ${color} flex items-center justify-center shrink-0`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900 leading-tight">{value}</p>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── THREE-COLUMN ROW ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* RECENT JOBS */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Recent Jobs</h2>
            <Link to="/resident/my-jobs" className="text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-1">
              View all jobs <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {allJobs.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">No jobs posted yet.</p>
            ) : allJobs.slice(0, 4).map(job => {
              const CatIcon = categoryIcons[job.category] || Wrench;
              const dotColor = jobColorDot(job.status);
              const catColor = catColors[job.category] || 'bg-slate-50 text-slate-600';
              return (
                <div key={job.id} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                  <div className={`w-9 h-9 rounded-xl ${catColor} flex items-center justify-center shrink-0`}>
                    <CatIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{job.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                      <span className="text-emerald-700 font-medium">{job.category}</span>
                      <span>•</span> {job.zone}
                    </p>
                  </div>
                  <span className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold capitalize ${statusStyle(job.status)}`}>
                    {job.status === 'in-progress' ? 'In Progress' : job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                </div>
              );
            })}
          </div>

          <Link
            to="/resident/post-job"
            className="flex items-center justify-center gap-2 w-full py-2.5 border-2 border-dashed border-slate-200 rounded-xl text-sm font-semibold text-slate-500 hover:border-emerald-400 hover:text-emerald-700 transition"
          >
            <PlusCircle className="w-4 h-4" /> Post a New Job
          </Link>
        </div>

        {/* RECOMMENDED ARTISANS */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Recommended Artisans</h2>
            <Link to="/resident/browse" className="text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-1">
              View all artisans <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {artisans.slice(0, 4).map(art => (
              <div key={art.uid} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {art.fullName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{art.fullName}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                    <span className="text-emerald-700 font-medium">{art.category}</span>
                    <span>•</span> {art.zone}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-[11px] font-bold text-slate-700">{art.ratingAverage}</span>
                    <span className="text-[10px] text-slate-400">({art.ratingCount} reviews)</span>
                  </div>
                </div>
                <Link
                  to={`/resident/profile/${art.uid}`}
                  className="shrink-0 px-3 py-1.5 text-[11px] font-bold text-emerald-800 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition"
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* POPULAR CATEGORIES + CTA */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-900">Popular Categories</h2>
              <Link to="/resident/browse" className="text-xs text-emerald-700 font-semibold hover:underline">View all →</Link>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {Object.entries(categoryIcons).map(([name, Icon]) => {
                const cc = catColors[name] || 'bg-slate-50 text-slate-600';
                return (
                  <Link
                    key={name}
                    to="/resident/browse"
                    className="flex flex-col items-center gap-1.5 group"
                  >
                    <div className={`w-11 h-11 rounded-xl ${cc} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] text-slate-600 font-medium text-center leading-tight">{name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CTA card */}
          <div className="bg-emerald-800 rounded-2xl p-5 flex items-end justify-between overflow-hidden relative">
            <div className="space-y-2 z-10">
              <p className="text-white font-bold text-sm leading-snug">Can't find what you need?</p>
              <p className="text-emerald-200 text-[11px] leading-relaxed">
                Post a job and let our trusted artisans come to you.
              </p>
              <Link
                to="/resident/post-job"
                className="inline-block mt-1 px-4 py-2 bg-white text-emerald-800 text-xs font-bold rounded-xl hover:bg-emerald-50 transition shadow"
              >
                Post a Job Now
              </Link>
            </div>
            <div className="absolute right-2 bottom-0 text-7xl opacity-20 select-none">🔨</div>
          </div>
        </div>
      </div>

      {/* ── JOBS OVERVIEW TABLE ── */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="font-bold text-slate-900 text-base">Jobs Overview</h2>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 px-5 pt-4 pb-2 overflow-x-auto">
          {[
            { key: 'all',         label: 'All Jobs',   count: postedCount },
            { key: 'open',        label: 'Open',       count: openCount },
            { key: 'in-progress', label: 'In Progress',count: progressCount },
            { key: 'completed',   label: 'Completed',  count: completedCount },
            { key: 'cancelled',   label: 'Cancelled',  count: cancelledCount },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setJobTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                jobTab === tab.key
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              {tab.label}
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                jobTab === tab.key ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto px-5 pb-5">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-[11px] text-slate-400 uppercase font-semibold border-b border-slate-100">
                <th className="pb-3 pt-2">Job Title</th>
                <th className="pb-3 pt-2">Category</th>
                <th className="pb-3 pt-2">Zone</th>
                <th className="pb-3 pt-2">Artisan</th>
                <th className="pb-3 pt-2">Status</th>
                <th className="pb-3 pt-2">Posted On</th>
                <th className="pb-3 pt-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400 text-xs">
                    No jobs found.
                  </td>
                </tr>
              ) : filteredJobs.map(job => {
                const CatIcon = categoryIcons[job.category] || Wrench;
                const cc = catColors[job.category] || 'bg-slate-50 text-slate-600';
                return (
                  <tr key={job.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-lg ${cc} flex items-center justify-center shrink-0`}>
                          <CatIcon className="w-4 h-4" />
                        </div>
                        <span className="font-semibold text-slate-800 text-sm">{job.title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 text-slate-600">{job.category}</td>
                    <td className="py-3.5 text-slate-600">{job.zone}</td>
                    <td className="py-3.5 text-slate-600">
                      {job.hiredArtisanName || <span className="text-slate-400">—</span>}
                    </td>
                    <td className="py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold capitalize ${statusStyle(job.status)}`}>
                        {job.status === 'in-progress' ? 'In Progress' : job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-500 text-xs">
                      {new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="py-3.5">
                      <Link
                        to={`/resident/job/${job.id}`}
                        className="px-3 py-1.5 text-[11px] font-bold border border-slate-200 rounded-lg text-slate-700 hover:border-emerald-400 hover:text-emerald-700 transition"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-5 py-3 text-center">
          <Link to="/resident/my-jobs" className="text-xs font-semibold text-emerald-700 hover:underline flex items-center justify-center gap-1">
            View all jobs <ChevronRight className="w-3.5 h-3.5" />
          </Link>
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
        <h1 className="text-2xl font-bold text-slate-900">Browse Artisans</h1>
        <p className="text-slate-500 text-xs mt-1">Search and filter verified local tradespeople in Redemption City.</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center shadow-sm">
        <div className="flex-1 w-full relative">
          <Search className="w-4 h-4 text-slate-450 absolute left-3 top-3" />
          <input 
            type="text" 
            placeholder="Search artisans by name, skill, or bio..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-250 focus:outline-none focus:border-emerald-850 text-sm text-slate-700 placeholder-slate-400"
          />
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <select 
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="flex-1 md:w-48 px-4 py-2 rounded-xl bg-slate-50 border border-slate-250 text-sm text-slate-700 focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Carpentry">Carpentry</option>
            <option value="Painting">Painting</option>
            <option value="Welding">Welding</option>
            <option value="Generator Repair">Generator Repair</option>
            <option value="Laundry Services">Laundry Services</option>
          </select>

          <select 
            value={zoneFilter}
            onChange={e => setZoneFilter(e.target.value)}
            className="flex-1 md:w-36 px-4 py-2 rounded-xl bg-slate-50 border border-slate-250 text-sm text-slate-700 focus:outline-none"
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
          <div className="col-span-2 p-12 text-center text-slate-405 text-sm bg-white border border-slate-200 rounded-2xl shadow-sm">
            No artisans found matching the criteria.
          </div>
        ) : (
          filtered.map(art => (
            <div key={art.uid} className="p-6 rounded-2xl bg-white border border-slate-200 flex items-start justify-between gap-4 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  {art.fullName[0]}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-base">{art.fullName}</h3>
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <span className="text-emerald-805 font-bold">{art.category}</span>
                    <span>•</span>
                    <span className="flex items-center"><MapPin className="w-3 h-3 mr-1 text-slate-400" /> {art.zone}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-amber-500 pt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span className="font-bold">{art.ratingAverage || 'New'}</span>
                    <span className="text-slate-400">({art.ratingCount || 0} reviews)</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600">{art.experienceYears}+ years experience</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between h-full min-h-[90px]">
                <span className="px-2.5 py-1 rounded bg-emerald-50 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  Available
                </span>
                <Link 
                  to={`/resident/profile/${art.uid}`}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-800 text-xs font-bold text-white hover:bg-emerald-900 shadow transition-all mt-4"
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
    return <div className="text-left text-red-700">Artisan profile not found.</div>;
  }

  return (
    <div className="space-y-6 text-left max-w-2xl mx-auto bg-white border border-slate-200 p-8 rounded-3xl shadow-md">
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-800 text-white flex items-center justify-center font-black text-2xl shadow-sm">
            {art.fullName[0]}
          </div>
          <div className="text-center sm:text-left space-y-1">
            <h1 className="text-xl font-bold text-slate-900">{art.fullName}</h1>
            <p className="text-sm text-emerald-800 font-bold">{art.category} • {art.zone}</p>
            <div className="flex items-center justify-center sm:justify-start space-x-1.5 text-amber-500 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              <span className="font-bold">{art.ratingAverage || 'New'}</span>
              <span className="text-slate-400">({art.ratingCount || 0} ratings)</span>
              <span className="text-slate-450">•</span>
              <span className="text-slate-650">{art.experienceYears}+ years experience</span>
            </div>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-bold text-emerald-800">
          Verified Status
        </span>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">About</h3>
        <p className="text-slate-600 text-sm leading-relaxed font-light">{art.bio}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Services</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-lg bg-slate-50 text-xs text-slate-600 border border-slate-200">
            • General {art.category} Installation & Repair
          </span>
          <span className="px-3 py-1 rounded-lg bg-slate-50 text-xs text-slate-600 border border-slate-200">
            • Tap & Toilet Repair
          </span>
          <span className="px-3 py-1 rounded-lg bg-slate-50 text-xs text-slate-600 border border-slate-200">
            • Drain Cleaning
          </span>
        </div>
      </div>

      {/* Contact card panel */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-550">Need immediate help?</p>
          <p className="text-sm font-bold text-slate-800 mt-0.5">{art.phone || 'No phone'}</p>
        </div>
        <a 
          href={`tel:${art.phone}`}
          className="px-4 py-2 rounded-lg bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition shadow-sm"
        >
          Call / Contact
        </a>
      </div>

      {/* Reviews Section */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent Reviews ({reviews.length})</h3>
        <div className="space-y-3">
          {reviews.length === 0 ? (
            <p className="text-xs text-slate-500 font-light italic">No reviews left yet for this artisan.</p>
          ) : (
            reviews.map(rev => (
              <div key={rev.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">{rev.residentName}</span>
                  <div className="flex items-center text-amber-500 space-x-1">
                    <Star className="w-3 h-3 fill-amber-500" />
                    <span>{rev.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 italic font-light">"{rev.reviewText}"</p>
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !locationDetails) {
      alert('Please fill out title, description, and location details.');
      return;
    }

    try {
      await createJob({
        title,
        category,
        zone,
        locationDetails,
        budget: budget || 'Contact for Budget',
        residentId: currentUser.uid,
        residentName: currentUser.fullName,
        description
      });
      navigate('/resident/my-jobs');
    } catch (err) {
      console.error("Error creating job:", err);
      alert("Failed to create job: " + err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto text-left bg-white border border-slate-200 p-8 rounded-3xl shadow-md">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Post a New Job</h1>
        <p className="text-slate-500 text-xs mt-1">Describe what needs fixing, choose your zone, and list your budget.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600">Job Title</label>
          <input 
            type="text" 
            placeholder="e.g. Fix kitchen tap"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">Category</label>
            <select 
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800"
            >
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="Carpentry">Carpentry</option>
              <option value="Painting">Painting</option>
              <option value="Welding">Welding</option>
              <option value="Generator Repair">Generator Repair</option>
              <option value="Laundry Services">Laundry Services</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">Zone</label>
            <select 
              value={zone}
              onChange={e => setZone(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800"
            >
              <option value="Zone A">Zone A</option>
              <option value="Zone B">Zone B</option>
              <option value="Zone C">Zone C</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600">Budget Details (Optional)</label>
          <input 
            type="text" 
            placeholder="e.g. ₦5,000 - ₦8,000"
            value={budget}
            onChange={e => setBudget(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600">Location Address Details</label>
          <input 
            type="text" 
            placeholder="House Number, Street name, landmarks..."
            value={locationDetails}
            onChange={e => setLocationDetails(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600">Job Description</label>
          <textarea 
            placeholder="Describe what needs to be done. The more specific, the better the bids..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows="4"
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800 resize-none"
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold shadow transition"
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
          <h1 className="text-2xl font-bold text-slate-900">My Jobs</h1>
          <p className="text-slate-500 text-xs mt-1">Manage listings and view bids.</p>
        </div>
        <Link 
          to="/resident/post-job"
          className="px-4 py-2 rounded-lg bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition shadow"
        >
          Post a New Job
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors ${
              tab === t 
                ? 'border-emerald-800 text-emerald-800' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-2 p-12 text-center text-slate-400 text-xs bg-white border border-slate-200 rounded-2xl shadow-sm">
            No jobs found in this category.
          </div>
        ) : (
          filtered.map(job => (
            <div key={job.id} className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between space-y-4 shadow-sm">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-900 text-base leading-tight">{job.title}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                    job.status === 'open' ? 'bg-emerald-50 text-emerald-800' :
                    job.status === 'in-progress' ? 'bg-blue-50 text-blue-800' :
                    job.status === 'completed' ? 'bg-slate-100 text-slate-500 border border-slate-200' :
                    'bg-red-50 text-red-800'
                  }`}>
                    {job.status}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <span className="text-emerald-800 font-bold">{job.category}</span>
                  <span>•</span>
                  <span>{job.zone}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 font-light">{job.description}</p>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[9px]">Budget</span>
                  <span className="font-bold text-slate-800">{job.budget}</span>
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
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition text-[11px]"
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
    return <div className="text-left text-red-700">Job not found.</div>;
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
      <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-md space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-100 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
              {job.category}
            </span>
            <h1 className="text-xl font-bold text-slate-900 mt-1">{job.title}</h1>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
            job.status === 'open' ? 'bg-emerald-50 text-emerald-800' :
            job.status === 'in-progress' ? 'bg-blue-50 text-blue-800' :
            job.status === 'completed' ? 'bg-slate-100 text-slate-500' :
            'bg-red-50 text-red-800'
          }`}>
            {job.status}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div>
            <span className="text-slate-450 block font-semibold uppercase text-[9px]">Zone Location</span>
            <span className="font-bold text-slate-700">{job.zone}</span>
          </div>
          <div>
            <span className="text-slate-450 block font-semibold uppercase text-[9px]">Budget Range</span>
            <span className="font-bold text-slate-700">{job.budget}</span>
          </div>
          <div>
            <span className="text-slate-450 block font-semibold uppercase text-[9px]">Date Posted</span>
            <span className="font-bold text-slate-700">{new Date(job.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Description</h3>
          <p className="text-slate-600 text-sm leading-relaxed font-light">{job.description}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Exact Location Details</h3>
          <p className="text-slate-650 text-sm font-light">{job.locationDetails}</p>
        </div>

        {job.hiredArtisanId && (
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs text-blue-800 font-bold block uppercase tracking-wider">Hired Artisan</span>
              <span className="text-sm font-bold text-slate-900">{job.hiredArtisanName}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block text-right font-bold uppercase">Agreed Price</span>
              <span className="text-sm font-extrabold text-blue-800">₦{(job.agreedPrice || 0).toLocaleString()}</span>
            </div>
          </div>
        )}

        {job.status === 'open' && (
          <button 
            onClick={handleCancel}
            className="w-full py-2 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-800 text-xs font-bold transition shadow-sm"
          >
            Cancel Job
          </button>
        )}
      </div>

      {/* Bids List */}
      {job.status === 'open' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Artisan Bids ({bids.length})</h2>
          
          <div className="space-y-3">
            {bids.length === 0 ? (
              <p className="text-sm text-slate-400 italic">Waiting for bids from artisans...</p>
            ) : (
              bids.map(bid => (
                <div key={bid.artisanId} className="p-5 bg-white border border-slate-200 rounded-2xl flex flex-col md:flex-row justify-between gap-4 shadow-sm">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-55 flex items-center justify-center font-bold text-emerald-800 border border-emerald-100">
                        {bid.artisanName[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{bid.artisanName}</h4>
                        <div className="flex items-center space-x-1.5 text-xs text-amber-500">
                          <Star className="w-3 h-3 fill-amber-500" />
                          <span className="font-bold">{bid.artisanRating}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 italic font-light">"{bid.description}"</p>
                  </div>

                  <div className="flex md:flex-col justify-between items-end shrink-0">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Proposed Price</span>
                      <span className="text-lg font-extrabold text-emerald-800">₦{Number(bid.price).toLocaleString()}</span>
                    </div>

                    <button 
                      onClick={() => handleHire(bid.artisanId, bid.price)}
                      className="px-4 py-2 rounded-lg bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition shadow"
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
    return <div className="text-left text-red-750 font-bold">Job not found.</div>;
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
    <div className="max-w-md mx-auto text-left bg-white border border-slate-200 p-8 rounded-3xl shadow-md space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-xl font-bold text-slate-900">Rate Your Experience</h1>
        <p className="text-xs text-slate-500">Rate the quality of service for job: <strong className="text-slate-700">{job.title}</strong></p>
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center">
        <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold mb-1">Artisan</span>
        <span className="font-bold text-slate-900 text-base">{job.hiredArtisanName}</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Star Rating picker */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-650 block text-center">How would you rate the work?</label>
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
                    ? 'text-amber-500 fill-amber-500' 
                    : 'text-slate-200 hover:text-slate-350'
                }`} />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600">Your Review</label>
          <textarea 
            placeholder="Great work! Very professional and on time..."
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
            rows="4"
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800 resize-none"
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold shadow transition"
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
          <h1 className="text-xs text-slate-400 font-bold uppercase tracking-wider">Artisan Portal</h1>
          <h2 className="text-2xl font-black text-slate-900 mt-1">Welcome back, {currentUser.fullName}</h2>
        </div>
        <Link 
          to="/artisan/find-jobs"
          className="px-4 py-2 rounded-lg bg-emerald-800 text-white font-bold text-sm hover:bg-emerald-900 transition flex items-center space-x-2"
        >
          <Search className="w-4 h-4" />
          <span>Find Available Jobs</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Pending Bids</span>
          <p className="text-3xl font-black text-slate-900 mt-1">{pendingBidsCount}</p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">In Progress</span>
          <p className="text-3xl font-black text-slate-900 mt-1">{inProgressCount}</p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Completed Jobs</span>
          <p className="text-3xl font-black text-slate-900 mt-1">{completedCount}</p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Avg Rating</span>
          <p className="text-3xl font-black text-slate-900 mt-1 flex items-center space-x-1">
            <span>{artisanProfile.ratingAverage || '0'}</span>
            <Star className="w-6 h-6 text-amber-400 fill-amber-400 inline" />
          </p>
        </div>
      </div>

      {/* Recent Jobs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Your Recent Contracts</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-400 uppercase border-b border-slate-200">
              <tr>
                <th className="pb-3 font-semibold">Job Name</th>
                <th className="pb-3 font-semibold">Resident</th>
                <th className="pb-3 font-semibold">Agreed Price</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-slate-400 text-xs">
                    No active contracts yet.
                  </td>
                </tr>
              ) : (
                jobs.slice(0, 5).map(job => (
                  <tr key={job.id} className="hover:bg-slate-50/50">
                    <td className="py-4 font-bold text-slate-900">{job.title}</td>
                    <td className="py-4">{job.residentName}</td>
                    <td className="py-4 text-emerald-805 font-bold">₦{(job.agreedPrice || 0).toLocaleString()}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${
                        job.status === 'in-progress' ? 'bg-blue-50 text-blue-800' :
                        job.status === 'completed' ? 'bg-slate-100 text-slate-500 border border-slate-200' :
                        'bg-red-50 text-red-800'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <Link 
                        to={`/artisan/job/${job.id}`}
                        className="text-emerald-800 hover:text-emerald-950 text-xs font-extrabold"
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
        <h1 className="text-2xl font-bold text-slate-900">Find Jobs</h1>
        <p className="text-slate-500 text-xs mt-1">Browse active listings posted by residents in Redemption City.</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center shadow-sm">
        <div className="flex-1 w-full relative">
          <Search className="w-4 h-4 text-slate-450 absolute left-3 top-3" />
          <input 
            type="text" 
            placeholder="Search active jobs..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-250 focus:outline-none focus:border-emerald-800 text-sm text-slate-700 placeholder-slate-400"
          />
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <select 
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="flex-1 md:w-48 px-4 py-2 rounded-xl bg-slate-50 border border-slate-255 text-sm text-slate-705 focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Carpentry">Carpentry</option>
            <option value="Painting">Painting</option>
            <option value="Welding">Welding</option>
            <option value="Generator Repair">Generator Repair</option>
            <option value="Laundry Services">Laundry Services</option>
          </select>

          <select 
            value={zoneFilter}
            onChange={e => setZoneFilter(e.target.value)}
            className="flex-1 md:w-36 px-4 py-2 rounded-xl bg-slate-50 border border-slate-255 text-sm text-slate-705 focus:outline-none"
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
          <div className="col-span-2 p-12 text-center text-slate-405 text-xs bg-white border border-slate-200 rounded-2xl shadow-sm">
            No active jobs match these filters.
          </div>
        ) : (
          filtered.map(job => {
            const hasBid = job.bids?.some(b => b.artisanId === currentUser.uid);
            return (
              <div key={job.id} className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between space-y-4 shadow-sm">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-900 text-base leading-tight">{job.title}</h3>
                    {hasBid && (
                      <span className="px-2.5 py-0.5 rounded bg-blue-50 border border-blue-105 text-[10px] font-bold text-blue-800 uppercase tracking-wide">
                        Applied
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-505">
                    <span className="text-emerald-805 font-bold">{job.category}</span>
                    <span>•</span>
                    <span>{job.zone}</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 font-light">{job.description}</p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                  <div>
                    <span className="text-slate-400 block font-semibold uppercase text-[9px]">Resident Budget</span>
                    <span className="font-bold text-slate-700">{job.budget}</span>
                  </div>

                  <Link 
                    to={`/artisan/job/${job.id}`}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-800 text-white font-bold hover:bg-emerald-900 transition shadow"
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
    return <div className="text-left text-red-700 font-bold">Job not found.</div>;
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
      <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-md space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-100 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
              {job.category}
            </span>
            <h1 className="text-xl font-bold text-slate-900 mt-1">{job.title}</h1>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
            job.status === 'open' ? 'bg-emerald-50 text-emerald-800' :
            job.status === 'in-progress' ? 'bg-blue-50 text-blue-800' :
            job.status === 'completed' ? 'bg-slate-100 text-slate-500' :
            'bg-red-50 text-red-800'
          }`}>
            {job.status}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div>
            <span className="text-slate-400 block font-bold uppercase text-[9px]">Resident Customer</span>
            <span className="font-bold text-slate-700">{job.residentName}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-bold uppercase text-[9px]">Budget Offered</span>
            <span className="font-bold text-slate-700">{job.budget}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-bold uppercase text-[9px]">Location Area</span>
            <span className="font-bold text-slate-700">{job.zone}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Job Description</h3>
          <p className="text-slate-600 text-sm leading-relaxed font-light">{job.description}</p>
        </div>

        {/* If hired for this job */}
        {job.hiredArtisanId === currentUser.uid && (
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] text-emerald-800 font-bold block uppercase tracking-wider">Hired agreed price</span>
                <span className="text-base font-extrabold text-slate-900">₦{(job.agreedPrice || 0).toLocaleString()}</span>
              </div>
              <span className="text-xs text-slate-500 font-light">Location: {job.locationDetails}</span>
            </div>

            {job.status === 'in-progress' && (
              <button 
                onClick={handleMarkComplete}
                className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow transition"
              >
                Mark as Completed
              </button>
            )}
          </div>
        )}
      </div>

      {/* Place a Bid form */}
      {job.status === 'open' && (
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-md space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Place a Bid</h2>
          
          {myBid ? (
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 space-y-2 text-xs">
              <p className="text-slate-600">You have already submitted a bid for this job:</p>
              <div className="flex justify-between font-bold text-slate-800">
                <span>Proposed Price:</span>
                <span className="text-emerald-805">₦{Number(myBid.price).toLocaleString()}</span>
              </div>
              <p className="text-slate-500 italic">"{myBid.description}"</p>
            </div>
          ) : (
            <form onSubmit={handlePlaceBid} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Your Bid Amount (₦)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 6500"
                  value={bidPrice}
                  onChange={e => setBidPrice(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Proposal message</label>
                <textarea 
                  placeholder="Tell the resident why they should hire you, your experience, etc..."
                  value={bidDesc}
                  onChange={e => setBidDesc(e.target.value)}
                  rows="3"
                  className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800 resize-none"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold shadow transition"
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
        <h1 className="text-2xl font-bold text-slate-900">Your Contracts</h1>
        <p className="text-slate-500 text-xs mt-1">Manage active agreements and past history.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors ${
              tab === t 
                ? 'border-emerald-800 text-emerald-800' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-2 p-12 text-center text-slate-400 text-xs bg-white border border-slate-200 rounded-2xl shadow-sm">
            No jobs found in this section.
          </div>
        ) : (
          filtered.map(job => (
            <div key={job.id} className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between space-y-4 shadow-sm">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-900 text-base leading-tight">{job.title}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    job.status === 'in-progress' ? 'bg-blue-50 text-blue-800' :
                    'bg-slate-100 text-slate-550 border border-slate-200'
                  }`}>
                    {job.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500">Customer: <strong className="text-slate-700">{job.residentName}</strong></p>
                <p className="text-xs text-slate-500 line-clamp-2 font-light">{job.description}</p>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                <div>
                  <span className="text-slate-400 block font-bold uppercase text-[9px]">Agreed Price</span>
                  <span className="font-bold text-emerald-800">₦{(job.agreedPrice || 0).toLocaleString()}</span>
                </div>

                <Link 
                  to={`/artisan/job/${job.id}`}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition text-[11px]"
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
        <h1 className="text-2xl font-bold text-slate-900">Earnings</h1>
        <p className="text-slate-505 text-xs mt-1">Track payouts and monthly revenue breakdown.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Earnings Card */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl flex flex-col justify-between min-h-[160px] shadow-sm">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Total Earnings</span>
          <p className="text-3xl font-black text-slate-900 mt-1">₦{totalEarnings.toLocaleString()}</p>
          <span className="text-[10px] text-emerald-800 font-bold">⚡ settled to bank account</span>
        </div>

        {/* Visual Custom Chart Bar Mock */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl md:col-span-2 space-y-4 shadow-sm">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-800">Monthly Revenue</span>
            <span className="text-slate-400 font-medium">Last 4 weeks</span>
          </div>

          {/* Simple Custom Bar Graphic */}
          <div className="flex items-end justify-between space-x-4 h-24 pt-4">
            <div className="flex-1 flex flex-col items-center space-y-2">
              <div className="w-full bg-slate-100 rounded-t-lg h-6 border border-slate-200/50"></div>
              <span className="text-[9px] text-slate-400 font-semibold">May 1-7</span>
            </div>
            <div className="flex-1 flex flex-col items-center space-y-2">
              <div className="w-full bg-emerald-100 rounded-t-lg h-12 border border-emerald-200/50 animate-pulse"></div>
              <span className="text-[9px] text-slate-400 font-semibold">May 8-14</span>
            </div>
            <div className="flex-1 flex flex-col items-center space-y-2">
              <div className="w-full bg-emerald-800 rounded-t-lg h-20 shadow-sm"></div>
              <span className="text-[9px] text-slate-400 font-semibold">May 15-21</span>
            </div>
            <div className="flex-1 flex flex-col items-center space-y-2">
              <div className="w-full bg-slate-100 rounded-t-lg h-4 border border-slate-200/50"></div>
              <span className="text-[9px] text-slate-400 font-semibold">May 22-28</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Transactions</h3>
        <div className="divide-y divide-slate-100">
          {completedJobs.length === 0 ? (
            <p className="py-6 text-center text-slate-400 text-xs font-light italic">No payouts settled yet.</p>
          ) : (
            completedJobs.map(job => (
              <div key={job.id} className="py-4 flex justify-between items-center text-sm">
                <div>
                  <h4 className="font-bold text-slate-900">{job.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Paid by {job.residentName} • {new Date(job.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-805 block">+ ₦{(job.agreedPrice || 0).toLocaleString()}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Paid</span>
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
    <div className="max-w-xl mx-auto text-left bg-white border border-slate-200 p-8 rounded-3xl shadow-md space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Edit Profile Info</h1>
        <p className="text-slate-500 text-xs mt-1">Keep your contact and skill information up to date.</p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-650">Full Name</label>
          <input 
            type="text" 
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-655">Phone Number</label>
          <input 
            type="text" 
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-655">Zone Area</label>
            <select 
              value={zone}
              onChange={e => setZone(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800"
            >
              <option value="Zone A">Zone A</option>
              <option value="Zone B">Zone B</option>
              <option value="Zone C">Zone C</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-655">Experience (Years)</label>
            <input 
              type="number" 
              value={experience}
              onChange={e => setExperience(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-655">Professional Bio</label>
          <textarea 
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows="4"
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800 resize-none"
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold shadow transition"
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
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-500 text-xs mt-1">Platform management console for Redemption City.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Pending Verification</span>
          <p className="text-3xl font-black text-amber-600 mt-1">{pendingArtisans.length}</p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Active Artisans</span>
          <p className="text-3xl font-black text-emerald-805 mt-1">{activeArtisans.length}</p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Total Jobs Posted</span>
          <p className="text-3xl font-black text-slate-900 mt-1">{jobs.length}</p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Total Residents</span>
          <p className="text-3xl font-black text-slate-900 mt-1">389</p>
        </div>
      </div>

      {/* Quick pending approval links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">Verification Queue</h3>
            <Link to="/admin/pending" className="text-xs text-emerald-800 font-bold hover:underline">View Queue</Link>
          </div>
          
          <div className="divide-y divide-slate-100">
            {pendingArtisans.length === 0 ? (
              <p className="py-4 text-xs text-slate-400 italic">No applications pending verification.</p>
            ) : (
              pendingArtisans.slice(0, 3).map(art => (
                <div key={art.uid} className="py-3 flex justify-between items-center text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900">{art.fullName}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">{art.category} • {art.zone}</p>
                  </div>
                  <Link 
                    to={`/admin/artisan/${art.uid}`}
                    className="px-2.5 py-1 rounded bg-emerald-800 text-white font-bold text-[10px] hover:bg-emerald-900 shadow-sm"
                  >
                    Verify
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">System Job Logs</h3>
            <Link to="/admin/all-jobs" className="text-xs text-emerald-800 font-bold hover:underline">All Jobs</Link>
          </div>
          
          <div className="divide-y divide-slate-100">
            {jobs.slice(0, 3).map(job => (
              <div key={job.id} className="py-3 flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">{job.title}</h4>
                  <p className="text-[10px] text-slate-550 mt-0.5">By {job.residentName} • Status: {job.status}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                  job.status === 'open' ? 'bg-emerald-50 text-emerald-800' :
                  job.status === 'in-progress' ? 'bg-blue-50 text-blue-800' :
                  'bg-slate-100 text-slate-500'
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
        <h1 className="text-2xl font-bold text-slate-900">Pending Registrations</h1>
        <p className="text-slate-500 text-xs mt-1">Review credentials and approve new trade contractors.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="divide-y divide-slate-100">
          {artisans.length === 0 ? (
            <p className="py-6 text-center text-slate-400 text-xs italic">No pending applications found.</p>
          ) : (
            artisans.map(art => (
              <div key={art.uid} className="py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-base">{art.fullName}</h3>
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <span className="text-emerald-805 font-bold">{art.category}</span>
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
                    className="flex-1 md:flex-none px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition text-center"
                  >
                    View Details
                  </Link>
                  <button 
                    onClick={() => handleApprove(art.uid)}
                    className="flex-1 md:flex-none px-3.5 py-1.5 rounded-lg bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition shadow-sm"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleReject(art.uid)}
                    className="flex-1 md:flex-none px-3.5 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-805 text-xs font-bold hover:bg-red-100 transition"
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
    return <div className="text-left text-red-700">Artisan application data not found.</div>;
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
    <div className="space-y-6 text-left max-w-2xl mx-auto bg-white border border-slate-200 p-8 rounded-3xl shadow-md">
      <div className="pb-6 border-b border-slate-100">
        <h1 className="text-xl font-bold text-slate-900">Review Registration</h1>
        <p className="text-xs text-slate-500 mt-1">Pending verification details for {art.fullName}.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div>
          <span className="text-slate-400 block font-bold uppercase text-[9px]">Experience</span>
          <span className="font-bold text-slate-700">{art.experienceYears} Years</span>
        </div>
        <div>
          <span className="text-slate-400 block font-bold uppercase text-[9px]">Service Category</span>
          <span className="font-bold text-slate-700">{art.category}</span>
        </div>
        <div>
          <span className="text-slate-400 block font-bold uppercase text-[9px]">Zone Area</span>
          <span className="font-bold text-slate-700">{art.zone}</span>
        </div>
        <div>
          <span className="text-slate-400 block font-bold uppercase text-[9px]">Contact Info</span>
          <span className="font-bold text-slate-700">{art.phone || 'No phone'}</span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Professional Bio</h3>
        <p className="text-slate-600 text-sm leading-relaxed font-light">{art.bio}</p>
      </div>

      {/* Simulated Document Uploads */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Uploaded Certificates / IDs</h3>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center space-x-3 text-xs text-slate-600">
          <UploadCloud className="w-5 h-5 text-emerald-805" />
          <div>
            <p className="font-bold text-slate-800">national_id_card.pdf</p>
            <p className="text-[10px] text-slate-500">Government-issued Identity Document verified</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button 
          onClick={handleApprove}
          className="flex-1 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold shadow transition"
        >
          Approve & Verify
        </button>
        <button 
          onClick={handleReject}
          className="flex-1 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-800 font-bold hover:bg-red-100 transition"
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
        <h1 className="text-2xl font-bold text-slate-900">All Artisans</h1>
        <p className="text-slate-500 text-xs mt-1">Overview of registered trade professionals in the database.</p>
      </div>

      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center shadow-sm">
        <div className="flex-1 w-full relative">
          <Search className="w-4 h-4 text-slate-450 absolute left-3 top-3" />
          <input 
            type="text" 
            placeholder="Search artisans by name..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-250 focus:outline-none focus:border-emerald-800 text-sm text-slate-705 placeholder-slate-400"
          />
        </div>

        <select 
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="w-full md:w-48 px-4 py-2 rounded-xl bg-slate-50 border border-slate-250 text-sm text-slate-705 focus:outline-none"
        >
          <option value="All">All Categories</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
          <option value="Carpentry">Carpentry</option>
          <option value="Painting">Painting</option>
          <option value="Welding">Welding</option>
        </select>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-400 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Zone</th>
                <th className="p-4 font-semibold">Rating</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 text-right font-semibold">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(art => (
                <tr key={art.uid} className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900">{art.fullName}</td>
                  <td className="p-4">{art.category}</td>
                  <td className="p-4">{art.zone}</td>
                  <td className="p-4">
                    <span className="flex items-center text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-500 mr-1" />
                      {art.ratingAverage || '0'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      art.status === 'approved' ? 'bg-emerald-50 text-emerald-800' :
                      art.status === 'pending' ? 'bg-amber-50 text-amber-800' :
                      'bg-red-50 text-red-800'
                    }`}>
                      {art.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link 
                      to={`/admin/artisan/${art.uid}`}
                      className="text-emerald-805 hover:text-emerald-950 text-xs font-bold"
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
        <h1 className="text-2xl font-bold text-slate-900">All Jobs</h1>
        <p className="text-slate-500 text-xs mt-1">Audit active service listings, contract prices, and bids.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-400 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 font-semibold">Job Title</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Resident</th>
                <th className="p-4 font-semibold">Hired Artisan</th>
                <th className="p-4 font-semibold">Budget / Price</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jobs.map(job => (
                <tr key={job.id} className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900">{job.title}</td>
                  <td className="p-4">{job.category}</td>
                  <td className="p-4">{job.residentName}</td>
                  <td className="p-4">{job.hiredArtisanName || <span className="text-slate-400 font-light italic">None</span>}</td>
                  <td className="p-4 font-bold text-slate-800">
                    {job.agreedPrice ? `₦${job.agreedPrice.toLocaleString()}` : job.budget}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      job.status === 'open' ? 'bg-emerald-50 text-emerald-800' :
                      job.status === 'in-progress' ? 'bg-blue-50 text-blue-800' :
                      job.status === 'completed' ? 'bg-slate-100 text-slate-500' :
                      'bg-red-50 text-red-800'
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
        <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>
        <p className="text-slate-505 text-xs mt-1">Platform operational and revenue charts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Platform Volume</span>
          <p className="text-3xl font-black text-slate-900 mt-1">{jobs.length} Jobs</p>
          <span className="text-[10px] text-slate-450">Total posts</span>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Completed</span>
          <p className="text-3xl font-black text-emerald-805 mt-1">{completed.length} Jobs</p>
          <span className="text-[10px] text-slate-450">Success: {Math.round((completed.length / (jobs.length || 1)) * 100)}%</span>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Gross Settlement</span>
          <p className="text-3xl font-black text-emerald-805 mt-1">₦{revenue.toLocaleString()}</p>
          <span className="text-[10px] text-slate-450">Total payouts processed</span>
        </div>
      </div>

      {/* Graphical Overview representation */}
      <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-6 shadow-sm">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Weekly Activity Overview</h3>
          <p className="text-xs text-slate-500">Active jobs volume weekly metrics</p>
        </div>

        {/* CSS Graph Line Mock */}
        <div className="relative h-48 border border-slate-200 rounded-2xl bg-slate-50 p-6 flex flex-col justify-between">
          <div className="flex items-end justify-between h-36">
            <div className="h-10 w-2.5 bg-emerald-100 rounded-full flex flex-col justify-end">
              <div className="h-6 w-full bg-emerald-800 rounded-full shadow-sm"></div>
            </div>
            <div className="h-20 w-2.5 bg-emerald-100 rounded-full flex flex-col justify-end">
              <div className="h-14 w-full bg-emerald-800 rounded-full shadow-sm"></div>
            </div>
            <div className="h-32 w-2.5 bg-emerald-100 rounded-full flex flex-col justify-end">
              <div className="h-24 w-full bg-emerald-800 rounded-full shadow-sm"></div>
            </div>
            <div className="h-16 w-2.5 bg-emerald-100 rounded-full flex flex-col justify-end">
              <div className="h-8 w-full bg-emerald-800 rounded-full shadow-sm"></div>
            </div>
          </div>
          <div className="flex justify-between text-[9px] text-slate-450 font-bold uppercase tracking-wide">
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
    <div className="space-y-6 text-left max-w-xl mx-auto bg-white border border-slate-200 p-8 rounded-3xl shadow-md">
      <div>
        <h1 className="text-xl font-bold text-slate-900">General Settings</h1>
        <p className="text-slate-500 text-xs mt-1">Configure categories, zones, and verification thresholds.</p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
          <h3 className="text-sm font-bold text-slate-800">Manage Service Zones</h3>
          <p className="text-xs text-slate-500">Edit active service zones inside Redemption City.</p>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="px-2.5 py-1 rounded bg-white text-xs text-slate-700 border border-slate-200 font-semibold shadow-sm">Zone A (Active)</span>
            <span className="px-2.5 py-1 rounded bg-white text-xs text-slate-700 border border-slate-200 font-semibold shadow-sm">Zone B (Active)</span>
            <span className="px-2.5 py-1 rounded bg-white text-xs text-slate-700 border border-slate-200 font-semibold shadow-sm">Zone C (Active)</span>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
          <h3 className="text-sm font-bold text-slate-800">Verification Rules</h3>
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-slate-500">Verify government identity documents</span>
            <span className="text-emerald-800 font-bold">Always Required</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Verify trade license certifications</span>
            <span className="text-emerald-800 font-bold">Required</span>
          </div>
        </div>

        <button 
          onClick={() => alert('Settings saved!')}
          className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold shadow transition"
        >
          Save Platform Changes
        </button>
      </div>
    </div>
  );
}

// 26. Messages Page
function MessagesPage() {
  const [activeChat, setActiveChat] = useState(0);
  const chats = [
    { name: 'John Plumbing Expert', avatar: 'JP', lastMsg: 'I can come over by 4 PM to check the leak.', date: 'Today, 11:30 AM', unread: true },
    { name: 'Emeka Electricals', avatar: 'EE', lastMsg: 'The ceiling fan installation is complete. Thanks!', date: 'Yesterday', unread: false },
    { name: 'WoodMaster Carpentry', avatar: 'WC', lastMsg: 'Sure, I will send a quote for the wardrobe repair.', date: 'May 25', unread: false }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm h-[calc(100vh-160px)] flex text-left">
      {/* Inbox Sidebar */}
      <div className="w-85 border-r border-slate-200 flex flex-col h-full bg-slate-50/50">
        <div className="p-4 border-b border-slate-200 bg-white">
          <h2 className="text-base font-bold text-slate-900">Messages</h2>
          <p className="text-[10px] text-slate-500 mt-0.5">Chat with your hired artisans</p>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {chats.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveChat(i)}
              className={`w-full p-4 text-left flex items-start space-x-3 transition hover:bg-slate-100/50 ${activeChat === i ? 'bg-emerald-50/40' : ''}`}
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
                {c.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-xs font-bold text-slate-800 truncate">{c.name}</h4>
                  <span className="text-[10px] text-slate-400 font-medium shrink-0">{c.date}</span>
                </div>
                <p className={`text-xs truncate ${c.unread ? 'text-slate-900 font-semibold' : 'text-slate-500'}`}>{c.lastMsg}</p>
              </div>
              {c.unread && <span className="w-2 h-2 rounded-full bg-emerald-650 shrink-0 self-center"></span>}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Thread */}
      <div className="flex-1 flex flex-col h-full bg-white">
        <div className="p-4 border-b border-slate-200 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-sm">
            {chats[activeChat].avatar}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 leading-tight">{chats[activeChat].name}</h3>
            <p className="text-[10px] text-emerald-700 font-medium">Online</p>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/30">
          <div className="flex justify-center">
            <span className="bg-slate-100 text-slate-500 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">Today</span>
          </div>

          <div className="flex items-start space-x-2.5 max-w-lg">
            <div className="w-8 h-8 rounded-full bg-emerald-850 text-white flex items-center justify-center font-bold text-xs shrink-0">
              {chats[activeChat].avatar}
            </div>
            <div className="bg-white border border-slate-200 text-slate-800 p-3.5 rounded-2xl rounded-tl-none shadow-sm text-xs leading-relaxed">
              Hello! Regarding your kitchen tap leak job, I have the replacement seals ready.
            </div>
          </div>

          <div className="flex items-start space-x-2.5 justify-end max-w-lg ml-auto">
            <div className="bg-emerald-800 text-white p-3.5 rounded-2xl rounded-tr-none shadow-sm text-xs leading-relaxed">
              That's great! When can you come by to fix it?
            </div>
          </div>

          <div className="flex items-start space-x-2.5 max-w-lg">
            <div className="w-8 h-8 rounded-full bg-emerald-850 text-white flex items-center justify-center font-bold text-xs shrink-0">
              {chats[activeChat].avatar}
            </div>
            <div className="bg-white border border-slate-200 text-slate-800 p-3.5 rounded-2xl rounded-tl-none shadow-sm text-xs leading-relaxed">
              {chats[activeChat].lastMsg}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 bg-white">
          <form onSubmit={e => e.preventDefault()} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Write a message..."
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-xs text-slate-700"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white transition shadow-sm"
            >
              <span className="material-icons-round text-sm block">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// 27. Resident Reviews Page
function ResidentReviewsPage() {
  const { currentUser, ratings } = useAuth();
  const myReviews = ratings.filter(r => r.residentId === currentUser.uid);

  return (
    <div className="space-y-6 text-left max-w-2xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">My Reviews</h1>
        <p className="text-slate-500 text-xs mt-1">Feedback and ratings you have given to service providers.</p>
      </div>

      {myReviews.length === 0 ? (
        <div className="text-center p-12 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-3">
          <span className="material-icons-round text-4xl text-slate-350 block">rate_review</span>
          <p className="text-sm text-slate-500 font-light">You haven't left any reviews yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {myReviews.map((rev) => (
            <div key={rev.id} className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-950 text-sm">{rev.artisanName}</h3>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Hired Expert</p>
                </div>
                <div className="flex items-center space-x-1 bg-amber-50 border border-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-xs font-black">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0" />
                  <span>{rev.rating}</span>
                </div>
              </div>
              <p className="text-slate-650 text-xs md:text-sm leading-relaxed font-light">{rev.comment || rev.reviewText}</p>
              <div className="text-[10px] text-slate-400 font-medium pt-1">
                Reviewed on {new Date(rev.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 28. Resident Profile Page
function ResidentProfilePage() {
  const { currentUser, updateResidentProfile } = useAuth();
  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [zone, setZone] = useState(currentUser?.zone || 'Zone A');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setLoading(true);
    try {
      await updateResidentProfile(currentUser.uid, { fullName, phone, zone });
      setSuccess(true);
    } catch (err) {
      alert(err.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto text-left bg-white border border-slate-200 p-8 rounded-3xl shadow-md">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Profile Settings</h1>
        <p className="text-slate-500 text-xs mt-1">Manage your account details and contact information.</p>
      </div>

      {success && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs rounded-xl flex items-center space-x-2">
          <span className="material-icons-round text-sm">check_circle</span>
          <span>Profile updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600">Full Name</label>
          <input 
            type="text" 
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600">Email Address</label>
          <input 
            type="email" 
            value={currentUser?.email || ''}
            className="w-full px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-sm text-slate-500 focus:outline-none"
            disabled
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">Phone Number</label>
            <input 
              type="tel" 
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">Zone Location</label>
            <select 
              value={zone}
              onChange={e => setZone(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-800 text-sm text-slate-800"
            >
              <option value="Zone A">Zone A</option>
              <option value="Zone B">Zone B</option>
              <option value="Zone C">Zone C</option>
            </select>
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold shadow transition disabled:opacity-50 mt-2"
        >
          {loading ? 'Saving...' : 'Save Profile Changes'}
        </button>
      </form>
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
            <Route path="/resident/messages" element={<MessagesPage />} />
            <Route path="/resident/reviews" element={<ResidentReviewsPage />} />
            <Route path="/resident/profile" element={<ResidentProfilePage />} />
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
          <Route path="*" element={<Link to="/" className="text-center p-12 text-sm text-emerald-800 block hover:underline">Page not found. Return to Home</Link>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
