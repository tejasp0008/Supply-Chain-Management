import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Eye, EyeOff, AlertCircle } from "lucide-react";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState<{ username: boolean; password: boolean }>({ username: false, password: false });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const hasError = (field: string) =>
    touched[field as keyof typeof touched] && !(field === "username" ? username : password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ username: true, password: true });
    if (!username || !password) return;
    setLoading(true);
    setTimeout(() => {
      if (remember) {
        localStorage.setItem("isAuthenticated", "true");
      } else {
        sessionStorage.setItem("isAuthenticated", "true");
      }
      setLoading(false);
      navigate("/", { replace: true });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e3eefd] to-[#f3f4f6] flex flex-col">
      {/* Header */}
      <header className="bg-[#0064e1] text-white shadow">
        <div className="flex items-center px-8 py-3 space-x-4">
          <span className="flex items-center text-3xl font-bold">
            <ShoppingCart className="h-8 w-8 mr-2" />
            <span className="hidden sm:inline">Mart Supply Pulse</span>
          </span>
        </div>
      </header>
      {/* Centered Login Card */}
      <div className="flex-1 flex items-center justify-center">
        <form
          className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col gap-6 animate-fade-in"
          onSubmit={handleSubmit}
          aria-label="Associate Login Form"
        >
          <h2 className="text-2xl font-bold text-[#003087] mb-2 text-center">Associate Sign In</h2>
          <div>
            <label htmlFor="username" className="sr-only">Associate ID or Email</label>
            <input
              id="username"
              type="text"
              className={`w-full rounded-full px-4 py-3 border text-base focus:outline-none transition
                ${hasError("username") ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-blue-200 focus:ring-2 focus:ring-blue-100"}
              `}
              placeholder="Enter your associate ID or email"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, username: true }))}
              aria-label="Associate ID or email"
              autoFocus
              autoComplete="username"
            />
            {hasError("username") && (
              <div className="flex items-center gap-1 text-red-600 text-xs mt-1" role="alert">
                <AlertCircle className="w-4 h-4" aria-hidden="true" />
                <span>This field is required.</span>
              </div>
            )}
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={`w-full rounded-full px-4 py-3 border text-base focus:outline-none transition pr-12
                  ${hasError("password") ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-blue-200 focus:ring-2 focus:ring-blue-100"}
                `}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onBlur={() => setTouched(t => ({ ...t, password: true }))}
                aria-label="Password"
                autoComplete="current-password"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-700 hover:text-blue-900"
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {hasError("password") && (
              <div className="flex items-center gap-1 text-red-600 text-xs mt-1" role="alert">
                <AlertCircle className="w-4 h-4" aria-hidden="true" />
                <span>This field is required.</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-blue-900 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="accent-blue-600"
              />
              Remember Me
            </label>
            <a href="#" className="text-blue-700 hover:underline text-sm">Forgot Password?</a>
          </div>
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-300 text-[#0064e1] font-semibold rounded-full px-6 py-2 transition-shadow flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-200"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2 text-[#0064e1]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#0064e1" strokeWidth="4"></circle>
                <path className="opacity-75" fill="#0064e1" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            ) : null}
            Sign In
          </button>
        </form>
      </div>
      <style>
        {`
          .animate-fade-in {
            animation: fadeInUp 0.7s cubic-bezier(.23,1.01,.32,1) both;
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translate3d(0, 40px, 0);
            }
            to {
              opacity: 1;
              transform: none;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Login;
