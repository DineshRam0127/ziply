import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";


// CUSTOM TOOLTIP
const CustomTooltip = ({ active, payload, label }) => {

  if (active && payload && payload.length) {

    return (

      <div
        style={{
          background: "rgba(255,255,255,0.97)",
          border: "1px solid #e2e8f0",
          borderRadius: "14px",
          padding: "12px 18px",
          boxShadow: "0 8px 32px rgba(15,23,42,0.10)",
        }}
      >
        <p style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "4px", letterSpacing: "0.05em" }}>
          {label}
        </p>

        <p style={{ fontSize: "15px", fontWeight: "700", color: "#f97316", margin: 0 }}>
          {payload[0].value} Clicks
        </p>
      </div>
    );
  }

  return null;
};


function Analytics() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [analytics, setAnalytics] = useState(null);

  const token = localStorage.getItem("token");


  // FETCH ANALYTICS
  const fetchAnalytics = async () => {

    try {

      const response = await API.get(
        `/url/analytics/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnalytics(response.data);

    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {

    fetchAnalytics();

  }, []);


  // LOADING
  if (!analytics) {

    return (

      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #fef3c7 100%)" }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            border: "3px solid #fde68a",
            borderTopColor: "#f97316",
            animation: "spin 0.8s linear infinite",
            marginBottom: "24px",
          }}
        />

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

        <p
          style={{
            color: "#64748b",
            fontSize: "12px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: "600",
          }}
        >
          Loading Analytics
        </p>

      </div>
    );
  }


  // CHART DATA
  const chartData =
    analytics.recentVisits.length > 0
      ? analytics.recentVisits.map(
          (visit, index) => ({
            name: new Date(
              visit.timestamp
            ).toLocaleTimeString(),

            clicks: index + 1,
          })
        )
      : [
          {
            name: "No Data",
            clicks: 0,
          },
        ];


  return (

    <div
      className="min-h-screen text-gray-800"
      style={{ background: "linear-gradient(150deg, #f8fafc 0%, #f1f5f9 40%, #fff7ed 100%)" }}
    >

      <Navbar />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">


        {/* TOP HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">

          <div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(90deg, #fff7ed, #fef3c7)",
                border: "1px solid #fed7aa",
                borderRadius: "100px",
                padding: "4px 14px",
                marginBottom: "14px",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#f97316",
                  display: "inline-block",
                  boxShadow: "0 0 0 3px rgba(249,115,22,0.2)",
                }}
              />
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "#ea580c",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                Ziply Analytics
              </p>
            </div>

            <h1
              style={{
                fontSize: "clamp(26px, 4vw, 38px)",
                fontWeight: "800",
                color: "#0f172a",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                margin: "0 0 8px 0",
              }}
            >
              Analytics Dashboard
            </h1>

            <p style={{ color: "#94a3b8", fontSize: "14px", margin: 0, fontWeight: "500" }}>
              Shorten • Track • Analyze
            </p>

          </div>


          <button
            onClick={() => navigate("/dashboard")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              padding: "10px 20px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#475569",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 1px 4px rgba(15,23,42,0.06)",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#f8fafc";
              e.currentTarget.style.borderColor = "#cbd5e1";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(15,23,42,0.10)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.boxShadow = "0 1px 4px rgba(15,23,42,0.06)";
            }}
          >
            <span style={{ fontSize: "16px" }}>←</span>
            Back to Dashboard
          </button>

        </div>


        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">


          {/* TOTAL CLICKS */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "20px",
              padding: "28px",
              boxShadow: "0 2px 8px rgba(15,23,42,0.06)",
              transition: "all 0.25s ease",
              cursor: "default",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(249,115,22,0.13)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.borderColor = "#fed7aa";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(15,23,42,0.06)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "#e2e8f0";
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0, right: 0,
                width: "120px",
                height: "120px",
                background: "radial-gradient(circle at top right, rgba(249,115,22,0.07), transparent 70%)",
                borderRadius: "0 20px 0 0",
              }}
            />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <p style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>
                Total Clicks
              </p>

              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #fff7ed, #fed7aa)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                🚀
              </div>
            </div>

            <h2
              style={{
                fontSize: "48px",
                fontWeight: "800",
                color: "#f97316",
                lineHeight: 1,
                margin: "0 0 8px 0",
                letterSpacing: "-0.02em",
              }}
            >
              {analytics.totalClicks}
            </h2>

            <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0 }}>
              Total visitors tracked
            </p>

          </div>


          {/* SHORT CODE */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "20px",
              padding: "28px",
              boxShadow: "0 2px 8px rgba(15,23,42,0.06)",
              transition: "all 0.25s ease",
              cursor: "default",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(245,158,11,0.12)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.borderColor = "#fde68a";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(15,23,42,0.06)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "#e2e8f0";
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0, right: 0,
                width: "120px",
                height: "120px",
                background: "radial-gradient(circle at top right, rgba(245,158,11,0.07), transparent 70%)",
                borderRadius: "0 20px 0 0",
              }}
            />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <p style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>
                Short Code
              </p>

              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #fffbeb, #fde68a)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                🔗
              </div>
            </div>

            <h2
              style={{
                fontSize: "28px",
                fontWeight: "800",
                color: "#d97706",
                lineHeight: 1.2,
                margin: "0 0 8px 0",
                letterSpacing: "-0.01em",
                wordBreak: "break-all",
              }}
            >
              {analytics.shortCode}
            </h2>

            <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0 }}>
              Unique URL identifier
            </p>

          </div>


          {/* LAST VISITED */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "20px",
              padding: "28px",
              boxShadow: "0 2px 8px rgba(15,23,42,0.06)",
              transition: "all 0.25s ease",
              cursor: "default",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(100,116,139,0.12)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.borderColor = "#cbd5e1";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(15,23,42,0.06)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "#e2e8f0";
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0, right: 0,
                width: "120px",
                height: "120px",
                background: "radial-gradient(circle at top right, rgba(100,116,139,0.06), transparent 70%)",
                borderRadius: "0 20px 0 0",
              }}
            />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <p style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>
                Last Visited
              </p>

              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                ⏰
              </div>
            </div>

            <h2
              style={{
                fontSize: "17px",
                fontWeight: "700",
                color: "#334155",
                lineHeight: 1.5,
                margin: "0 0 8px 0",
              }}
            >
              {analytics.lastVisited !== "No visits yet"
                ? new Date(analytics.lastVisited).toLocaleString()
                : "No visits yet"}
            </h2>

            <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0 }}>
              Latest activity detected
            </p>

          </div>

        </div>


        {/* GRAPH SECTION */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "20px",
            padding: "32px",
            boxShadow: "0 2px 8px rgba(15,23,42,0.06)",
            marginBottom: "24px",
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "32px",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >

            <div>

              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#0f172a",
                  margin: "0 0 4px 0",
                  letterSpacing: "-0.01em",
                }}
              >
                Click Trends
              </h2>

              <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0 }}>
                Cumulative click growth over time
              </p>

            </div>


            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                padding: "6px 14px",
                borderRadius: "100px",
                fontSize: "12px",
                fontWeight: "700",
                color: "#16a34a",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "inline-block",
                  boxShadow: "0 0 0 3px rgba(34,197,94,0.2)",
                }}
              />
              Live Data
            </div>

          </div>


          <ResponsiveContainer width="100%" height={320}>

            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 20,
                left: -10,
                bottom: 0,
              }}
            >

              <defs>

                <linearGradient
                  id="colorClicks"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="5%"
                    stopColor="#f97316"
                    stopOpacity={0.7}
                  />

                  <stop
                    offset="95%"
                    stopColor="#f97316"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>


              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f1f5f9"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                tick={{
                  fill: "#94a3b8",
                  fontSize: 11,
                  fontWeight: 500,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                allowDecimals={false}
                tick={{
                  fill: "#94a3b8",
                  fontSize: 11,
                  fontWeight: 500,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="clicks"
                stroke="#f97316"
                fillOpacity={1}
                fill="url(#colorClicks)"
                strokeWidth={4}
              />

              <Line
                type="monotone"
                dataKey="clicks"
                stroke="#fb923c"
                strokeWidth={4}
                dot={{
                  r: 5,
                  fill: "#fb923c",
                  strokeWidth: 2,
                  stroke: "#fff",
                }}
                activeDot={{
                  r: 7,
                  fill: "#f97316",
                }}
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>


        {/* RECENT VISITS */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "20px",
            padding: "32px",
            boxShadow: "0 2px 8px rgba(15,23,42,0.06)",
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "28px",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >

            <div>

              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#0f172a",
                  margin: "0 0 4px 0",
                  letterSpacing: "-0.01em",
                }}
              >
                Recent Visits
              </h2>

              <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0 }}>
                Latest visitor activity log
              </p>

            </div>


            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                padding: "6px 14px",
                borderRadius: "100px",
                fontSize: "12px",
                fontWeight: "700",
                color: "#64748b",
              }}
            >
              {analytics.recentVisits.length} Visits
            </div>

          </div>


          {analytics.recentVisits.length > 0 ? (

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

              {analytics.recentVisits.map(
                (visit, index) => (

                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "#f8fafc",
                      border: "1px solid #f1f5f9",
                      borderRadius: "14px",
                      padding: "14px 18px",
                      transition: "all 0.2s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "#fff7ed";
                      e.currentTarget.style.borderColor = "#fed7aa";
                      e.currentTarget.style.boxShadow = "0 2px 12px rgba(249,115,22,0.08)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "#f8fafc";
                      e.currentTarget.style.borderColor = "#f1f5f9";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >

                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>

                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "12px",
                          background: "linear-gradient(135deg, #fff7ed, #fed7aa)",
                          border: "1px solid #fdba74",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "16px",
                          flexShrink: 0,
                        }}
                      >
                        👤
                      </div>

                      <div>

                        <p
                          style={{
                            fontWeight: "600",
                            color: "#1e293b",
                            fontSize: "14px",
                            margin: "0 0 2px 0",
                          }}
                        >
                          Visitor #{index + 1}
                        </p>

                        <p
                          style={{
                            fontSize: "12px",
                            color: "#94a3b8",
                            margin: 0,
                          }}
                        >
                          {new Date(visit.timestamp).toLocaleString()}
                        </p>

                      </div>

                    </div>


                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        background: "#f0fdf4",
                        border: "1px solid #bbf7d0",
                        padding: "4px 11px",
                        borderRadius: "100px",
                        fontSize: "11px",
                        fontWeight: "700",
                        color: "#16a34a",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "#22c55e",
                          display: "inline-block",
                        }}
                      />
                      Active
                    </div>

                  </div>
                )
              )}

            </div>

          ) : (

            <div
              style={{
                textAlign: "center",
                padding: "64px 24px",
              }}
            >

              <div
                style={{
                  fontSize: "52px",
                  marginBottom: "16px",
                  filter: "grayscale(0.2)",
                }}
              >
                📭
              </div>

              <h3
                style={{
                  fontSize: "17px",
                  fontWeight: "700",
                  color: "#334155",
                  margin: "0 0 8px 0",
                }}
              >
                No Visits Yet
              </h3>

              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "14px",
                  margin: 0,
                }}
              >
                Share your short URL to start tracking analytics.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Analytics;