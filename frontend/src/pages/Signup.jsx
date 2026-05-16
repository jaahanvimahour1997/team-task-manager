import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../api/api";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
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
      await API.post("/auth/signup", form);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl shadow-slate-200 overflow-hidden">
        
        {/* LEFT: Branding/Info */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-indigo-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-32 -mb-32" />
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-8 shadow-lg shadow-indigo-500/20">
              <span className="text-2xl font-bold">T</span>
            </div>
            
            <h1 className="text-4xl font-bold mb-6 tracking-tight">
              Join the future of <br />
              <span className="text-indigo-400">Collaboration.</span>
            </h1>

            <p className="text-indigo-100/70 mb-8 max-w-sm leading-relaxed">
              Create an account and start managing your team's tasks with precision and style.
            </p>

            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
                <p className="text-sm font-medium italic text-indigo-200">
                  "This platform transformed how our team handles complex projects."
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-400" />
                  <span className="text-xs font-bold text-white">Sarah Jenkins, Product Lead</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Signup Form */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Create Account</h2>
            <p className="text-slate-500">Get started for free today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
              <input
                required
                type="text"
                name="name"
                placeholder="John Doe"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <input
                required
                type="email"
                name="email"
                placeholder="name@company.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input
                required
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Account Role</label>
              <select
                name="role"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900 font-medium appearance-none"
                onChange={handleChange}
                value={form.role}
              >
                <option value="member">Team Member</option>
                <option value="admin">Project Admin</option>
              </select>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/25 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 font-medium">
            Already have an account?{" "}
            <Link to="/" className="text-indigo-600 hover:underline font-bold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}