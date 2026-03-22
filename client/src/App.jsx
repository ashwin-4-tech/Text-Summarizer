import React, { useState } from 'react';
import axios from 'axios';

// Professional CSS-in-JS for quick implementation
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    color: '#ffffff',
    fontFamily: "'Inter', system-ui, sans-serif",
    display: 'flex',
    justifyContent: 'center',
    padding: '40px 20px',
  },
  card: {
    width: '100%',
    maxWidth: '800px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
  },
  title: {
  fontSize: '2.8rem', // Slightly larger for impact
  fontWeight: '800',
  textAlign: 'center',
  marginBottom: '10px',
  padding: '10px 0', // Adds space so the gradient doesn't clip
  lineHeight: '1.4', // Ensures the height of the line fits the text
  background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'block', // Ensures it takes up the full width for the gradient
},
  subtitle: {
    textAlign: 'center',
    color: '#94a3b8',
    marginBottom: '30px',
  },
  textarea: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '15px',
    color: '#f8fafc',
    fontSize: '1rem',
    resize: 'vertical',
    minHeight: '150px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  button: {
    width: '100%',
    marginTop: '20px',
    padding: '15px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, opacity 0.2s ease',
  },
  resultArea: {
    marginTop: '40px',
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  sentimentBadge: (type) => ({
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    backgroundColor: type === 'positive' ? '#065f46' : type === 'negative' ? '#991b1b' : '#374151',
    color: type === 'positive' ? '#34d399' : type === 'negative' ? '#f87171' : '#d1d5db',
    textTransform: 'uppercase',
  })
};

function App() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      setError('Input text is required.');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:3000/api/summarize', { text: inputText });
      setResult(response.data);
    } catch (err) {
      setError('The AI is temporarily unavailable. Check your backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Summarizer AI</h1>
        <p style={styles.subtitle}>Transform unstructured chaos into structured clarity.</p>

        <textarea
          style={styles.textarea}
          placeholder="Paste your messy text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <button 
          style={{ ...styles.button, opacity: loading ? 0.7 : 1 }} 
          onClick={handleSummarize} 
          disabled={loading}
        >
          {loading ? 'Synthesizing Knowledge...' : 'Generate Insights'}
        </button>

        {error && <p style={{ color: '#f87171', marginTop: '15px', textAlign: 'center' }}>{error}</p>}

        {result && (
          <div style={styles.resultArea}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem' }}>AI Insights</h2>
              <span style={styles.sentimentBadge(result.sentiment.toLowerCase())}>
                {result.sentiment}
              </span>
            </div>

            <h4 style={{ color: '#60a5fa', marginBottom: '8px' }}>Executive Summary</h4>
            <p style={{ lineHeight: '1.6', color: '#e2e8f0' }}>{result.summary}</p>

            <h4 style={{ color: '#60a5fa', marginTop: '20px', marginBottom: '8px' }}>Key Takeaways</h4>
            <ul style={{ paddingLeft: '20px', color: '#cbd5e1' }}>
              {result.keyPoints.map((point, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;