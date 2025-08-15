import React, { useState } from 'react';
import { createBaziCalculator } from '@alvamind/bazi-calculator';
import './App.css';

interface BaziResult {
  pillars: {
    year: { chinese: string; element: string; animal: string };
    month: { chinese: string; element: string; animal: string };
    day: { chinese: string; element: string; animal: string };
    time: { chinese: string; element: string; animal: string };
  };
  analysis: {
    lifeGua: number;
    dayMaster: { stem: string; nature: string; element: string };
    nobleman: string[];
    intelligence: string;
    skyHorse: string;
    peachBlossom: string;
    fiveFactors: { [key: string]: number };
    eightMansions: {
      group: string;
      lucky: { wealth: string; health: string; romance: string; career: string };
      unlucky: { obstacles: string; quarrels: string; setbacks: string; totalLoss: string };
    };
  };
}

function App() {
  const [birthDate, setBirthDate] = useState('1990-01-01');
  const [birthTime, setBirthTime] = useState('12:00');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [result, setResult] = useState<BaziResult | null>(null);
  const [error, setError] = useState<string>('');

  const calculateBazi = () => {
    try {
      setError('');
      const [year, month, day] = birthDate.split('-').map(Number);
      const [hour] = birthTime.split(':').map(Number);

      if (!year || !month || !day || !hour) {
        throw new Error('올바른 날짜와 시간을 입력해주세요.');
      }

      const calculator = createBaziCalculator(year, month, day, hour, gender);
      const pillars = calculator.calculatePillars();
      const analysis = calculator.calculateBasicAnalysis();

      setResult({
        pillars,
        analysis,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : '계산 중 오류가 발생했습니다.');
      setResult(null);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Bazi Calculator</h1>
        <p>사주 팔자 계산기</p>
      </header>

      <main className="app-main">
        <div className="input-section">
          <h2>생년월일시 입력</h2>
          
          <div className="form-group">
            <label htmlFor="birthDate">생년월일:</label>
            <input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="birthTime">생시:</label>
            <input
              id="birthTime"
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>성별:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                />
                남성
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                />
                여성
              </label>
            </div>
          </div>

          <button onClick={calculateBazi} className="calculate-btn">
            사주 계산하기
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {result && (
          <div className="result-section">
            <h2>계산 결과</h2>
            
            <div className="pillars-section">
              <h3>사주 기둥</h3>
              <div className="pillars-grid">
                <div className="pillar">
                  <span className="pillar-label">년주</span>
                  <span className="pillar-chinese">{result.pillars.year.chinese}</span>
                  <span className="pillar-element">{result.pillars.year.element}</span>
                  <span className="pillar-animal">{result.pillars.year.animal}</span>
                </div>
                <div className="pillar">
                  <span className="pillar-label">월주</span>
                  <span className="pillar-chinese">{result.pillars.month.chinese}</span>
                  <span className="pillar-element">{result.pillars.month.element}</span>
                  <span className="pillar-animal">{result.pillars.month.animal}</span>
                </div>
                <div className="pillar">
                  <span className="pillar-label">일주</span>
                  <span className="pillar-chinese">{result.pillars.day.chinese}</span>
                  <span className="pillar-element">{result.pillars.day.element}</span>
                  <span className="pillar-animal">{result.pillars.day.animal}</span>
                </div>
                <div className="pillar">
                  <span className="pillar-label">시주</span>
                  <span className="pillar-chinese">{result.pillars.time.chinese}</span>
                  <span className="pillar-element">{result.pillars.time.element}</span>
                  <span className="pillar-animal">{result.pillars.time.animal}</span>
                </div>
              </div>
            </div>

            <div className="analysis-section">
              <h3>기본 분석</h3>
              <div className="analysis-grid">
                <div className="analysis-item">
                  <span className="analysis-label">생명괘:</span>
                  <span className="analysis-value">{result.analysis.lifeGua}</span>
                </div>
                <div className="analysis-item">
                  <span className="analysis-label">일간:</span>
                  <span className="analysis-value">
                    {result.analysis.dayMaster.stem} ({result.analysis.dayMaster.nature})
                  </span>
                </div>
                <div className="analysis-item">
                  <span className="analysis-label">오행:</span>
                  <span className="analysis-value">{result.analysis.dayMaster.element}</span>
                </div>
                <div className="analysis-item">
                  <span className="analysis-label">천마:</span>
                  <span className="analysis-value">{result.analysis.skyHorse}</span>
                </div>
                <div className="analysis-item">
                  <span className="analysis-label">도화:</span>
                  <span className="analysis-value">{result.analysis.peachBlossom}</span>
                </div>
              </div>

              <div className="five-factors">
                <h4>오행 분포</h4>
                <div className="factors-grid">
                  {Object.entries(result.analysis.fiveFactors).map(([element, count]) => (
                    <div key={element} className="factor-item">
                      <span className="factor-element">{element}</span>
                      <span className="factor-count">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="eight-mansions">
                <h4>팔괘 방향</h4>
                <div className="mansion-group">
                  <span className="group-label">그룹:</span>
                  <span className="group-value">{result.analysis.eightMansions.group}</span>
                </div>
                <div className="directions">
                  <div className="lucky-directions">
                    <h5>길한 방향</h5>
                    <ul>
                      <li>재물: {result.analysis.eightMansions.lucky.wealth}</li>
                      <li>건강: {result.analysis.eightMansions.lucky.health}</li>
                      <li>연애: {result.analysis.eightMansions.lucky.romance}</li>
                      <li>직업: {result.analysis.eightMansions.lucky.career}</li>
                    </ul>
                  </div>
                  <div className="unlucky-directions">
                    <h5>피해야 할 방향</h5>
                    <ul>
                      <li>장애: {result.analysis.eightMansions.unlucky.obstacles}</li>
                      <li>구설: {result.analysis.eightMansions.unlucky.quarrels}</li>
                      <li>실패: {result.analysis.eightMansions.unlucky.setbacks}</li>
                      <li>손실: {result.analysis.eightMansions.unlucky.totalLoss}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
