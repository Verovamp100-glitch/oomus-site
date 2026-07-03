import { useState } from "react";

const GOLD = "#C9A876";
const CREAM = "#F4F0E7";
const DARK = "#0B0B0C";
const DARK_CARD = "#141414";
const DARK_INPUT = "#1a1a1a";
const GOLD_DIM = "rgba(201,168,118,0.15)";

export default function CostCalculator() {
  const [shots, setShots] = useState("");
  const [costPerShoot, setCostPerShoot] = useState("");
  const [shootsPerYear, setShootsPerYear] = useState("");
  const [calculated, setCalculated] = useState(false);

  const shotsNum = parseInt(shots) || 0;
  const costNum = parseInt(costPerShoot) || 0;
  const shootsNum = parseInt(shootsPerYear) || 0;

  const traditionalTotal = costNum * shootsNum;
  const aiPricePerShot = 45;
  const aiTotal = shotsNum * shootsNum * aiPricePerShot;
  const saved = traditionalTotal - aiTotal;
  const savedPercent = traditionalTotal > 0 ? Math.round((saved / traditionalTotal) * 100) : 0;

  const canCalculate = shotsNum > 0 && costNum > 0 && shootsNum > 0;

  const handleCalculate = () => {
    if (canCalculate) setCalculated(true);
  };

  const handleReset = () => {
    setCalculated(false);
    setShots("");
    setCostPerShoot("");
    setShootsPerYear("");
  };

  const formatMoney = (n) => {
    if (n >= 1000) return `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
    return `$${n.toLocaleString()}`;
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: DARK,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      fontFamily: "'Jost', 'Inter', system-ui, sans-serif",
    }}>
      <div style={{ width: "100%", maxWidth: 520 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
            fontSize: 11,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: GOLD,
            marginBottom: 12,
          }}>
            OoMuS AI Creative Studio
          </p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
            fontSize: "clamp(26px, 5vw, 36px)",
            fontWeight: 400,
            color: CREAM,
            lineHeight: 1.2,
            margin: 0,
          }}>
            How Much Could AI<br />Save Your Brand?
          </h1>
          <p style={{
            fontSize: 14,
            color: "rgba(244,240,231,0.5)",
            marginTop: 12,
            lineHeight: 1.6,
          }}>
            Compare your current content production costs<br />
            with AI-powered creative
          </p>
        </div>

        {!calculated ? (
          /* Input Form */
          <div style={{
            backgroundColor: DARK_CARD,
            border: `1px solid rgba(201,168,118,0.12)`,
            borderRadius: 2,
            padding: "36px 32px",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <InputField
                label="Visuals per shoot"
                hint="How many photos/videos per session"
                value={shots}
                onChange={setShots}
                placeholder="e.g. 15"
              />
              <InputField
                label="Cost per traditional shoot"
                hint="Photographer, model, studio, styling"
                value={costPerShoot}
                onChange={setCostPerShoot}
                placeholder="e.g. 3000"
                prefix="$"
              />
              <InputField
                label="Shoots per year"
                hint="How many sessions annually"
                value={shootsPerYear}
                onChange={setShootsPerYear}
                placeholder="e.g. 6"
              />
            </div>

            <button
              onClick={handleCalculate}
              disabled={!canCalculate}
              style={{
                width: "100%",
                marginTop: 36,
                padding: "16px 0",
                backgroundColor: canCalculate ? GOLD : "rgba(201,168,118,0.2)",
                color: canCalculate ? DARK : "rgba(201,168,118,0.4)",
                border: "none",
                borderRadius: 2,
                fontSize: 12,
                fontFamily: "'Jost', sans-serif",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 500,
                cursor: canCalculate ? "pointer" : "default",
                transition: "all 0.3s ease",
              }}
            >
              Calculate Savings
            </button>
          </div>
        ) : (
          /* Results */
          <div style={{
            backgroundColor: DARK_CARD,
            border: `1px solid rgba(201,168,118,0.12)`,
            borderRadius: 2,
            padding: "36px 32px",
          }}>
            {/* Comparison */}
            <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
              <ResultCard
                label="Traditional"
                amount={formatMoney(traditionalTotal)}
                sub="per year"
                dimmed
              />
              <ResultCard
                label="With AI"
                amount={formatMoney(aiTotal)}
                sub="per year"
                highlighted
              />
            </div>

            {/* Savings banner */}
            {saved > 0 && (
              <div style={{
                backgroundColor: GOLD_DIM,
                border: `1px solid rgba(201,168,118,0.25)`,
                borderRadius: 2,
                padding: "24px 20px",
                textAlign: "center",
                marginBottom: 28,
              }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 42,
                  fontWeight: 400,
                  color: GOLD,
                  margin: 0,
                  lineHeight: 1,
                }}>
                  {savedPercent}%
                </p>
                <p style={{
                  fontSize: 13,
                  color: CREAM,
                  margin: "8px 0 0",
                  opacity: 0.7,
                }}>
                  potential savings — {formatMoney(saved)}/year
                </p>
              </div>
            )}

            {/* Details */}
            <div style={{
              borderTop: `1px solid rgba(201,168,118,0.1)`,
              paddingTop: 20,
              marginBottom: 28,
            }}>
              <DetailRow label="Visuals per shoot" value={shotsNum} />
              <DetailRow label="Shoots per year" value={shootsNum} />
              <DetailRow label="Total visuals/year" value={shotsNum * shootsNum} />
            </div>

            {/* CTA */}
            <a
              href="mailto:oomustudio@proton.me?subject=AI%20Content%20Inquiry"
              style={{ textDecoration: "none" }}
            >
              <button style={{
                width: "100%",
                padding: "16px 0",
                backgroundColor: GOLD,
                color: DARK,
                border: "none",
                borderRadius: 2,
                fontSize: 12,
                fontFamily: "'Jost', sans-serif",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 500,
                cursor: "pointer",
                marginBottom: 12,
              }}>
                Discuss Your Project
              </button>
            </a>

            <button
              onClick={handleReset}
              style={{
                width: "100%",
                padding: "12px 0",
                backgroundColor: "transparent",
                color: "rgba(244,240,231,0.4)",
                border: "none",
                fontSize: 12,
                fontFamily: "'Jost', sans-serif",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Recalculate
            </button>
          </div>
        )}

        {/* Footer note */}
        <p style={{
          textAlign: "center",
          fontSize: 11,
          color: "rgba(244,240,231,0.25)",
          marginTop: 24,
          lineHeight: 1.5,
        }}>
          *Estimates based on average AI editorial production costs.
          <br />Final pricing depends on project scope and complexity.
        </p>
      </div>
    </div>
  );
}

function InputField({ label, hint, value, onChange, placeholder, prefix }) {
  return (
    <div>
      <label style={{
        display: "block",
        fontSize: 13,
        fontWeight: 500,
        color: CREAM,
        marginBottom: 4,
        letterSpacing: "0.03em",
      }}>
        {label}
      </label>
      {hint && (
        <p style={{
          fontSize: 11,
          color: "rgba(244,240,231,0.35)",
          margin: "0 0 10px",
        }}>
          {hint}
        </p>
      )}
      <div style={{ position: "relative" }}>
        {prefix && (
          <span style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%)",
            color: GOLD,
            fontSize: 15,
            opacity: 0.6,
          }}>
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%",
            padding: prefix ? "14px 14px 14px 28px" : "14px",
            backgroundColor: DARK_INPUT,
            border: `1px solid rgba(201,168,118,0.15)`,
            borderRadius: 2,
            color: CREAM,
            fontSize: 15,
            fontFamily: "'Jost', sans-serif",
            outline: "none",
            boxSizing: "border-box",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => e.target.style.borderColor = "rgba(201,168,118,0.4)"}
          onBlur={(e) => e.target.style.borderColor = "rgba(201,168,118,0.15)"}
        />
      </div>
    </div>
  );
}

function ResultCard({ label, amount, sub, dimmed, highlighted }) {
  return (
    <div style={{
      flex: 1,
      padding: "20px 16px",
      backgroundColor: highlighted ? GOLD_DIM : "rgba(255,255,255,0.02)",
      border: `1px solid ${highlighted ? "rgba(201,168,118,0.25)" : "rgba(255,255,255,0.05)"}`,
      borderRadius: 2,
      textAlign: "center",
    }}>
      <p style={{
        fontSize: 10,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: dimmed ? "rgba(244,240,231,0.4)" : GOLD,
        margin: "0 0 10px",
      }}>
        {label}
      </p>
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 30,
        fontWeight: 400,
        color: dimmed ? "rgba(244,240,231,0.5)" : CREAM,
        margin: 0,
        lineHeight: 1,
        textDecoration: dimmed ? "line-through" : "none",
        textDecorationColor: "rgba(244,240,231,0.2)",
      }}>
        {amount}
      </p>
      <p style={{
        fontSize: 11,
        color: "rgba(244,240,231,0.3)",
        margin: "6px 0 0",
      }}>
        {sub}
      </p>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "8px 0",
      fontSize: 13,
    }}>
      <span style={{ color: "rgba(244,240,231,0.45)" }}>{label}</span>
      <span style={{ color: CREAM, fontWeight: 500 }}>{value}</span>
    </div>
  );
}
