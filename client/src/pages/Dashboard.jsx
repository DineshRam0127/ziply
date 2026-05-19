import { useEffect, useState, useCallback } from "react";

import { useNavigate } from "react-router-dom";

import { QRCodeCanvas } from "qrcode.react";

import toast from "react-hot-toast";

import Navbar from "../components/Navbar";

import API from "../services/api";

function Dashboard() {

  const navigate = useNavigate();

  const [originalUrl, setOriginalUrl] = useState("");

  const [customAlias, setCustomAlias] = useState("");

  const [expiryDays, setExpiryDays] = useState("");

  const [urls, setUrls] = useState([]);

  const [loading, setLoading] = useState(true);

  const [darkMode, setDarkMode] = useState(false);

  const token = localStorage.getItem("token");


  // FETCH URLS
  const fetchUrls = useCallback(async () => {

    try {

      setLoading(true);

      // SPINNER DELAY
      await new Promise((resolve) =>
        setTimeout(resolve, 150)
      );

      const response = await API.get(
        "/url/myurls",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUrls(response.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);
    }

  }, [token]);


  // CREATE SHORT URL
  const createShortUrl = async () => {

    if (!originalUrl) {

      toast.error("Please enter a URL");

      return;
    }

    try {

      await API.post(
        "/url/create",
        {
          originalUrl,
          customAlias,
          expiryDays,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Short URL Created");

      setOriginalUrl("");

      setCustomAlias("");

      setExpiryDays("");

      fetchUrls();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };


  // DELETE URL
  const deleteUrl = async (id) => {

    try {

      await API.delete(
        `/url/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("URL Deleted");

      fetchUrls();

    } catch (error) {

      console.log(error);
    }
  };


  // EDIT URL
  const editUrl = async (id) => {

    const newUrl = prompt(
      "Enter new destination URL"
    );

    if (!newUrl) return;

    try {

      await API.put(

        `/url/edit/${id}`,

        {
          originalUrl: newUrl,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("URL Updated Successfully");

      fetchUrls();

    } catch (error) {

      console.log(error);
    }
  };


  // COPY SHORT URL
  const copyUrl = (shortCode) => {

    const shortUrl =
  `https://ziply-backend.onrender.com/${shortCode}`;

    navigator.clipboard.writeText(shortUrl);

    toast.success("Copied to clipboard");
  };


  // LOAD URLS
  useEffect(() => {

    fetchUrls();

  }, [fetchUrls]);


  return (

    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark" : ""}`}
      style={{ fontFamily: "'Geist', 'DM Sans', system-ui, sans-serif" }}
    >

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          --bg-base:         #f0f2f7;
          --bg-surface:      #ffffff;
          --bg-surface-2:    #f7f8fc;
          --bg-surface-3:    #eef0f6;
          --border-subtle:   #e3e6ef;
          --border-medium:   #cdd2e0;
          --text-primary:    #0f1629;
          --text-secondary:  #4a5270;
          --text-muted:      #8c93ad;

          --accent:          #4f46e5;
          --accent-hover:    #4338ca;
          --accent-subtle:   #eef2ff;
          --accent-border:   #c7d2fe;
          --accent-mid:      #818cf8;

          --violet:          #7c3aed;
          --violet-subtle:   #f5f3ff;
          --violet-border:   #ddd6fe;

          --sky:             #0284c7;
          --sky-subtle:      #f0f9ff;
          --sky-border:      #bae6fd;

          --rose:            #e11d48;
          --rose-subtle:     #fff1f2;
          --rose-border:     #fecdd3;

          --amber:           #b45309;
          --amber-subtle:    #fffbeb;
          --amber-border:    #fde68a;

          --emerald:         #059669;
          --emerald-subtle:  #ecfdf5;
          --emerald-border:  #a7f3d0;

          --shadow-xs:       0 1px 2px rgba(15,22,50,0.04);
          --shadow-sm:       0 1px 3px rgba(15,22,50,0.07), 0 1px 2px rgba(15,22,50,0.04);
          --shadow-md:       0 4px 16px rgba(15,22,50,0.08), 0 2px 4px rgba(15,22,50,0.04);
          --shadow-lg:       0 10px 32px rgba(15,22,50,0.10), 0 4px 8px rgba(15,22,50,0.06);
        }

        .dark-theme {
          --bg-base:         #0c0e18;
          --bg-surface:      #131625;
          --bg-surface-2:    #181b2e;
          --bg-surface-3:    #1e2235;
          --border-subtle:   #252a3f;
          --border-medium:   #2e3450;
          --text-primary:    #eceef8;
          --text-secondary:  #7b82a8;
          --text-muted:      #4a5070;

          --accent:          #6366f1;
          --accent-hover:    #818cf8;
          --accent-subtle:   rgba(99,102,241,0.10);
          --accent-border:   rgba(99,102,241,0.22);
          --accent-mid:      #818cf8;

          --violet:          #8b5cf6;
          --violet-subtle:   rgba(139,92,246,0.10);
          --violet-border:   rgba(139,92,246,0.22);

          --sky:             #38bdf8;
          --sky-subtle:      rgba(56,189,248,0.08);
          --sky-border:      rgba(56,189,248,0.2);

          --rose:            #fb7185;
          --rose-subtle:     rgba(251,113,133,0.09);
          --rose-border:     rgba(251,113,133,0.22);

          --amber:           #fbbf24;
          --amber-subtle:    rgba(251,191,36,0.09);
          --amber-border:    rgba(251,191,36,0.22);

          --emerald:         #34d399;
          --emerald-subtle:  rgba(52,211,153,0.09);
          --emerald-border:  rgba(52,211,153,0.22);

          --shadow-xs:       0 1px 2px rgba(0,0,0,0.25);
          --shadow-sm:       0 1px 3px rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.2);
          --shadow-md:       0 4px 16px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.25);
          --shadow-lg:       0 10px 32px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.3);
        }

        * { box-sizing: border-box; }

        .d-root {
          background: var(--bg-base);
          color: var(--text-primary);
          min-height: 100vh;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }

        /* ─── SURFACES ─── */
        .surface {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-sm);
          border-radius: 16px;
        }
        .surface-raised {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-md);
          border-radius: 16px;
        }

        /* ─── HERO ─── */
        .hero-banner {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-md);
          border-radius: 18px;
          position: relative;
          overflow: hidden;
        }
        .hero-banner::before {
          content: '';
          position: absolute;
          top: -40px; right: -40px;
          width: 220px; height: 220px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-banner::after {
          content: '';
          position: absolute;
          bottom: -30px; left: 20%;
          width: 160px; height: 160px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ─── STAT CARDS ─── */
        .stat-card {
          background: var(--bg-surface-2);
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 16px 22px;
          min-width: 96px;
          text-align: center;
          transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
          cursor: default;
        }
        .stat-card:hover {
          box-shadow: var(--shadow-sm);
          border-color: var(--border-medium);
          transform: translateY(-1px);
        }

        /* ─── SECTION HEADER ─── */
        .section-header {
          background: var(--bg-surface-2);
          border-bottom: 1px solid var(--border-subtle);
          padding: 15px 24px;
          border-radius: 16px 16px 0 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .section-icon {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: var(--accent-subtle);
          border: 1px solid var(--accent-border);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .section-icon svg {
          color: var(--accent);
          width: 14px;
          height: 14px;
        }
        .section-title {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        /* ─── INPUTS ─── */
        .z-input {
          width: 100%;
          background: var(--bg-surface);
          border: 1.5px solid var(--border-subtle);
          border-radius: 10px;
          padding: 11px 14px;
          font-size: 13.5px;
          color: var(--text-primary);
          transition: border-color 0.17s, box-shadow 0.17s;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }
        .z-input::placeholder { color: var(--text-muted); }
        .z-input:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(79,70,229,0.11);
        }

        .z-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: var(--text-secondary);
          margin-bottom: 7px;
        }
        .z-label-opt {
          text-transform: none;
          font-weight: 400;
          letter-spacing: 0;
          color: var(--text-muted);
          font-size: 11px;
        }

        /* ─── GROUPED INPUTS ─── */
        .grouped-wrap {
          display: flex;
          align-items: stretch;
          border: 1.5px solid var(--border-subtle);
          border-radius: 10px;
          overflow: hidden;
          transition: border-color 0.17s, box-shadow 0.17s;
          background: var(--bg-surface);
        }
        .grouped-wrap:focus-within {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(79,70,229,0.11);
        }
        .adornment {
          background: var(--bg-surface-3);
          border-right: 1.5px solid var(--border-subtle);
          color: var(--text-muted);
          font-size: 11.5px;
          font-weight: 600;
          padding: 0 13px;
          display: flex;
          align-items: center;
          white-space: nowrap;
          user-select: none;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: -0.02em;
        }
        .adornment-right {
          background: var(--bg-surface-3);
          border-left: 1.5px solid var(--border-subtle);
          border-right: none;
        }
        .grouped-inner {
          flex: 1;
          background: transparent;
          border: none;
          padding: 10px 13px;
          font-size: 13.5px;
          color: var(--text-primary);
          outline: none;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          min-width: 0;
        }
        .grouped-inner::placeholder { color: var(--text-muted); }

        /* ─── PRIMARY BUTTON ─── */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--accent);
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 11px 22px;
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.17s, box-shadow 0.17s, transform 0.12s;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          box-shadow: 0 2px 8px rgba(79,70,229,0.25), 0 1px 3px rgba(79,70,229,0.15);
          letter-spacing: -0.01em;
        }
        .btn-primary:hover {
          background: var(--accent-hover);
          box-shadow: 0 4px 16px rgba(79,70,229,0.32), 0 2px 6px rgba(79,70,229,0.18);
          transform: translateY(-1px);
        }
        .btn-primary:active { transform: scale(0.98) translateY(0); }

        /* ─── ACTION BUTTONS ─── */
        .btn-action {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 11px;
          border-radius: 7px;
          font-size: 11.5px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.14s, border-color 0.14s, transform 0.1s, box-shadow 0.14s;
          border: 1.5px solid transparent;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          white-space: nowrap;
          letter-spacing: 0.01em;
        }
        .btn-action:active { transform: scale(0.95); }

        .btn-copy {
          color: var(--accent);
          background: var(--accent-subtle);
          border-color: var(--accent-border);
        }
        .btn-copy:hover {
          background: #e0e7ff;
          border-color: var(--accent-mid);
          box-shadow: 0 2px 8px rgba(79,70,229,0.12);
        }
        .dark-theme .btn-copy:hover { background: rgba(99,102,241,0.18); }

        .btn-edit {
          color: var(--amber);
          background: var(--amber-subtle);
          border-color: var(--amber-border);
        }
        .btn-edit:hover {
          background: #fef3c7;
          border-color: #fcd34d;
          box-shadow: 0 2px 8px rgba(180,83,9,0.10);
        }
        .dark-theme .btn-edit:hover { background: rgba(251,191,36,0.15); }

        .btn-delete {
          color: var(--rose);
          background: var(--rose-subtle);
          border-color: var(--rose-border);
        }
        .btn-delete:hover {
          background: #ffe4e6;
          border-color: #fda4af;
          box-shadow: 0 2px 8px rgba(225,29,72,0.10);
        }
        .dark-theme .btn-delete:hover { background: rgba(251,113,133,0.15); }

        .btn-analytics {
          color: var(--violet);
          background: var(--violet-subtle);
          border-color: var(--violet-border);
        }
        .btn-analytics:hover {
          background: #ede9fe;
          border-color: #c4b5fd;
          box-shadow: 0 2px 8px rgba(124,58,237,0.12);
        }
        .dark-theme .btn-analytics:hover { background: rgba(139,92,246,0.18); }

        /* ─── TABLE ─── */
        .z-table { width: 100%; border-collapse: collapse; font-size: 13px; }

        .z-thead th {
          background: var(--bg-surface-2);
          color: var(--text-muted);
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.10em;
          padding: 12px 20px;
          text-align: left;
          border-bottom: 1px solid var(--border-subtle);
          white-space: nowrap;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }
        .z-thead th.center { text-align: center; }

        .z-row {
          border-bottom: 1px solid var(--border-subtle);
          transition: background 0.12s;
        }
        .z-row:last-child { border-bottom: none; }
        .z-row:hover { background: var(--bg-surface-2); }

        .z-cell {
          padding: 14px 20px;
          color: var(--text-primary);
          vertical-align: middle;
        }
        .z-cell.center { text-align: center; }
        .z-cell.muted {
          color: var(--text-secondary);
          font-size: 12.5px;
        }

        .url-link {
          color: var(--text-secondary);
          font-size: 12.5px;
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: block;
        }

        .short-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: var(--accent);
          font-weight: 600;
          font-size: 12.5px;
          text-decoration: none;
          font-family: 'JetBrains Mono', monospace;
          transition: color 0.14s;
          letter-spacing: -0.02em;
        }
        .short-link:hover {
          color: var(--accent-hover);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .click-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 11.5px;
          font-weight: 800;
          padding: 3px 11px;
          border-radius: 999px;
          min-width: 38px;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }
        .click-badge.active {
          background: var(--emerald-subtle);
          color: var(--emerald);
          border: 1px solid var(--emerald-border);
        }
        .click-badge.zero {
          background: var(--bg-surface-3);
          color: var(--text-muted);
          border: 1px solid var(--border-subtle);
        }

        .qr-wrap {
          display: inline-flex;
          padding: 6px;
          border-radius: 10px;
          background: #fff;
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-xs);
        }

        /* ─── LOADER ─── */
        .loader-ring {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2.5px solid var(--border-subtle);
          border-top-color: var(--accent);
          animation: spin 0.75s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ─── EMPTY STATE ─── */
        .empty-icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: var(--accent-subtle);
          border: 1px solid var(--accent-border);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }

        /* ─── ANIMATIONS ─── */
        .fade-up {
          animation: fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .delay-1 { animation-delay: 0.06s; }
        .delay-2 { animation-delay: 0.12s; }
        .delay-3 { animation-delay: 0.18s; }

        /* ─── PILL ─── */
        .pill {
          display: inline-flex;
          align-items: center;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.03em;
          padding: 3px 10px;
          border-radius: 999px;
          background: var(--accent-subtle);
          color: var(--accent);
          border: 1px solid var(--accent-border);
        }

        /* ─── BRAND LOGO ICON ─── */
        .brand-icon {
          width: 46px;
          height: 46px;
          border-radius: 13px;
          background: linear-gradient(140deg, #4f46e5 0%, #7c3aed 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(79,70,229,0.30), 0 1px 3px rgba(0,0,0,0.10);
          flex-shrink: 0;
        }

        /* ─── DIVIDER ─── */
        .divider {
          border: none;
          border-top: 1px solid var(--border-subtle);
          margin: 0;
        }

        /* ─── FORM GRID ─── */
        @media (min-width: 600px) {
          .create-row-2col {
            grid-template-columns: 2fr 1fr !important;
          }
        }

        /* ─── RESPONSIVE TABLE SCROLL ─── */
        .table-scroll {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .table-scroll::-webkit-scrollbar {
          height: 4px;
        }
        .table-scroll::-webkit-scrollbar-track {
          background: var(--bg-surface-2);
        }
        .table-scroll::-webkit-scrollbar-thumb {
          background: var(--border-medium);
          border-radius: 2px;
        }
      `}</style>

      <div className={darkMode ? "dark-theme" : ""}>
        <div className="d-root">

          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

          <div style={{ maxWidth: 1160, margin: "0 auto", padding: "28px 20px 64px" }}>


            {/* ── HERO BANNER ── */}
            <div
              className="hero-banner fade-up"
              style={{
                padding: "22px 28px",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 16,
              }}
            >

              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>

                <div className="brand-icon">
                  <svg width="22" height="22" viewBox="0 0 20 20" fill="white">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>

                <div>
                  <h1
                    style={{
                      fontSize: 21,
                      fontWeight: 800,
                      letterSpacing: "-0.025em",
                      color: "var(--text-primary)",
                      margin: 0,
                      lineHeight: 1.2,
                    }}
                  >
                    My Dashboard
                  </h1>
                  <p
                    style={{
                      fontSize: 12.5,
                      color: "var(--text-muted)",
                      margin: "3px 0 0",
                      fontWeight: 500,
                      letterSpacing: "0.02em",
                    }}
                  >
                    Shorten · Track · Analyze
                  </p>
                </div>

              </div>

              <div style={{ display: "flex", gap: 10 }}>

                <div className="stat-card">
                  <p
                    style={{
                      fontSize: 26,
                      fontWeight: 800,
                      color: "var(--accent)",
                      margin: 0,
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {urls.length}
                  </p>
                  <p
                    style={{
                      fontSize: 9.5,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.10em",
                      color: "var(--text-muted)",
                      margin: "5px 0 0",
                    }}
                  >
                    Links
                  </p>
                </div>

                <div className="stat-card">
                  <p
                    style={{
                      fontSize: 26,
                      fontWeight: 800,
                      color: "var(--violet)",
                      margin: 0,
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {urls.reduce((a, u) => a + (u.clicks || 0), 0)}
                  </p>
                  <p
                    style={{
                      fontSize: 9.5,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.10em",
                      color: "var(--text-muted)",
                      margin: "5px 0 0",
                    }}
                  >
                    Clicks
                  </p>
                </div>

              </div>

            </div>


            {/* ── CREATE URL CARD ── */}
            <div
              className="surface-raised fade-up delay-1"
              style={{ marginBottom: 20, overflow: "hidden" }}
            >

              <div className="section-header">
                <div className="section-icon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="section-title">Create Short URL</span>
              </div>

              <div style={{ padding: "22px 24px 26px" }}>

                {/* DESTINATION URL */}
                <div style={{ marginBottom: 16 }}>
                  <label className="z-label">Destination URL</label>
                  <input
                    type="text"
                    placeholder="https://your-long-url.com/goes/here"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    className="z-input"
                  />
                </div>

                {/* ALIAS + EXPIRY ROW */}
                <div
                  className="create-row-2col"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: 14,
                    marginBottom: 20,
                  }}
                >

                  {/* CUSTOM ALIAS */}
                  <div>
                    <label className="z-label">
                      Custom Alias{" "}
                      <span className="z-label-opt">(optional)</span>
                    </label>
                    <div className="grouped-wrap">
                      <span className="adornment">ziply.io/</span>
                      <input
                        type="text"
                        placeholder="my-brand"
                        value={customAlias}
                        onChange={(e) => setCustomAlias(e.target.value)}
                        className="grouped-inner"
                      />
                    </div>
                  </div>

                  {/* EXPIRY */}
                  <div>
                    <label className="z-label">
                      Expires After{" "}
                      <span className="z-label-opt">(optional)</span>
                    </label>
                    <div className="grouped-wrap">
                      <input
                        type="number"
                        placeholder="30"
                        value={expiryDays}
                        onChange={(e) => setExpiryDays(e.target.value)}
                        className="grouped-inner"
                      />
                      <span className="adornment adornment-right">days</span>
                    </div>
                  </div>

                </div>

                {/* CREATE BUTTON */}
                <button onClick={createShortUrl} className="btn-primary">
                  <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Shorten URL
                </button>

              </div>

            </div>


            {/* ── URLS TABLE / LOADING ── */}
            {loading ? (

              <div
                className="surface fade-up delay-2"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "80px 24px",
                }}
              >
                <div className="loader-ring" style={{ marginBottom: 18 }} />
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    margin: 0,
                  }}
                >
                  Loading your links
                </p>
                <p
                  style={{
                    fontSize: 12.5,
                    color: "var(--text-muted)",
                    margin: "4px 0 0",
                  }}
                >
                  Just a moment…
                </p>
              </div>

            ) : (

              <div
                className="surface-raised fade-up delay-2"
                style={{ overflow: "hidden" }}
              >

                {/* TABLE SECTION HEADER */}
                <div
                  className="section-header"
                  style={{ justifyContent: "space-between" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div className="section-icon">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                    <span className="section-title">My Links</span>
                  </div>
                  <span className="pill">
                    {urls.length} {urls.length === 1 ? "link" : "links"}
                  </span>
                </div>

                <div className="table-scroll">
                  <table className="z-table">

                    <thead className="z-thead">
                      <tr>
                        <th>Original URL</th>
                        <th>Short Link</th>
                        <th className="center">Clicks</th>
                        <th>Created</th>
                        <th className="center">QR Code</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>

                      {urls.length > 0 ? (

                        urls.map((url) => (

                          <tr key={url._id} className="z-row">

                            {/* ORIGINAL URL */}
                            <td className="z-cell" style={{ maxWidth: 200 }}>
                              <span className="url-link" title={url.originalUrl}>
                                {url.originalUrl}
                              </span>
                            </td>

                            {/* SHORT URL */}
                            <td className="z-cell">
                              <a
                                href={`https://ziply-backend.onrender.com/${url.shortCode}`}
                                target="_blank"
                                rel="noreferrer"
                                className="short-link"
                              >
                                <svg
                                  width="11"
                                  height="11"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  style={{ flexShrink: 0 }}
                                >
                                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                </svg>
                                {url.shortCode}
                              </a>
                            </td>

                            {/* CLICKS */}
                            <td className="z-cell center">
                              <span
                                className={`click-badge ${url.clicks > 0 ? "active" : "zero"}`}
                              >
                                {url.clicks}
                              </span>
                            </td>

                            {/* CREATED DATE */}
                            <td
                              className="z-cell muted"
                              style={{ whiteSpace: "nowrap" }}
                            >
                              {new Date(url.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </td>

                            {/* QR CODE */}
                            <td className="z-cell center">
                              <div className="qr-wrap">
                                <QRCodeCanvas
                                  value={`https://ziply-backend.onrender.com/${url.shortCode}`}
                                  size={46}
                                />
                              </div>
                            </td>

                            {/* ACTIONS */}
                            <td className="z-cell">
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 5,
                                  flexWrap: "wrap",
                                }}
                              >

                                {/* COPY */}
                                <button
                                  onClick={() => copyUrl(url.shortCode)}
                                  title="Copy short URL"
                                  className="btn-action btn-copy"
                                >
                                  <svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                  </svg>
                                  Copy
                                </button>

                                {/* EDIT */}
                                <button
                                  onClick={() => editUrl(url._id)}
                                  title="Edit destination URL"
                                  className="btn-action btn-edit"
                                >
                                  <svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                  </svg>
                                  Edit
                                </button>

                                {/* DELETE */}
                                <button
                                  onClick={() => deleteUrl(url._id)}
                                  title="Delete this URL"
                                  className="btn-action btn-delete"
                                >
                                  <svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                  Delete
                                </button>

                                {/* ANALYTICS */}
                                <button
                                  onClick={() => navigate(`/analytics/${url._id}`)}
                                  title="View analytics"
                                  className="btn-action btn-analytics"
                                >
                                  <svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                  </svg>
                                  Analytics
                                </button>

                              </div>
                            </td>

                          </tr>

                        ))

                      ) : (

                        <tr>
                          <td
                            colSpan="6"
                            style={{ padding: "72px 24px", textAlign: "center" }}
                          >
                            <div className="empty-icon-wrap">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                style={{ color: "var(--accent)" }}
                              >
                                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <p
                              style={{
                                fontSize: 14,
                                fontWeight: 700,
                                color: "var(--text-primary)",
                                margin: 0,
                              }}
                            >
                              No links yet
                            </p>
                            <p
                              style={{
                                fontSize: 13,
                                color: "var(--text-muted)",
                                margin: "5px 0 0",
                              }}
                            >
                              Create your first short URL above to get started.
                            </p>
                          </td>
                        </tr>

                      )}

                    </tbody>

                  </table>
                </div>

              </div>

            )}

          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;