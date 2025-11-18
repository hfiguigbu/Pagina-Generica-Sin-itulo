import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Grid,
  FormControl,
  FormLabel,
} from "@mui/material";
import "./PersonalColor.css";

function determineSeason({ skinTone, undertone, eyeColor, hairColor }) {
  // Simple heuristic to determine season
  // skinTone: light / medium / dark
  // undertone: warm / cool / neutral
  // eyeColor: blue_green / hazel / dark_brown
  // hairColor: light / medium / dark / red

  if (undertone === "warm") {
    if (skinTone === "light") return "Primavera cálida";
    return "Otoño cálido";
  }

  if (undertone === "cool") {
    if (skinTone === "light") return "Verano frío";
    return "Invierno frío";
  }

  // neutral: decide by contrast (light skin + dark hair => invierno (alto contraste))
  const highContrast = (skinTone === "light" && hairColor === "dark") ||
    (skinTone === "dark" && hairColor === "light");
  if (highContrast) return "Invierno frío";

  // fallback: use eye color as hint
  if (eyeColor === "blue_green") return "Verano frío";
  if (eyeColor === "dark_brown") return "Otoño cálido";
  return "Primavera cálida";
}

const PALETTES = {
  "Primavera cálida": [
    { name: "Durazno", color: "#ffcfb3" },
    { name: "Dorado", color: "#ffd700" },
    { name: "Verde oliva", color: "#808000" },
  ],
  "Verano frío": [
    { name: "Azul pastel", color: "#cfe9ff" },
    { name: "Rosa pálido", color: "#ffd6e8" },
    { name: "Lavanda", color: "#e6e6fa" },
  ],
  "Otoño cálido": [
    { name: "Marrón", color: "#8b4513" },
    { name: "Terracota", color: "#d58a66" },
    { name: "Verde musgo", color: "#556b2f" },
  ],
  "Invierno frío": [
    { name: "Negro", color: "#0b0b0b" },
    { name: "Blanco puro", color: "#ffffff" },
    { name: "Azul marino", color: "#001f3f" },
  ],
};

export default function PersonalColor() {
  const [answers, setAnswers] = useState({
    skinTone: "medium",
    undertone: "neutral",
    eyeColor: "hazel",
    hairColor: "medium",
  });

  const [result, setResult] = useState(null);

  const handleChange = (key) => (e) => {
    setAnswers((s) => ({ ...s, [key]: e.target.value }));
  };

  const handleSubmit = () => {
    const season = determineSeason(answers);
    setResult(season);
  };

  const handleReset = () => {
    setAnswers({ skinTone: "medium", undertone: "neutral", eyeColor: "hazel", hairColor: "medium" });
    setResult(null);
  };

  return (
    <Box className="pc-container">
      <Paper className="pc-paper" elevation={8}>
        <Typography variant="h4" className="pc-title">
          Análisis de Colorimetría Personal
        </Typography>

        <Typography className="pc-lead">Responde las siguientes preguntas para obtener tu estación recomendada.</Typography>

        <Grid container spacing={2} className="pc-form">
          <Grid item xs={12} md={6}>
            <FormControl component="fieldset" className="pc-field">
              <FormLabel component="legend">Tono de piel</FormLabel>
              <RadioGroup value={answers.skinTone} onChange={handleChange("skinTone")}>
                <FormControlLabel value="light" control={<Radio />} label="Claro" />
                <FormControlLabel value="medium" control={<Radio />} label="Medio" />
                <FormControlLabel value="dark" control={<Radio />} label="Oscuro" />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" className="pc-field">
              <FormLabel component="legend">Subtono</FormLabel>
              <RadioGroup value={answers.undertone} onChange={handleChange("undertone")}>
                <FormControlLabel value="warm" control={<Radio />} label="Cálido" />
                <FormControlLabel value="cool" control={<Radio />} label="Frío" />
                <FormControlLabel value="neutral" control={<Radio />} label="Neutro" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl component="fieldset" className="pc-field">
              <FormLabel component="legend">Color de ojos</FormLabel>
              <RadioGroup value={answers.eyeColor} onChange={handleChange("eyeColor")}>
                <FormControlLabel value="blue_green" control={<Radio />} label="Azules / Verdes" />
                <FormControlLabel value="hazel" control={<Radio />} label="Avellana / Café claro" />
                <FormControlLabel value="dark_brown" control={<Radio />} label="Café oscuro / Negro" />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" className="pc-field">
              <FormLabel component="legend">Color de cabello</FormLabel>
              <RadioGroup value={answers.hairColor} onChange={handleChange("hairColor")}>
                <FormControlLabel value="light" control={<Radio />} label="Rubio / Claro" />
                <FormControlLabel value="medium" control={<Radio />} label="Castaño / Medio" />
                <FormControlLabel value="dark" control={<Radio />} label="Castaño oscuro / Negro" />
                <FormControlLabel value="red" control={<Radio />} label="Pelirrojo" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} className="pc-actions">
            <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mr: 2 }}>Diagnosticar</Button>
            <Button variant="outlined" onClick={handleReset}>Reiniciar</Button>
          </Grid>
        </Grid>

        {result && (
          <Box className="pc-result">
            <Typography variant="h5">Resultado: {result}</Typography>
            <Typography className="pc-text" sx={{ mt: 1 }}>Paleta recomendada:</Typography>
            <Box className="pc-palette">
              {PALETTES[result].map((c) => (
                <Box key={c.name} className="swatch-large" title={c.name} style={{ background: c.color }}>
                  <span className="swatch-label">{c.name}</span>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
