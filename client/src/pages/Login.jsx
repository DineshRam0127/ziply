import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await API.post("/auth/login", formData);
      localStorage.setItem("token", response.data.token);
      toast.success("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        * { box-sizing: border-box; }

        .login-root {
          font-family: 'DM Sans', sans-serif;
          height: 100vh;
          background: linear-gradient(135deg, #0a0015 0%, #1a0f3f 30%, #3d1a6d 60%, #5c3d8f 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          position: relative;
          overflow: hidden;
        }

        /* Ambient background orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          animation: drift 12s ease-in-out infinite alternate;
        }
        .orb-1 {
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%);
          top: -160px; left: -160px;
          animation-delay: 0s;
        }
        .orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%);
          bottom: -100px; right: -80px;
          animation-delay: -4s;
        }
        .orb-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -8s;
        }

        @keyframes drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(30px, 20px) scale(1.06); }
        }

        /* Grid texture */
        .grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        /* Card */
        .card {
          position: relative;
          width: 100%;
          max-width: 440px;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 48px 44px 44px;
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04),
            0 40px 80px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.08);
          animation: cardIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Top badge */
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.25);
          border-radius: 100px;
          padding: 5px 14px 5px 10px;
          margin-bottom: 28px;
          animation: cardIn 0.6s 0.1s cubic-bezier(0.22,1,0.36,1) both;
        }
        .badge-dot {
          width: 7px; height: 7px;
          background: #818cf8;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .badge-text {
          font-size: 12px;
          font-weight: 500;
          color: #818cf8;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        /* Heading */
        .heading {
          font-family: 'Syne', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.15;
          margin: 0 0 6px;
          animation: cardIn 0.6s 0.15s cubic-bezier(0.22,1,0.36,1) both;
        }
        .heading-sub {
          font-size: 14.5px;
          color: rgba(255,255,255,0.38);
          margin: 0 0 36px;
          font-weight: 300;
          animation: cardIn 0.6s 0.2s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* Input wrapper */
        .field-wrap {
          position: relative;
          margin-bottom: 16px;
          animation: cardIn 0.6s 0.25s cubic-bezier(0.22,1,0.36,1) both;
        }
        .field-wrap:last-of-type {
          animation-delay: 0.3s;
        }

        .field-label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 8px;
        }

        .field-input-wrap {
          position: relative;
        }

        .field-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.25);
          pointer-events: none;
          transition: color 0.2s;
        }

        .field-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 14px 16px 14px 44px;
          color: #ffffff;
          font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .field-input::placeholder {
          color: rgba(255,255,255,0.2);
        }
        .field-input:focus {
          background: rgba(99,102,241,0.07);
          border-color: rgba(99,102,241,0.5);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12), 0 0 20px rgba(99,102,241,0.08);
        }
        .field-input:focus + .field-icon-post,
        .field-wrap:focus-within .field-icon {
          color: #818cf8;
        }

        /* Focus line */
        .focus-line {
          position: absolute;
          bottom: -1px; left: 12px; right: 12px;
          height: 2px;
          background: linear-gradient(90deg, #6366f1, #a78bfa);
          border-radius: 2px;
          transform: scaleX(0);
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
          transform-origin: center;
        }
        .field-input:focus ~ .focus-line {
          transform: scaleX(1);
        }

        /* Button */
        .btn-wrap {
          margin-top: 28px;
          animation: cardIn 0.6s 0.35s cubic-bezier(0.22,1,0.36,1) both;
        }

        .btn-login {
          width: 100%;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: #ffffff;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.02em;
          border: none;
          border-radius: 12px;
          padding: 15px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.18s cubic-bezier(0.22,1,0.36,1), box-shadow 0.18s;
          box-shadow: 0 4px 24px rgba(99,102,241,0.35), 0 1px 0 rgba(255,255,255,0.12) inset;
        }
        .btn-login::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .btn-login:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(99,102,241,0.5), 0 1px 0 rgba(255,255,255,0.12) inset;
        }
        .btn-login:hover:not(:disabled)::before {
          opacity: 1;
        }
        .btn-login:active:not(:disabled) {
          transform: translateY(0px);
          box-shadow: 0 2px 12px rgba(99,102,241,0.35);
        }
        .btn-login:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Spinner */
        .spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.75s linear infinite;
          display: inline-block;
          margin-right: 8px;
          vertical-align: middle;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Divider */
        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 28px 0 0;
          animation: cardIn 0.6s 0.4s cubic-bezier(0.22,1,0.36,1) both;
        }
        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.07);
        }
        .divider-text {
          font-size: 12px;
          color: rgba(255,255,255,0.22);
        }

        /* Footer */
        .footer-text {
          text-align: center;
          margin-top: 20px;
          font-size: 14px;
          color: rgba(255,255,255,0.3);
          animation: cardIn 0.6s 0.45s cubic-bezier(0.22,1,0.36,1) both;
        }
        .footer-link {
          color: #818cf8;
          cursor: pointer;
          font-weight: 500;
          text-decoration: none;
          position: relative;
          transition: color 0.2s;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0; right: 0;
          height: 1px;
          background: #818cf8;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1);
        }
        .footer-link:hover { color: #a5b4fc; }
        .footer-link:hover::after { transform: scaleX(1); }

        /* Responsive */
        @media (max-width: 480px) {
          .card { padding: 36px 24px 32px; border-radius: 20px; }
          .heading { font-size: 26px; }
        }
      `}</style>

      <div className="login-root">
        {/* Background layers */}
        <div className="grid-bg" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        {/* Card */}
        <div className="card">

          {/* Badge */}
          <div className="badge">
            <span className="badge-dot" />
            <span className="badge-text">ZipLy</span>
          </div>

          {/* Heading */}
          <h1 className="heading">Welcome back</h1>
          <p className="heading-sub">Sign in to your analytics dashboard</p>

          {/* Email */}
          <div className="field-wrap">
            <label className="field-label">Email</label>
            <div className="field-input-wrap">
              <svg className="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="field-input"
                onChange={handleChange}
              />
              <div className="focus-line" />
            </div>
          </div>

          {/* Password */}
          <div className="field-wrap">
            <label className="field-label">Password</label>
            <div className="field-input-wrap">
              <svg className="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="field-input"
                onChange={handleChange}
              />
              <div className="focus-line" />
            </div>
          </div>

          {/* Login Button */}
          <div className="btn-wrap">
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="btn-login"
            >
              {isLoading && <span className="spinner" />}
              {isLoading ? "Signing in…" : "Sign In"}
            </button>
          </div>

          {/* Divider */}
          <div className="divider">
            <span className="divider-line" />
            <span className="divider-text">New to ZipLy?</span>
            <span className="divider-line" />
          </div>

          {/* Signup link */}
          <p className="footer-text">
            <span
              onClick={() => navigate("/signup")}
              className="footer-link"
            >
              Create an account →
            </span>
          </p>

        </div>
      </div>
    </>
  );
}

export default Login;