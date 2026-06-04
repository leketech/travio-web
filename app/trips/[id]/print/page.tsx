import type { Metadata } from 'next'
import { mockBangkokResult } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import PrintTrigger from './PrintTrigger'

export const metadata: Metadata = {
  title: 'Export Budget Plan — Travio',
}

async function getTripResult(_id: string) {
  return mockBangkokResult
}

export default async function PrintPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const result = await getTripResult(id)
  const totalAllocated = result.categories.reduce((s, c) => s + c.amount, 0)
  const generatedDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      <PrintTrigger />

      <div className="print-root">
        {/* ── Header ── */}
        <header className="print-header">
          <div className="print-logo">
            <div className="print-logo-icon">✈</div>
            <span className="print-logo-name">Travio</span>
          </div>
          <div className="print-header-meta">
            <div className="print-tagline">Know before you go.</div>
            <div className="print-date">Generated {generatedDate}</div>
          </div>
        </header>

        {/* ── Trip summary banner ── */}
        <div className="print-banner">
          <div className="print-banner-main">
            <div className="print-destination">
              {result.flag} {result.destination}, {result.country}
            </div>
            <div className="print-trip-meta">
              {result.days} days · {result.travelers} traveler{result.travelers > 1 ? 's' : ''} · {result.style} style
            </div>
          </div>
          <div className="print-verdict-box">
            <div
              className="print-verdict-label"
              data-verdict={result.verdict}
            >
              {result.verdict === 'yes' ? '✓ CAN AFFORD' : result.verdict === 'maybe' ? '⚡ POSSIBLE' : '✗ OVER BUDGET'}
            </div>
            <div className="print-verdict-budget">
              {formatCurrency(result.totalBudget, result.currency)} total budget
            </div>
          </div>
        </div>

        {/* ── Key numbers ── */}
        <div className="print-stats-row">
          <div className="print-stat">
            <div className="print-stat-value">{formatCurrency(result.dailyBudget, result.currency)}</div>
            <div className="print-stat-label">Daily budget</div>
          </div>
          <div className="print-stat">
            <div className="print-stat-value">{result.days}</div>
            <div className="print-stat-label">Trip duration</div>
          </div>
          <div className="print-stat">
            <div className="print-stat-value">{formatCurrency(result.remainingBuffer, result.currency)}</div>
            <div className="print-stat-label">Remaining buffer</div>
          </div>
          <div className="print-stat">
            <div className="print-stat-value">{formatCurrency(totalAllocated, result.currency)}</div>
            <div className="print-stat-label">Total allocated</div>
          </div>
        </div>

        {/* ── Budget breakdown table ── */}
        <section className="print-section">
          <h2 className="print-section-title">Budget Breakdown</h2>
          <table className="print-table">
            <thead>
              <tr>
                <th>Category</th>
                <th className="text-right">Amount</th>
                <th className="text-right">% of Budget</th>
                <th className="text-right">Daily</th>
                <th>Allocation</th>
              </tr>
            </thead>
            <tbody>
              {result.categories.map((cat) => (
                <tr key={cat.id}>
                  <td>
                    <span className="print-cat-emoji">{cat.emoji}</span>
                    {cat.label}
                  </td>
                  <td className="text-right print-amount">
                    {formatCurrency(cat.amount, result.currency)}
                  </td>
                  <td className="text-right print-pct">{cat.percentage}%</td>
                  <td className="text-right print-daily">
                    {formatCurrency(Math.round(cat.amount / result.days), result.currency)}
                  </td>
                  <td>
                    <div className="print-bar-track">
                      <div
                        className="print-bar-fill"
                        style={{ width: `${cat.percentage}%`, background: cat.color }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="print-table-total">
                <td><strong>Total</strong></td>
                <td className="text-right">
                  <strong>{formatCurrency(totalAllocated, result.currency)}</strong>
                </td>
                <td className="text-right">
                  <strong>{Math.round((totalAllocated / result.totalBudget) * 100)}%</strong>
                </td>
                <td colSpan={2} />
              </tr>
            </tfoot>
          </table>
        </section>

        {/* ── Tips ── */}
        {result.tips.length > 0 && (
          <section className="print-section print-two-col">
            <div>
              <h2 className="print-section-title">Local Money Tips</h2>
              <ul className="print-tips-list">
                {result.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="print-section-title">Best Neighborhoods</h2>
              <ul className="print-neighborhoods-list">
                {result.neighborhoods.map((n, i) => (
                  <li key={i}>
                    <span className="print-neighborhood-num">{i + 1}</span>
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ── Verdict message ── */}
        <div className="print-verdict-message">
          <strong>AI Summary:</strong> {result.verdictMessage}
        </div>

        {/* ── Footer ── */}
        <footer className="print-footer">
          <div>Generated by <strong>Travio</strong> · travio.app</div>
          <div>Budget plan for personal use · Prices are estimates based on real destination data</div>
        </footer>
      </div>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Geist', 'Inter', system-ui, -apple-system, sans-serif;
          background: #fff;
          color: #181C16;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .print-root {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 48px;
        }

        /* Header */
        .print-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
          padding-bottom: 16px;
          border-bottom: 2px solid #1F5641;
        }
        .print-logo {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .print-logo-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: #1F5641;
          color: #FAF6EC;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
        }
        .print-logo-name {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #0E2A1F;
        }
        .print-header-meta { text-align: right; }
        .print-tagline { font-size: 12px; color: #6C7064; }
        .print-date { font-size: 12px; color: #6C7064; margin-top: 2px; }

        /* Banner */
        .print-banner {
          background: #143A2C;
          border-radius: 16px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 20px;
        }
        .print-destination {
          font-size: 26px;
          font-weight: 700;
          color: #FAF6EC;
          letter-spacing: -0.02em;
        }
        .print-trip-meta { font-size: 13px; color: #94B89F; margin-top: 4px; }
        .print-verdict-box { text-align: right; }
        .print-verdict-label {
          font-size: 18px;
          font-weight: 800;
          padding: 8px 14px;
          border-radius: 10px;
        }
        .print-verdict-label[data-verdict="yes"] { background: #D6E4D5; color: #1F5641; }
        .print-verdict-label[data-verdict="maybe"] { background: #F0E1B2; color: #C29A3D; }
        .print-verdict-label[data-verdict="no"] { background: #F9E0DF; color: #B85148; }
        .print-verdict-budget { font-size: 12px; color: #94B89F; margin-top: 6px; }

        /* Stats row */
        .print-stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 28px;
        }
        .print-stat {
          background: #F2EBD8;
          border-radius: 12px;
          padding: 14px 16px;
          text-align: center;
        }
        .print-stat-value {
          font-size: 20px;
          font-weight: 700;
          color: #0E2A1F;
          letter-spacing: -0.02em;
        }
        .print-stat-label { font-size: 11px; color: #6C7064; margin-top: 3px; text-transform: uppercase; letter-spacing: 0.08em; }

        /* Sections */
        .print-section { margin-bottom: 24px; }
        .print-section-title {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #6C7064;
          margin-bottom: 12px;
        }

        /* Table */
        .print-table { width: 100%; border-collapse: collapse; }
        .print-table th {
          font-size: 11px;
          font-weight: 600;
          color: #6C7064;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 8px 10px;
          border-bottom: 2px solid #E5DFCC;
          text-align: left;
        }
        .print-table td {
          padding: 10px 10px;
          border-bottom: 1px solid #F2EBD8;
          font-size: 14px;
          color: #181C16;
          vertical-align: middle;
        }
        .print-table tr:last-child td { border-bottom: none; }
        .print-table-total td {
          border-top: 2px solid #E5DFCC;
          border-bottom: none;
          font-size: 14px;
          padding-top: 12px;
        }
        .text-right { text-align: right; }
        .print-cat-emoji { margin-right: 8px; }
        .print-amount { font-weight: 600; font-variant-numeric: tabular-nums; }
        .print-pct { color: #6C7064; }
        .print-daily { color: #6C7064; font-size: 13px; }

        .print-bar-track {
          height: 8px; background: #E8E0CB; border-radius: 9999px; overflow: hidden; min-width: 80px;
        }
        .print-bar-fill { height: 100%; border-radius: 9999px; }

        /* Two-col tips */
        .print-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .print-tips-list { list-style: none; padding: 0; }
        .print-tips-list li {
          font-size: 13px; color: #2B2F26; line-height: 1.5;
          padding: 6px 0; border-bottom: 1px solid #F2EBD8;
          padding-left: 14px; position: relative;
        }
        .print-tips-list li::before { content: "→"; position: absolute; left: 0; color: #2E6F55; }

        .print-neighborhoods-list { list-style: none; padding: 0; }
        .print-neighborhoods-list li {
          font-size: 13px; color: #2B2F26;
          padding: 6px 0; border-bottom: 1px solid #F2EBD8;
          display: flex; align-items: center; gap: 10px;
        }
        .print-neighborhood-num {
          width: 22px; height: 22px; border-radius: 9999px;
          background: #D6E4D5; color: #1F5641;
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; flex-shrink: 0;
        }

        /* Verdict message */
        .print-verdict-message {
          background: #ECF1E2;
          border-left: 3px solid #1F5641;
          border-radius: 0 8px 8px 0;
          padding: 12px 16px;
          font-size: 13px;
          color: #143A2C;
          line-height: 1.5;
          margin-bottom: 24px;
        }

        /* Footer */
        .print-footer {
          border-top: 1px solid #E5DFCC;
          padding-top: 14px;
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: #A8AB9D;
          gap: 8px;
          flex-wrap: wrap;
        }

        /* Screen-only controls */
        .screen-only {
          position: fixed; top: 20px; right: 20px;
          display: flex; gap: 10px; z-index: 100;
        }
        .btn-back, .btn-print {
          padding: 10px 18px; border-radius: 9999px;
          font-size: 14px; font-weight: 600; cursor: pointer;
          border: none; text-decoration: none;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .btn-back {
          background: #fff; color: #181C16;
          border: 1px solid #E5DFCC; box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .btn-print { background: #1F5641; color: #FAF6EC; }

        @media print {
          .screen-only { display: none !important; }
          .print-root { padding: 24px; max-width: 100%; }
          body { background: #fff; }
        }
      `}</style>
    </>
  )
}
