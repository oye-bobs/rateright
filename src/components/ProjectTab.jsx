 import { useState, useEffect } from 'react';

export default function ProjectTab() {
  const [currency, setCurrency] = useState('$');
  const [rate, setRate] = useState(50);
  const [hours, setHours] = useState(40);
  const [buffer, setBuffer] = useState(20);
  const [revisions, setRevisions] = useState(1);
  const [results, setResults] = useState({});

  useEffect(() => {
    const revHours = revisions * hours * 0.1;
    const base = rate * hours;
    const withRevisions = rate * (hours + revHours);
    const buffered = withRevisions * (1 + buffer / 100);
    const effective = buffered / (hours + revHours);
    setResults({ base, revHours, withRevisions, buffered, effective });
  }, [currency, rate, hours, buffer, revisions]);

  const fmt = (v) => currency + Math.round(v).toLocaleString();

  return (
    <div>
      <p className="section-label">Estimate your project</p>
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
          <label>Your hourly rate</label>
          <div className="prefix-wrap">
            <span className="sym">{currency}</span>
            <input type="number" value={rate} onChange={e => setRate(+e.target.value)} min="1" />
          </div>
        </div>
        <div className="field">
          <label>Estimated hours</label>
          <input type="number" value={hours} onChange={e => setHours(+e.target.value)} min="1" />
        </div>
        <div className="field">
          <label>Complexity buffer (%)</label>
          <select value={buffer} onChange={e => setBuffer(+e.target.value)}>
            <option value={0}>None (0%)</option>
            <option value={10}>Low (10%)</option>
            <option value={20}>Medium (20%)</option>
            <option value={35}>High (35%)</option>
          </select>
        </div>
        <div className="field full">
          <label>Revision rounds</label>
          <select value={revisions} onChange={e => setRevisions(+e.target.value)}>
            <option value={0}>No revisions</option>
            <option value={1}>1 round</option>
            <option value={2}>2 rounds</option>
            <option value={3}>3 rounds</option>
          </select>
        </div>
      </div>

      <div className="divider" />

      <div className="results">
        <div className="result-card">
          <div className="result-label">Base quote</div>
          <div className="result-value">{results.base ? fmt(results.base) : '—'}</div>
          <div className="result-sub">Hours × rate</div>
        </div>
        <div className="result-card">
          <div className="result-label">Recommended</div>
          <div className="result-value green">{results.buffered ? fmt(results.buffered) : '—'}</div>
          <div className="result-sub">With buffer</div>
        </div>
        <div className="result-card">
          <div className="result-label">Effective rate</div>
          <div className="result-value">{results.effective ? fmt(results.effective) + '/hr' : '—'}</div>
          <div className="result-sub">Per hour</div>
        </div>
      </div>

      <div className="breakdown">
        <div className="b-row"><span>Base ({hours}hrs × {fmt(rate)})</span><span>{results.base ? fmt(results.base) : '—'}</span></div>
        <div className="b-row"><span>Revisions ({revisions} × {Math.round(hours * 0.1)}hrs)</span><span>+ {results.revHours ? fmt(rate * results.revHours) : '—'}</span></div>
        <div className="b-row"><span>Buffer ({buffer}%)</span><span>+ {results.withRevisions ? fmt(results.withRevisions * buffer / 100) : '—'}</span></div>
        <div className="b-row"><span>Final project quote</span><span>{results.buffered ? fmt(results.buffered) : '—'}</span></div>
      </div>
    </div>
  );
}
