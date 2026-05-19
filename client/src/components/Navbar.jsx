import { useNavigate } from "react-router-dom";

function Navbar({ darkMode, setDarkMode }) {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');

        @keyframes nav-shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        @keyframes logo-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.7; }
        }

        .ziply-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          background: linear-gradient(
            120deg,
            #e2e8f0 0%,
            #bfdbfe 30%,
            #ffffff 50%,
            #bfdbfe 70%,
            #e2e8f0 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: nav-shimmer 4s linear infinite;
          letter-spacing: -0.03em;
        }

        .ziply-logo .accent-dot {
          -webkit-text-fill-color: #60a5fa;
          background: none;
          background-clip: unset;
          -webkit-background-clip: unset;
          animation: logo-pulse 2.5s ease-in-out infinite;
          display: inline-block;
        }

        .nav-btn-mode {
          background: rgba(148, 163, 184, 0.10);
          border: 1px solid rgba(148, 163, 184, 0.20);
          color: #cbd5e1;
          transition: all 0.22s ease;
        }

        .nav-btn-mode:hover {
          background: rgba(148, 163, 184, 0.18);
          border-color: rgba(148, 163, 184, 0.35);
          color: #f1f5f9;
          box-shadow: 0 0 14px rgba(96, 165, 250, 0.15);
          transform: translateY(-1px);
        }

        .nav-btn-logout {
          background: rgba(239, 68, 68, 0.10);
          border: 1px solid rgba(239, 68, 68, 0.22);
          color: #fca5a5;
          transition: all 0.22s ease;
        }

        .nav-btn-logout:hover {
          background: rgba(239, 68, 68, 0.22);
          border-color: rgba(239, 68, 68, 0.45);
          color: #fecaca;
          box-shadow: 0 0 16px rgba(239, 68, 68, 0.18);
          transform: translateY(-1px);
        }

        .nav-root {
          background: linear-gradient(
            135deg,
            #1e293b 0%,
            #172035 45%,
            #1a2540 75%,
            #1e2d45 100%
          );
          border-bottom: 1px solid rgba(148, 163, 184, 0.12);
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.05),
            0 4px 20px rgba(0, 0, 0, 0.3),
            0 1px 3px rgba(96, 165, 250, 0.06);
        }

        .nav-tagline {
          font-family: 'Syne', sans-serif;
          font-size: 9px;
          letter-spacing: 0.22em;
          color: #475569;
          text-transform: uppercase;
          font-weight: 700;
          line-height: 1;
          user-select: none;
        }

        .nav-divider {
          width: 1px;
          height: 20px;
          background: linear-gradient(to bottom, transparent, rgba(148, 163, 184, 0.18), transparent);
        }
      `}</style>

      <nav className="nav-root sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex justify-between items-center">

          {/* LOGO */}
          <div className="flex flex-col gap-0.5 cursor-default select-none">
            <h1 className="ziply-logo text-2xl sm:text-3xl leading-none">
              Ziply<span className="accent-dot">.</span>
            </h1>
            <span className="nav-tagline">Shorten · Track · Analyze</span>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* DARK MODE BUTTON */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="nav-btn-mode flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium"
            >
              <span className="text-base leading-none">
                {darkMode ? "☀️" : "🌙"}
              </span>
              <span className="hidden sm:inline">
                {darkMode ? "Light" : "Dark"}
              </span>
            </button>

            <div className="nav-divider" />

            {/* LOGOUT BUTTON */}
            <button
              onClick={logout}
              className="nav-btn-logout flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium"
            >
              <svg
                className="w-3.5 h-3.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                />
              </svg>
              <span>Logout</span>
            </button>

          </div>

        </div>
      </nav>
    </>
  );
}

export default Navbar;