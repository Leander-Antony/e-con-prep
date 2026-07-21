import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import { Play, Code2, Lightbulb, CheckCircle2, TerminalSquare, AlertCircle, Home } from 'lucide-react';
import questionsData from '../data/questions.json';

const defaultCode = `#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}`;

export default function CodingIDE() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [code, setCode] = useState(defaultCode);
  
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [compileError, setCompileError] = useState(null);

  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    setQuestions(questionsData);
    if (questionsData.length > 0) {
      handleSelectQuestion(questionsData[0]);
    }
    const saved = JSON.parse(localStorage.getItem('completedCodingChallenges') || '[]');
    setCompleted(saved);
  }, []);

  const handleSelectQuestion = (q) => {
    setActiveQuestion(q);
    setCode(defaultCode);
    setShowHint(false);
    setShowSolution(false);
    setResults(null);
    setCompileError(null);
  };

  const handleRunCode = async () => {
    if (!activeQuestion || isRunning) return;
    
    setIsRunning(true);
    setResults(null);
    setCompileError(null);
    
    const testResults = [];
    let compilationFailed = false;

    for (let i = 0; i < activeQuestion.testCases.length; i++) {
      const tc = activeQuestion.testCases[i];
      
      try {
        const response = await axios.post('https://wandbox.org/api/compile.json', {
          compiler: 'gcc-head-c',
          code: code,
          stdin: tc.input,
          save: false
        });

        const runResult = response.data;
        
        if (runResult.status !== '0' && runResult.compiler_error) {
          setCompileError(runResult.compiler_error);
          compilationFailed = true;
          break;
        }

        if (runResult.status !== '0' && runResult.program_error) {
           setCompileError(runResult.program_error);
           compilationFailed = true;
           break;
        }

        const actualOutput = (runResult.program_output || runResult.program_message || '').trim();
        const expectedOutput = tc.expectedOutput.trim();
        const passed = actualOutput === expectedOutput;

        testResults.push({
          input: tc.input,
          expected: expectedOutput,
          actual: actualOutput,
          passed: passed
        });
        
      } catch (err) {
        setCompileError("Failed to connect to the execution server. Please try again.");
        compilationFailed = true;
        break;
      }
    }

    if (!compilationFailed) {
      setResults(testResults);
      const allPassed = testResults.every(r => r.passed);
      if (allPassed) {
        setCompleted(prev => {
          if (!prev.includes(activeQuestion.id)) {
            const next = [...prev, activeQuestion.id];
            localStorage.setItem('completedCodingChallenges', JSON.stringify(next));
            return next;
          }
          return prev;
        });
      }
    }
    
    setIsRunning(false);
  };

  return (
    <div className="ide-container">
      <div className="sidebar" style={{overflowY: 'auto'}}>
        <div className="sidebar-header" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 15px', position: 'sticky', top: 0, backgroundColor: 'var(--bg-sidebar)', zIndex: 10}}>
          <span>CODING CHALLENGES</span>
          <button onClick={() => navigate('/')} style={{background: 'none', border: 'none', color: '#569cd6', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'}}>
            <Home size={14} /> Portal
          </button>
        </div>
        <div>
          {questions.map((q, index) => (
            <div 
              key={q.id}
              className={`question-item ${activeQuestion?.id === q.id ? 'active' : ''}`}
              onClick={() => handleSelectQuestion(q)}
              style={{display: 'flex', flexDirection: 'column', gap: '4px', padding: '12px 15px', cursor: 'pointer', borderBottom: '1px solid #222'}}
            >
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span className="question-id" style={{fontSize: '11px', color: 'var(--accent)', fontWeight: 'bold'}}>Challenge {index + 1}</span>
                {completed.includes(q.id) && <CheckCircle2 size={14} color="#4ec9b0" />}
              </div>
              <span style={{fontSize: '13px', color: 'var(--text-highlight)'}}>{q.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="main-area">
        <div className="top-bar">
          <div className="file-name">
            <Code2 size={16} color="#519aba" />
            main.c
          </div>
        </div>

        <div className="editor-container" style={{display: 'flex', flex: 1, overflow: 'hidden'}}>
          {activeQuestion && (
            <div className="problem-panel" style={{width: '35%', borderRight: '1px solid var(--border-color)', padding: '25px', overflowY: 'auto', backgroundColor: '#1e1e1e', display: 'flex', flexDirection: 'column', gap: '20px'}}>
              <div>
                <h1 className="question-title" style={{fontSize: '20px', fontWeight: 600, color: '#fff', marginBottom: '5px'}}>{activeQuestion.title}</h1>
                <div className="question-desc" style={{fontSize: '14px', lineHeight: 1.6, color: '#ccc'}}>{activeQuestion.question}</div>
              </div>

              {/* Buttons removed from here to the unified action bar */}

              {showHint && (
                <div className="hint-box" style={{background: 'rgba(14, 99, 156, 0.1)', borderLeft: '3px solid var(--accent)', padding: '15px', borderRadius: '4px'}}>
                  <div style={{fontWeight: 'bold', marginBottom: '8px', color: '#4fc1ff'}}>Hint:</div>
                  <div>{activeQuestion.hint}</div>
                </div>
              )}

              {showSolution && (
                <div className="solution-box" style={{background: 'rgba(78, 201, 176, 0.1)', borderLeft: '3px solid var(--success)', padding: '15px', borderRadius: '4px'}}>
                  <div style={{fontWeight: 'bold', marginBottom: '8px', color: '#4ec9b0'}}>Correct Approach:</div>
                  <div style={{fontSize: '13px', marginBottom: '10px'}}>{activeQuestion.explanation}</div>
                  <div className="solution-code" style={{marginTop: '10px', background: '#111', padding: '10px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '13px', color: '#d4d4d4', whiteSpace: 'pre-wrap', overflowX: 'auto'}}>{activeQuestion.solution}</div>
                </div>
              )}
            </div>
          )}

          <div className="code-panel" style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
            <Editor
              height="100%"
              defaultLanguage="c"
              theme="vs-dark"
              value={code}
              onChange={(val) => setCode(val)}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "'Consolas', 'Courier New', monospace",
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                padding: { top: 20 }
              }}
            />
          </div>
        </div>

        <div className="action-bar" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 25px', backgroundColor: '#1a1a1a', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn" onClick={() => setShowHint(!showHint)} style={{backgroundColor: '#2d2d2d', border: '1px solid #3e3e42'}}>
              <Lightbulb size={14} color="#dcb67a" />
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
            <button className="btn" onClick={() => setShowSolution(!showSolution)} style={{backgroundColor: '#2d2d2d', border: '1px solid #3e3e42'}}>
              <CheckCircle2 size={14} color="#4ec9b0" />
              {showSolution ? 'Hide Solution' : 'Show Solution'}
            </button>
          </div>
          <div>
            <button className="btn btn-primary" onClick={handleRunCode} disabled={isRunning} style={{ padding: '6px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', cursor: isRunning ? 'not-allowed' : 'pointer', opacity: isRunning ? 0.7 : 1 }}>
              <Play size={14} /> 
              {isRunning ? 'Compiling & Running...' : 'Run & Submit Code'}
            </button>
          </div>
        </div>

        <div className="terminal-panel" style={{height: '30%', backgroundColor: 'var(--bg-terminal)', display: 'flex', flexDirection: 'column'}}>
          <div className="terminal-header" style={{padding: '8px 15px', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)', background: '#1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span><TerminalSquare size={14} style={{display: 'inline', marginRight: '6px', verticalAlign: 'middle'}}/> TEST RESULTS</span>
          </div>
          <div className="terminal-content" style={{padding: '15px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '13px', flex: 1}}>
            {!isRunning && !results && !compileError && (
              <div style={{color: '#858585', fontStyle: 'italic'}}>
                Waiting for execution... Press "Submit Code" to compile and run against test cases.
              </div>
            )}
            
            {isRunning && (
              <div style={{color: '#dcdcaa'}}>
                [INFO] Sending source code to Piston compiler...<br/>
                [INFO] Executing gcc main.c -o main<br/>
                [INFO] Running test cases...
              </div>
            )}

            {compileError && (
              <div>
                <div className="status-red mb-2" style={{display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--error)', fontWeight: 'bold'}}>
                  <AlertCircle size={16} /> Compilation / Runtime Error:
                </div>
                <div className="stderr-text" style={{color: 'var(--error)', whiteSpace: 'pre-wrap', marginBottom: '5px', fontFamily: 'monospace'}}>{compileError}</div>
              </div>
            )}

            {results && !compileError && (
              <div>
                <div style={{marginBottom: '15px', fontSize: '14px'}}>
                  {results.every(r => r.passed) ? (
                    <span className="status-green" style={{color: 'var(--success)', fontWeight: 'bold'}}>SUCCESS: All {results.length} test cases passed!</span>
                  ) : (
                    <span className="status-red" style={{color: 'var(--error)', fontWeight: 'bold'}}>FAILED: {results.filter(r => !r.passed).length} out of {results.length} test cases failed.</span>
                  )}
                </div>
                
                <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
                  {results.map((r, i) => (
                    <div key={i} className={`test-case ${r.passed ? 'test-case-passed' : 'test-case-failed'}`} style={{flex: '1', minWidth: '300px', marginBottom: '15px', padding: '12px', background: '#1e1e1e', border: '1px solid var(--border-color)', borderRadius: '4px', borderLeft: r.passed ? '4px solid var(--success)' : '4px solid var(--error)'}}>
                      <div className="test-case-header" style={{fontWeight: 'bold', marginBottom: '8px', display: 'flex', justifyContent: 'space-between'}}>
                        <span>Test Case {i + 1}</span>
                        {r.passed ? <span style={{color: 'var(--success)'}}>Passed</span> : <span style={{color: 'var(--error)'}}>Failed</span>}
                      </div>
                      <div className="test-case-details" style={{color: '#aaa', marginBottom: '4px'}}>Input:</div>
                      <div className="stdout-text" style={{color: '#cccccc', whiteSpace: 'pre-wrap', fontFamily: 'monospace'}}>{r.input}</div>
                      
                      <div className="test-case-details" style={{color: '#aaa', marginBottom: '4px', marginTop: '8px'}}>Expected Output:</div>
                      <div className="stdout-text" style={{color: '#dcdcaa', whiteSpace: 'pre-wrap', fontFamily: 'monospace'}}>{r.expected}</div>
                      
                      <div className="test-case-details" style={{color: '#aaa', marginBottom: '4px', marginTop: '8px'}}>Your Output:</div>
                      <div className="stdout-text" style={{color: r.passed ? 'var(--success)' : 'var(--error)', whiteSpace: 'pre-wrap', fontFamily: 'monospace'}}>
                        {r.actual || '<No Output>'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
