 import { useState, useEffect } from 'react';

export default function IncomeTab() {
  const [currency, setCurrency] = useState('$');
  const [annual, setAnnual] = useState(60000);
  const [hoursPerWeek, setHoursPerWeek] = useState(30);
  const [weeksOff, setWeeksOff] = useState(4);
  const [tax, setTax] = useState(20);
  const [overhead, setOverhead] = useState(20);
  const [results, setResults] = useState({});

  useEffect(() => {
    const workingWeeks = 52 - weeksOff;
    const totalHrs = hoursPerWeek * workingWeeks;
    const billableHrs = Math.round(totalHrs * (1 - overhead / 100));
    const grossNeeded = annual / (1 - tax / 100);
    const minRate = grossNeeded / billableHrs;
    const realRate = minRate / (1 - overhead / 100);
    setResults({ workingWeeks, totalHrs, billableHrs, grossNeeded, minRate, realRate });
  }, [currency, annual, hoursPerWeek, weeksOff, tax, overhead]);

  const fmt = (v) => currency + Math.round(v).toLocaleString();

  return (
    <div>
      <p className="section-label">Work backwards from your goal</p>
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
          <label>Annual income goal</label>
          <div className="prefix-wrap">
            <span className="sym">{currency}</span>
            <input type="number" value={annual} onChange={e => setAnnual(+e.target.value)} min="1000" />
          </div>
        </div>
        <div className="field">
          <label>Billable hrs / week</label>
          <input type="number" value={hoursPerWeek} onChange={e => setHoursPerWeek(+e.target.value)} min="1" max="60" />
        </div>
        <div className="field">
          <label>Weeks off / year</label>
          <input type="number" value={weeksOff} onChange={e => setWeeksOff(+e.target.value)} min="0" max="20" />
        </div>
        <div className="field">
          <label>Tax rate (%)</label>
          <input type="number" value={tax} onChange={e => setTax(+e.target.value)} min="0" max="60" />
        </div>
        <div className="field">
          <label>Non-billable time (%)</label>
          <select value={overhead} onChange={e => setOverhead(+e.target.value)}>
            <option value={10}>10% — light admin</option>
            <option value={20}>20% — typical</option>
            <option value={30}>30% — heavy admin</option>
          </select>
        </div>
      </div>

      <div className="divider" />

      <div className="results">
        <div className="result-card">
          <div className="result-label">Min rate needed</div>
          <div className="result-value">{results.minRate ? fmt(results.minRate) + '/hr' : '—'}</div>
          <div className="result-sub">Before tax</div>
        </div>
        <div className="result-card">
          <div className="result-label">True rate needed</div>
          <div className="result-value green">{results.realRate ? fmt(results.realRate) + '/hr' : '—'}</div>
          <div className="result-sub">With overhead</div>
        </div>
        <div className="result-card">
          <div className="result-label">Billable hrs/yr</div>
          <div className="result-value">{results.billableHrs ? results.billableHrs.toLocaleString() : '—'}</div>
          <div className="result-sub">Working hours</div>
        </div>
      </div>

      <div className="breakdown">
        <div className="b-row"><span>Working weeks</span><span>{results.workingWeeks} weeks</span></div>
        <div className="b-row"><span>Total hours</span><span>{results.totalHrs ? Math.round(results.totalHrs).toLocaleString() : '—'} hrs</span></div>
        <div className="b-row"><span>Non-billable ({overhead}%)</span><span>− {results.totalHrs ? Math.round(results.totalHrs * overhead / 100).toLocaleString() : '—'} hrs</span></div>
        <div className="b-row"><span>Gross income needed</span><span>{results.grossNeeded ? fmt(results.grossNeeded) : '—'}</span></div>
        <div className="b-row"><span>Minimum rate to charge</span><span>{results.minRate ? fmt(results.minRate) + '/hr' : '—'}</span></div>
      </div>
    </div>
  );
}
