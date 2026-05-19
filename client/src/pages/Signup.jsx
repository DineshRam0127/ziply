import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", formData);
      toast.success("Signup Successful");
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .ziply-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #020817;
          position: relative;
          overflow: hidden;
          padding: 1rem;
        }

        /* Animated mesh background */
        .ziply-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(6, 182, 212, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 80% 90%, rgba(99, 102, 241, 0.10) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 50% 50%, rgba(6, 182, 212, 0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Grid overlay */
        .ziply-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(6, 182, 212, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        /* Floating orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          animation: drift 8s ease-in-out infinite alternate;
        }
        .orb-1 {
          width: 320px; height: 320px;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.15), transparent 70%);
          top: -80px; left: -80px;
          animation-delay: 0s;
        }
        .orb-2 {
          width: 280px; height: 280px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.12), transparent 70%);
          bottom: -60px; right: -60px;
          animation-delay: -4s;
        }
        @keyframes drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(30px, 20px) scale(1.08); }
        }

        /* Card */
        .signup-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 420px;
          background: rgba(255, 255, 255, 0.030);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(6, 182, 212, 0.18);
          border-radius: 24px;
          padding: 44px 40px 40px;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04) inset,
            0 32px 80px rgba(0, 0, 0, 0.5),
            0 0 60px rgba(6, 182, 212, 0.06);
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Top accent line */
        .signup-card::before {
          content: '';
          position: absolute;
          top: 0; left: 20%; right: 20%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.7), transparent);
          border-radius: 50%;
        }

        /* Logo area */
        .logo-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          margin-bottom: 32px;
        }
        .logo-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(6, 182, 212, 0.10);
          border: 1px solid rgba(6, 182, 212, 0.25);
          border-radius: 12px;
          padding: 6px 14px;
          margin-bottom: 4px;
        }
        .logo-dot {
          width: 8px; height: 8px;
          background: #06b6d4;
          border-radius: 50%;
          box-shadow: 0 0 8px #06b6d4;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px #06b6d4; }
          50%       { opacity: 0.6; box-shadow: 0 0 16px #06b6d4; }
        }
        .logo-text {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 800;
          color: #e2e8f0;
          letter-spacing: 0.04em;
        }
        .logo-text span { color: #06b6d4; }
        .tagline {
          font-size: 11px;
          font-weight: 400;
          color: rgba(148, 163, 184, 0.7);
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        /* Heading */
        .signup-heading {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 700;
          color: #f1f5f9;
          text-align: center;
          margin-bottom: 6px;
          letter-spacing: -0.02em;
        }
        .signup-sub {
          text-align: center;
          font-size: 13.5px;
          color: rgba(148, 163, 184, 0.65);
          margin-bottom: 28px;
        }

        /* Input group */
        .input-group {
          position: relative;
          margin-bottom: 16px;
        }
        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(100, 116, 139, 0.8);
          pointer-events: none;
          transition: color 0.2s;
          display: flex;
          align-items: center;
        }
        .ziply-input {
          width: 100%;
          box-sizing: border-box;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(100, 116, 139, 0.25);
          border-radius: 12px;
          padding: 13px 14px 13px 42px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #e2e8f0;
          outline: none;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
          -webkit-appearance: none;
        }
        .ziply-input::placeholder {
          color: rgba(100, 116, 139, 0.55);
        }
        .ziply-input:focus {
          border-color: rgba(6, 182, 212, 0.55);
          background: rgba(6, 182, 212, 0.05);
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.10), 0 2px 12px rgba(0,0,0,0.2);
        }
        .ziply-input:focus + .input-label-icon,
        .input-group:focus-within .input-icon {
          color: #06b6d4;
        }

        /* Signup button */
        .signup-btn {
          width: 100%;
          padding: 13px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #6366f1 100%);
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.04em;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.18s, box-shadow 0.18s;
          box-shadow: 0 4px 20px rgba(6, 182, 212, 0.28), 0 1px 4px rgba(0,0,0,0.3);
          margin-top: 8px;
        }
        .signup-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .signup-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(6, 182, 212, 0.38), 0 2px 8px rgba(0,0,0,0.3);
        }
        .signup-btn:hover::before { opacity: 1; }
        .signup-btn:active { transform: translateY(0px); }

        /* Divider */
        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0 16px;
        }
        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(100, 116, 139, 0.18);
        }
        .divider-text {
          font-size: 11px;
          color: rgba(100, 116, 139, 0.5);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        /* Login link */
        .login-prompt {
          text-align: center;
          font-size: 13.5px;
          color: rgba(148, 163, 184, 0.6);
        }
        .login-link {
          color: #06b6d4;
          cursor: pointer;
          font-weight: 500;
          position: relative;
          transition: color 0.2s;
          text-decoration: none;
        }
        .login-link::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0; right: 0;
          height: 1px;
          background: #06b6d4;
          transform: scaleX(0);
          transition: transform 0.22s;
          transform-origin: left;
        }
        .login-link:hover { color: #67e8f9; }
        .login-link:hover::after { transform: scaleX(1); }

        @media (max-width: 480px) {
          .signup-card { padding: 36px 24px 32px; border-radius: 20px; }
          .signup-heading { font-size: 22px; }
        }
      `}</style>

      <div className="ziply-root">
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        <div className="signup-card">
          {/* Logo */}
          <div className="logo-wrap">
            <div className="logo-badge">
              <div className="logo-dot" />
              <span className="logo-text">Zip<span>ly</span></span>
            </div>
            <span className="tagline">Shorten • Track • Analyze</span>
          </div>

          {/* Heading */}
          <h1 className="signup-heading">Create your account</h1>
          <p className="signup-sub">Start shortening links in seconds</p>

          {/* Name */}
          <div className="input-group">
            <span className="input-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </span>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="ziply-input"
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <span className="input-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </span>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="ziply-input"
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <span className="input-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="ziply-input"
              onChange={handleChange}
            />
          </div>

          {/* Submit */}
          <button onClick={handleSignup} className="signup-btn">
            Create Account →
          </button>

          {/* Divider + Login */}
          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">already a member?</span>
            <div className="divider-line" />
          </div>

          <p className="login-prompt">
            <span
              onClick={() => navigate("/")}
              className="login-link"
            >
              Sign in to your account
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;