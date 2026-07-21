import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Code2, CheckCircle2 } from 'lucide-react';
import puzzlesData from '../data/puzzles.json';
import questionsData from '../data/questions.json';

export default function Landing() {
  const navigate = useNavigate();
  
  const [logicCompleted, setLogicCompleted] = useState(0);
  const [codingCompleted, setCodingCompleted] = useState(0);

  useEffect(() => {
    const logicProgress = JSON.parse(localStorage.getItem('completedLogicPuzzles') || '[]');
    const codingProgress = JSON.parse(localStorage.getItem('completedCodingChallenges') || '[]');
    setLogicCompleted(logicProgress.length);
    setCodingCompleted(codingProgress.length);
  }, []);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
      height: '100vh', backgroundColor: '#1e1e1e', color: '#fff', padding: '20px'
    }}>
      <h1 style={{fontSize: '3rem', marginBottom: '10px', color: '#569cd6'}}>EconPrep Portal</h1>
      <p style={{fontSize: '1.2rem', color: '#858585', marginBottom: '40px'}}>Select a module to continue your preparation.</p>
      
      <div style={{display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center'}}>
        
        {/* Logic Puzzles Card */}
        <div 
          onClick={() => navigate('/logic')}
          style={{
            backgroundColor: '#252526', border: '1px solid #333', borderRadius: '8px', padding: '40px',
            width: '350px', cursor: 'pointer', transition: 'transform 0.2s, borderColor 0.2s',
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
          }}
          onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = '#4ec9b0'; }}
          onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#333'; }}
        >
          <Brain size={64} color="#4ec9b0" style={{marginBottom: '20px'}} />
          <h2 style={{fontSize: '1.8rem', marginBottom: '15px'}}>Logic & Aptitude</h2>
          <p style={{color: '#aaa', marginBottom: '25px', lineHeight: '1.5'}}>
            Master your problem-solving skills with classic analytical puzzles and brain teasers.
          </p>
          <div style={{marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: '#4ec9b0'}}>
            <CheckCircle2 size={18} />
            <span style={{fontWeight: 'bold'}}>{logicCompleted} / {puzzlesData.length} Completed</span>
          </div>
        </div>

        {/* Coding Challenges Card */}
        <div 
          onClick={() => navigate('/coding')}
          style={{
            backgroundColor: '#252526', border: '1px solid #333', borderRadius: '8px', padding: '40px',
            width: '350px', cursor: 'pointer', transition: 'transform 0.2s, borderColor 0.2s',
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
          }}
          onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = '#519aba'; }}
          onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#333'; }}
        >
          <Code2 size={64} color="#519aba" style={{marginBottom: '20px'}} />
          <h2 style={{fontSize: '1.8rem', marginBottom: '15px'}}>Coding Challenges</h2>
          <p style={{color: '#aaa', marginBottom: '25px', lineHeight: '1.5'}}>
            Practice standard data structures and algorithmic challenges using a real C compiler.
          </p>
          <div style={{marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: '#519aba'}}>
            <CheckCircle2 size={18} />
            <span style={{fontWeight: 'bold'}}>{codingCompleted} / {questionsData.length} Completed</span>
          </div>
        </div>

      </div>
    </div>
  );
}
