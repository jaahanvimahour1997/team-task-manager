import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);
      login(res.data.user, res.data.token);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl shadow-slate-200 overflow-hidden">
        
        {/* LEFT: Branding/Info */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -ml-32 -mb-32" />
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20">
              <span className="text-2xl font-bold">T</span>
            </div>
            
            <h1 className="text-4xl font-bold mb-6 tracking-tight">
              Master Your Team's <br />
              <span className="text-blue-400">Workflow.</span>
            </h1>

            <div className="space-y-6">
              {[
                "Real-time task tracking",
                "Role-based access control",
                "Project analytics dashboard",
                "Team collaboration tools"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-300 text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Login Form */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500">Sign in to access your workspace</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <input
                required
                type="email"
                name="email"
                placeholder="name@company.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900"
                onChange={handleChange}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-xs font-medium text-blue-600 hover:underline">Forgot password?</a>
              </div>
              <input
                required
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900"
                onChange={handleChange}
              />
            </div>

            <button 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 font-medium">
            New to TaskFlow?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline font-bold">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}