import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Folder, 
  FolderOpen, 
  FileText, 
  ChevronRight, 
  ChevronDown, 
  Lightbulb, 
  TerminalSquare, 
  Play,
  Home,
  CheckCircle2
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import puzzlesData from '../data/puzzles.json';

export default function PuzzleIDE() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState({});
  const [expandedFolders, setExpandedFolders] = useState({});
  const [selectedPuzzle, setSelectedPuzzle] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  
  const [isCompiling, setIsCompiling] = useState(false);
  const [compilationResult, setCompilationResult] = useState(null);

  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const grouped = puzzlesData.reduce((acc, puzzle) => {
      if (!acc[puzzle.category]) {
        acc[puzzle.category] = [];
      }
      acc[puzzle.category].push(puzzle);
      return acc;
    }, {});
    
    const sortedGrouped = Object.keys(grouped).sort().reduce((acc, key) => {
      acc[key] = grouped[key];
      return acc;
    }, {});
    
    setCategories(sortedGrouped);
    
    const firstCategory = Object.keys(sortedGrouped)[0];
    if (firstCategory) {
      setExpandedFolders({ [firstCategory]: true });
    }

    const saved = JSON.parse(localStorage.getItem('completedLogicPuzzles') || '[]');
    setCompleted(saved);
  }, []);

  const toggleFolder = (category) => {
    setExpandedFolders(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleSelectPuzzle = (puzzle) => {
    setSelectedPuzzle(puzzle);
    setUserAnswer('');
    setShowHint(false);
    setIsCompiling(false);
    setCompilationResult(null);
  };

  const handleShowHint = () => {
    setShowHint(true);
    setIsCompiling(false);
    setCompilationResult(null);
  };

  const handleRunSolution = () => {
    if (!userAnswer.trim()) return;
    
    setShowHint(false);
    setIsCompiling(true);
    setCompilationResult(null);
    
    setTimeout(() => {
      setIsCompiling(false);
      
      const normalizedUser = userAnswer.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
      const normalizedReal = selectedPuzzle.answer.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
      
      if (normalizedUser === normalizedReal || normalizedReal.includes(normalizedUser) || normalizedUser.includes(normalizedReal)) {
        setCompilationResult('success');
        setCompleted(prev => {
          if (!prev.includes(selectedPuzzle.id)) {
            const next = [...prev, selectedPuzzle.id];
            localStorage.setItem('completedLogicPuzzles', JSON.stringify(next));
            return next;
          }
          return prev;
        });
      } else {
        setCompilationResult('failed');
      }
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleRunSolution();
    }
  };

  return (
    <div className="ide-container">
      <div className="sidebar" style={{overflowY: 'auto'}}>
        <div className="sidebar-header" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 15px', position: 'sticky', top: 0, backgroundColor: 'var(--bg-sidebar)', zIndex: 10}}>
          <span>EXPLORER</span>
          <button onClick={() => navigate('/')} style={{background: 'none', border: 'none', color: '#569cd6', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'}}>
            <Home size={14} /> Portal
          </button>
        </div>
        <div className="explorer-content">
          {Object.entries(categories).map(([category, puzzles]) => (
            <div key={category}>
              <div 
                className="folder-item"
                onClick={() => toggleFolder(category)}
              >
                {expandedFolders[category] ? (
                  <ChevronDown size={14} className="mr-1 text-gray-400" style={{marginRight: '6px'}} />
                ) : (
                  <ChevronRight size={14} className="mr-1 text-gray-400" style={{marginRight: '6px'}} />
                )}
                <div className="folder-icon">
                  {expandedFolders[category] ? <FolderOpen size={16} /> : <Folder size={16} />}
                </div>
                <span style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{category}</span>
              </div>
              
              {expandedFolders[category] && (
                <div className="file-list">
                  {puzzles.map((puzzle, index) => (
                    <div 
                      key={puzzle.id} 
                      className={`file-item ${selectedPuzzle?.id === puzzle.id ? 'active' : ''}`}
                      onClick={() => handleSelectPuzzle(puzzle)}
                      title={puzzle.question}
                      style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '15px'}}
                    >
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        <div className="file-icon">
                          <FileText size={14} />
                        </div>
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
                          Puzzle {index + 1}.md
                        </span>
                      </div>
                      {completed.includes(puzzle.id) && <CheckCircle2 size={14} color="#4ec9b0" />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="main-area">
        {selectedPuzzle ? (
          <>
            <div className="tabs-bar">
              <div className="tab active">
                <FileText size={14} style={{marginRight: '8px', color: '#519aba'}} />
                {selectedPuzzle.category} / Puzzle {categories[selectedPuzzle.category]?.findIndex(p => p.id === selectedPuzzle.id) + 1}.md
              </div>
            </div>

            <div className="editor-content">
              <div className="question-block">
                <div style={{color: '#6a9955', marginBottom: '15px'}}>// PROBLEM STATEMENT</div>
                <ReactMarkdown>{selectedPuzzle.question}</ReactMarkdown>
              </div>

              <div className="input-section">
                <label className="input-label">Your Solution</label>
                <input 
                  type="text" 
                  className="answer-input" 
                  placeholder="Type your answer here and press Enter..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                />
              </div>

              <div className="action-buttons">
                <button className="btn btn-secondary" onClick={handleShowHint}>
                  <Lightbulb size={16} /> Hint
                </button>
                <button className="btn" onClick={handleRunSolution}>
                  <Play size={16} /> Run Solution
                </button>
              </div>
            </div>

            <div className="terminal">
              <div className="terminal-header">
                <div className="terminal-tab">
                  TERMINAL
                </div>
              </div>
              <div className="terminal-content">
                {!showHint && !compilationResult && !isCompiling && (
                  <div className="terminal-empty">No active processes. Run solution to compile.</div>
                )}
                
                {showHint && (
                  <div>
                    <div className="terminal-line">
                      <span className="terminal-prompt">user@ide:~/workspace$</span> ./hint.sh
                    </div>
                    <div className="hint-text">{selectedPuzzle.hint}</div>
                  </div>
                )}

                {(isCompiling || compilationResult) && (
                  <div>
                    <div className="terminal-line">
                      <span className="terminal-prompt">user@ide:~/workspace$</span> ./execute_solution.sh "{userAnswer}"
                    </div>
                    
                    {isCompiling ? (
                      <div className="status-info" style={{marginTop: '10px'}}>
                        [INFO] Compiling inputs...<br/>
                        [INFO] Validating logic gates...<br/>
                        <span className="blink">_</span>
                      </div>
                    ) : (
                      <div style={{marginTop: '15px'}}>
                        {compilationResult === 'success' ? (
                          <div className="status-success mb-2">[SUCCESS] Tests passed! Your logic is flawless.</div>
                        ) : (
                          <div className="status-error mb-2">[FAILED] Expected output does not match user input.</div>
                        )}
                        
                        <div className="answer-text">
                          <span style={{color: '#9cdcfe'}}>Expected Answer: </span> 
                          {selectedPuzzle.answer}
                        </div>
                        
                        <div style={{color: '#c586c0', marginTop: '15px', marginBottom: '8px'}}>Explanation trace:</div>
                        <div className="explanation-text">
                          <ReactMarkdown>{selectedPuzzle.explanation}</ReactMarkdown>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="welcome-screen">
            <div style={{textAlign: 'center'}}>
              <TerminalSquare size={48} style={{margin: '0 auto 20px', color: '#569cd6'}} />
              <div style={{fontSize: '20px', color: '#d4d4d4', marginBottom: '10px'}}>Welcome to E-Con Prep IDE</div>
              <div style={{fontSize: '14px', color: '#858585'}}>Select a puzzle from the explorer to begin debugging.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
