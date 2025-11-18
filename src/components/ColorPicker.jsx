import { useState } from "react";
import { Box, Paper, Typography, TextField, Button, Grid, Card, CardContent } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./ColorPicker.css";

export default function ColorPicker() {
  const [color, setColor] = useState("#667eea");
  const [copiedFormat, setCopiedFormat] = useState(null);

  // Convertir HEX a RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return { r: 0, g: 0, b: 0 };
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  };

  // Convertir RGB a HSL
  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s;
    const l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
        default:
          h = 0;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  // Obtener RGB
  const rgb = hexToRgb(color);
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  // Obtener HSL
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  // Copiar al portapapeles
  const copyToClipboard = (text, format) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  // Validar y actualizar color HEX
  const handleHexChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith("#")) {
      value = "#" + value;
    }
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      setColor(value);
    }
  };

  return (
    <Box sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh', pt: 15 }}>
      
      <Box className="color-picker-container">
        <Paper elevation={10} className="color-picker-paper">
          {/* Header */}
          <Box className="picker-header">
            <Typography variant="h4" className="picker-title">
              🎨 Color Picker Pro
            </Typography>
          </Box>

          {/* Preview de Color */}
          <Box className="color-preview-section">
            <Box className="color-preview" style={{ backgroundColor: color }} />
            <Typography className="color-label">{color.toUpperCase()}</Typography>
          </Box>

          {/* Input HEX */}
          <Box className="input-section">
            <TextField
            fullWidth
            label="Ingresa HEX"
            value={color}
            onChange={handleHexChange}
            placeholder="#000000"
            className="hex-input"
            inputProps={{ maxLength: 7 }}
          />
        </Box>

        {/* Slider nativo */}
        <Box className="slider-section">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="color-slider"
          />
        </Box>

        {/* Formatos de Color */}
        <Grid container spacing={2} className="formats-grid">
          {/* HEX */}
          <Grid item xs={12} sm={6} md={4}>
            <Card className="format-card hex-card">
              <CardContent className="card-content">
                <Typography className="format-label">HEX</Typography>
                <Typography className="format-value">{color.toUpperCase()}</Typography>
                <Button
                  fullWidth
                  size="small"
                  className="copy-button"
                  startIcon={
                    copiedFormat === "hex" ? <CheckCircleIcon /> : <ContentCopyIcon />
                  }
                  onClick={() => copyToClipboard(color, "hex")}
                >
                  {copiedFormat === "hex" ? "¡Copiado!" : "Copiar"}
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* RGB */}
          <Grid item xs={12} sm={6} md={4}>
            <Card className="format-card rgb-card">
              <CardContent className="card-content">
                <Typography className="format-label">RGB</Typography>
                <Typography className="format-value">{rgbString}</Typography>
                <Button
                  fullWidth
                  size="small"
                  className="copy-button"
                  startIcon={
                    copiedFormat === "rgb" ? <CheckCircleIcon /> : <ContentCopyIcon />
                  }
                  onClick={() => copyToClipboard(rgbString, "rgb")}
                >
                  {copiedFormat === "rgb" ? "¡Copiado!" : "Copiar"}
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* HSL */}
          <Grid item xs={12} sm={6} md={4}>
            <Card className="format-card hsl-card">
              <CardContent className="card-content">
                <Typography className="format-label">HSL</Typography>
                <Typography className="format-value">{hslString}</Typography>
                <Button
                  fullWidth
                  size="small"
                  className="copy-button"
                  startIcon={
                    copiedFormat === "hsl" ? <CheckCircleIcon /> : <ContentCopyIcon />
                  }
                  onClick={() => copyToClipboard(hslString, "hsl")}
                >
                  {copiedFormat === "hsl" ? "¡Copiado!" : "Copiar"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Información adicional */}
        <Box className="info-section">
          <Card className="info-card">
            <CardContent>
              <Typography className="info-title">📊 Información del Color</Typography>
              <Grid container spacing={1} className="info-grid">
                <Grid item xs={6} sm={3}>
                  <Box className="info-item">
                    <Typography className="info-label">Rojo (R)</Typography>
                    <Typography className="info-value">{rgb.r}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box className="info-item">
                    <Typography className="info-label">Verde (G)</Typography>
                    <Typography className="info-value">{rgb.g}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box className="info-item">
                    <Typography className="info-label">Azul (B)</Typography>
                    <Typography className="info-value">{rgb.b}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box className="info-item">
                    <Typography className="info-label">Matiz (H)</Typography>
                    <Typography className="info-value">{hsl.h}°</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box className="info-item">
                    <Typography className="info-label">Saturación (S)</Typography>
                    <Typography className="info-value">{hsl.s}%</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box className="info-item">
                    <Typography className="info-label">Luminosidad (L)</Typography>
                    <Typography className="info-value">{hsl.l}%</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Paper>
      </Box>
    </Box>
  );
}