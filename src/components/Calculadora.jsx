import { useState, useEffect } from "react";
import { Button, Grid, Paper, Typography, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Calculadora.css";

// Helper: evaluate simple arithmetic safely-ish
function evaluateExpression(expr) {
  if (!expr || typeof expr !== 'string') return '';
  // Allow only digits, operators, parentheses, dot and percent and spaces
  const safe = expr.replace(/\s+/g, '');
  if (!/^[0-9+\-*/().%]+$/.test(safe)) return 'Error';
  // Replace percentages like 50% -> (50/100)
  const withPercent = safe.replace(/(\d+\.?\d*)%/g, '($1/100)');
  try {
    // Use Function to calculate; validated input reduces injection risk
    // eslint-disable-next-line no-new-func
    const fn = new Function(`return ${withPercent}`);
    const res = fn();
    if (typeof res === 'number' && isFinite(res)) {
      return +(+res).toPrecision(12); // limit float noise
    }
    return 'Error';
  } catch {
    return 'Error';
  }
}

export default function Calculator() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState("");

  const handleClick = (value) => {
    if (value === "C") {
      setInput("");
      setHistory("");
    } else if (value === "DEL") {
      setInput(input.slice(0, -1));
    } else if (value === "=") {
      const result = evaluateExpression(input);
      if (result === 'Error') {
        setHistory('');
        setInput('Error');
      } else {
        setHistory(input + ' =');
        setInput(String(result));
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  // Keyboard support
  useEffect(() => {
    const onKey = (e) => {
      const key = e.key;
      if ((/^[0-9]$/.test(key)) || ['+', '-', '*', '/', '.', '(', ')', '%'].includes(key)) {
        setInput((p) => p + key);
      } else if (key === 'Enter') {
        e.preventDefault();
        const result = evaluateExpression(input);
        if (result === 'Error') setInput('Error'); else setInput(String(result));
      } else if (key === 'Backspace') {
        setInput((p) => p.slice(0, -1));
      } else if (key === 'Escape') {
        setInput('');
        setHistory('');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [input]);

  const buttons = [
    { label: "7", type: "number" },
    { label: "8", type: "number" },
    { label: "9", type: "number" },
    { label: "/", type: "operator" },
    { label: "4", type: "number" },
    { label: "5", type: "number" },
    { label: "6", type: "number" },
    { label: "*", type: "operator" },
    { label: "1", type: "number" },
    { label: "2", type: "number" },
    { label: "3", type: "number" },
    { label: "-", type: "operator" },
    { label: "0", type: "number" },
    { label: ".", type: "number" },
    { label: "DEL", type: "delete" },
    { label: "+", type: "operator" },
    { label: "=", type: "equals" },
    { label: "C", type: "clear" },
  ];

  return (
    <Box sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh', pt: 15 }}>
      
      <Box className="calculator-container" sx={{ pt: 0 }}>
        <Paper elevation={10} className="calculator-paper">
          <Box className="calculator-header">
            <Typography variant="h4" className="calculator-title">
              Calculadora
            </Typography>
          </Box>

          <Box className="calculator-display">
            {history && <Typography className="history-text">{history}</Typography>}
            <Typography className="result-text">{input || "0"}</Typography>
          </Box>

          <Grid container spacing={0.8} sx={{ p: 2.5 }}>
            {buttons.map((btn) => (
              <Grid item xs={btn.label === "=" ? 6 : btn.label === "C" ? 6 : 3} key={btn.label}>
                <Button fullWidth className={`btn btn-${btn.type}`} onClick={() => handleClick(btn.label)}>
                  {btn.label === "DEL" ? <DeleteIcon /> : btn.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}