 import { useState, useEffect } from 'react';

export default function HourlyTab() {
  const [currency, setCurrency] = useState('$');
  const [expenses, setExpenses] = useState(1500);
  const [hours, setHours] = useState(30);
  const [tax, setTax] = useState(20);
  const [margin, setMargin] = useState(20);
  const [level, setLevel] = useState(1.4);
  const [results, setResults] = useState({});

  useEffect(() => {
    const monthlyHours = (hours * 52) / 12;
    const grossNeeded = expenses / (1 - tax / 100);
    const minRate = grossNeeded / monthlyHours;
    const idealRate = minRate * (1 + margin / 100) * level;
    const monthlyGross = idealRate * monthlyHours;
    const monthlyNet = monthlyGross * (1 - tax / 100);
    setResults({ monthlyHours, minRate, idealRate, monthlyGross, monthlyNet });
  }, [currency, expenses, hours, tax, margin, level]);

  const fmt = (v) => currency + Math.round(v).toLocaleString();

  return (
    <div>
      <p className="section-label">Your parameters</p>
      <div className="grid">
        <div className="field">
          <label>Currency</label>
          <select value={currency} onChange={e => setCurrency(e.target.value)}>
            <option value="$">USD ($)</option>
            <option value="£">GBP (£)</option>
            <option value="€">EUR (€)</option>
            <option value="₦">NGN (₦)</option>
          </select>
        </div>
        <div className="field">
          <label>Skill level</label>
          <select value={level} onChange={e => setLevel(parseFloat(e.target.value))}>
            <option value={1}>Junior (0–2 yrs)</option>
            <option value={1.4}>Mid-level (2–5 yrs)</option>
            <option value={1.9}>Senior (5+ yrs)</option>
            <option value={2.5}>Expert / Lead</option>
          </select>
        </div>
        <div className="field">
          <label>Monthly expenses</label>
          <div className="prefix-wrap">
            <span className="sym">{currency}</span>
            <input type="number" value={expenses} onChange={e => setExpenses(+e.target.value)} min="0" />
          </div>
        </div>
        <div className="field">
          <label>Billable hrs / week</label>
          <input type="number" value={hours} onChange={e => setHours(+e.target.value)} min="1" max="60" />
        </div>
        <div className="field">
          <label>Tax rate (%)</label>
          <input type="number" value={tax} onChange={e => setTax(+e.target.value)} min="0" max="60" />
        </div>
        <div className="field">
          <label>Profit margin (%)</label>
          <input type="number" value={margin} onChange={e => setMargin(+e.target.value)} min="0" max="80" />
        </div>
      </div>

      <div className="divider" />
      <p className="section-label">Your recommended rates</p>

      <div className="results">
        <div className="result-card">
          <div className="result-label">Min hourly</div>
          <div className="result-value">{results.minRate ? fmt(results.minRate) : '—'}</div>
          <div className="result-sub">Break-even</div>
        </div>
        <div className="result-card">
          <div className="result-label">Ideal hourly</div>
          <div className="result-value green">{results.idealRate ? fmt(results.idealRate) : '—'}</div>
          <div className="result-sub">With margin</div>
        </div>
        <div className="result-card">
          <div className="result-label">Monthly take-home</div>
          <div className="result-value">{results.monthlyNet ? fmt(results.monthlyNet) : '—'}</div>
          <div className="result-sub">After tax</div>
        </div>
      </div>

      <div className="breakdown">
        <div className="b-row"><span>Monthly billable hours</span><span>{Math.round(results.monthlyHours || 0)} hrs</span></div>
        <div className="b-row"><span>Monthly gross</span><span>{results.monthlyGross ? fmt(results.monthlyGross) : '—'}</span></div>
        <div className="b-row"><span>Tax deduction ({tax}%)</span><span>− {results.monthlyGross ? fmt(results.monthlyGross * tax / 100) : '—'}</span></div>
        <div className="b-row"><span>Skill multiplier</span><span>{level}×</span></div>
        <div className="b-row"><span>Monthly take-home</span><span>{results.monthlyNet ? fmt(results.monthlyNet) : '—'}</span></div>
      </div>

      {results.idealRate < 20 && (
        <div className="tip">Your rate is below market for most regions. Consider raising it or targeting higher-value clients.</div>
      )}
      {results.idealRate >= 20 && results.idealRate < 60 && (
        <div className="tip">Solid mid-market range. Position your niche clearly to justify the rate.</div>
      )}
      {results.idealRate >= 60 && (
        <div className="tip">Premium rate — make sure your portfolio and case studies reflect that value.</div>
      )}
    </div>
  );
}
