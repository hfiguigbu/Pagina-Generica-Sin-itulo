import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Paper,
  Grid,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function Pomodoro() {
  const TRABAJO = 25 * 60; // 25 minutos en segundos
  const DESCANSO = 5 * 60; // 5 minutos en segundos
  const DESCANSO_LARGO = 15 * 60; // 15 minutos descanso largo

  const [tiempoRestante, setTiempoRestante] = useState(TRABAJO);
  const [enPausa, setEnPausa] = useState(false);
  const [enDescanso, setEnDescanso] = useState(false);
  const [sesionesCompletadas, setSesionesCompletadas] = useState(0);
  const [corriendo, setCorriendo] = useState(false);

  // Efecto para el timer
  useEffect(() => {
    let intervalo;

    if (corriendo && tiempoRestante > 0) {
      intervalo = setInterval(() => {
        setTiempoRestante((prev) => prev - 1);
      }, 1000);
    } else if (tiempoRestante === 0 && corriendo) {
      // Cambiar entre trabajo y descanso
      if (!enDescanso) {
        const nuevasSesiones = sesionesCompletadas + 1;
        setSesionesCompletadas(nuevasSesiones);
        setEnDescanso(true);
        // Descanso largo cada 4 sesiones (pero no en el primero)
        setTiempoRestante(nuevasSesiones > 0 && nuevasSesiones % 4 === 0 ? DESCANSO_LARGO : DESCANSO);
      } else {
        setEnDescanso(false);
        setTiempoRestante(TRABAJO);
      }
      // Reproducir sonido
      reproducirSonido();
    }

    return () => clearInterval(intervalo);
  }, [corriendo, tiempoRestante, enDescanso, sesionesCompletadas]);

  // Función para reproducir sonido
  const reproducirSonido = () => {
    const audio = new Audio(
      'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj=='
    );
    audio.play().catch(() => {});
  };

  const formatearTiempo = (segundos) => {
    const mins = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${mins.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
  };

  const handlePausar = () => {
    setEnPausa(!enPausa);
    setCorriendo(!corriendo);
  };

  const handleIniciar = () => {
    setCorriendo(!corriendo);
  };

  const handleReiniciar = () => {
    setCorriendo(false);
    setEnPausa(false);
    setEnDescanso(false);
    setTiempoRestante(TRABAJO);
  };

  const handleSiguiente = () => {
    if (!enDescanso) {
      const nuevasSesiones = sesionesCompletadas + 1;
      setSesionesCompletadas(nuevasSesiones);
      setEnDescanso(true);
      setTiempoRestante(nuevasSesiones > 0 && nuevasSesiones % 4 === 0 ? DESCANSO_LARGO : DESCANSO);
    } else {
      setEnDescanso(false);
      setTiempoRestante(TRABAJO);
    }
    setCorriendo(false);
    setEnPausa(false);
  };

  const progreso = enDescanso
    ? ((DESCANSO - tiempoRestante) / DESCANSO) * 100
    : ((TRABAJO - tiempoRestante) / TRABAJO) * 100;

  const colorFondo = enDescanso ? '#10b981' : '#ef4444';
  const colorFondoHover = enDescanso ? '#059669' : '#dc2626';
  const etiqueta = enDescanso ? '☕ Descanso' : '💪 Trabaja';

  return (
    <Box className="page-enter"
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        pt: 15,
      }}
    >

      <Container maxWidth="sm" sx={{ py: 4, pb: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          {/* Header */}
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
            🍅 Pomodoro Timer
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.8)' }}>
            Técnica Pomodoro: 25 min trabajo + 5 min descanso
          </Typography>

          {/* Card Principal */}
          <Card
            sx={{
              background: `linear-gradient(135deg, ${colorFondo}20 0%, ${colorFondo}40 100%)`,
              border: `3px solid ${colorFondo}`,
              mb: 3,
              boxShadow: `0 0 30px ${colorFondo}40`,
            }}
          >
            <CardContent sx={{ p: 4 }}>
            {/* Etiqueta de estado */}
            <Chip
              label={etiqueta}
              sx={{
                mb: 3,
                backgroundColor: colorFondo,
                color: '#fff',
                fontWeight: 700,
                fontSize: '1rem',
                height: 40,
              }}
            />

            {/* Timer grande */}
            <Box
              sx={{
                mb: 3,
                p: 3,
                backgroundColor: '#fff',
                borderRadius: 3,
                boxShadow: 2,
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: '4rem', sm: '5rem' },
                  color: colorFondo,
                  fontFamily: 'monospace',
                  letterSpacing: 2,
                }}
              >
                {formatearTiempo(tiempoRestante)}
              </Typography>
            </Box>

            {/* Barra de progreso */}
            <LinearProgress
              variant="determinate"
              value={progreso}
              sx={{
                height: 12,
                borderRadius: 6,
                backgroundColor: '#e5e7eb',
                mb: 3,
                '& .MuiLinearProgress-bar': {
                  borderRadius: 6,
                  backgroundColor: colorFondo,
                },
              }}
            />

            {/* Sesiones completadas */}
            <Box sx={{ mb: 3, p: 2, backgroundColor: '#f3f4f6', borderRadius: 2 }}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Sesiones completadas
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                {Array.from({ length: sesionesCompletadas }).map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      backgroundColor: '#ef4444',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: 700,
                    }}
                  >
                    🍅
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Botones de control */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleIniciar}
                  startIcon={corriendo ? <PauseIcon /> : <PlayArrowIcon />}
                  sx={{
                    backgroundColor: colorFondo,
                    py: 2,
                    fontSize: '1rem',
                    fontWeight: 700,
                    '&:hover': {
                      backgroundColor: colorFondoHover,
                    },
                  }}
                >
                  {corriendo ? 'Pausar' : 'Iniciar'}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleReiniciar}
                  startIcon={<RestartAltIcon />}
                  sx={{
                    borderColor: colorFondo,
                    color: colorFondo,
                    py: 2,
                    fontSize: '1rem',
                    fontWeight: 700,
                    '&:hover': {
                      borderColor: colorFondoHover,
                      backgroundColor: `${colorFondo}10`,
                    },
                  }}
                >
                  Reiniciar
                </Button>
              </Grid>
            </Grid>

            {/* Botón Siguiente */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleSiguiente}
              startIcon={<SkipNextIcon />}
              sx={{
                backgroundColor: '#6366f1',
                py: 1.5,
                fontWeight: 700,
                '&:hover': {
                  backgroundColor: '#4f46e5',
                },
              }}
            >
              {enDescanso ? 'Siguiente Sesión' : 'Pasar a Descanso'}
            </Button>
          </CardContent>
        </Card>

        {/* Información */}
        <Paper sx={{ p: 3, backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#ef4444' }}>
                  💪 25 min
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Trabajo
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#10b981' }}>
                  ☕ 5 min
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Descanso
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#8b5cf6' }}>
                  🌟 15 min
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Descanso largo
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Typography
            variant="body2"
            sx={{ mt: 2, color: '#6b7280', lineHeight: 1.6, textAlign: 'left' }}
          >
            💡 <strong>Cómo funciona:</strong> Trabaja durante 25 minutos, descansa 5 minutos.
            Cada 4 sesiones completadas obtienes un descanso más largo de 15 minutos.
          </Typography>
        </Paper>
        </Box>
      </Container>
    </Box>
  );
}
