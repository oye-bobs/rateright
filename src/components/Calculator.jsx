 import { useState } from 'react';
import '../styles/Calculator.css';
import HourlyTab from './HourlyTab';
import ProjectTab from './ProjectTab';
import IncomeTab from './IncomeTab';

const tabs = ['Hourly Rate', 'Project Rate', 'Target Income'];

export default function Calculator() {
  const [active, setActive] = useState(0);

  return (
    <div className="calc-card">
      <div className="brand">
        <div className="brand-logo">💸</div>
        <div>
          <div className="brand-name">RateRight</div>
          <div className="brand-sub">by Adeoye Malumi (Free App)</div>
        </div>
      </div>

      <div className="tabs">
        {tabs.map((t, i) => (
          <button key={i} className={`tab ${active === i ? 'active' : ''}`} onClick={() => setActive(i)}>
            {t}
          </button>
        ))}
      </div>

      {active === 0 && <HourlyTab />}
      {active === 1 && <ProjectTab />}
      {active === 2 && <IncomeTab />}
    </div>
  );
}
