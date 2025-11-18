import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  LinearProgress,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Carrera() {
  const navigate = useNavigate();
  const preguntas = [
    {
      id: 1,
      pregunta: '¿Cuál es tu área de interés principal?',
      opciones: [
        { texto: 'Crear interfaces visuales y aplicaciones web', valor: 'frontend', icono: '🎨' },
        { texto: 'Desarrollar servidores y bases de datos', valor: 'backend', icono: '⚙️' },
        { texto: 'Gestionar infraestructura y deployments', valor: 'devops', icono: '🔧' },
        { texto: 'Ciencia de datos y análisis', valor: 'datascience', icono: '📊' },
        { texto: 'Ciberseguridad y protección', valor: 'security', icono: '🔒' },
        { texto: 'Desarrollo de aplicaciones móviles', valor: 'mobile', icono: '📱' },
      ],
    },
    {
      id: 2,
      pregunta: '¿Cuál es tu nivel de experiencia actual?',
      opciones: [
        { texto: 'Principiante - Acabo de empezar', valor: 'principiante', icono: '🌱' },
        { texto: 'Intermedio - Tengo algunos proyectos', valor: 'intermedio', icono: '📈' },
        { texto: 'Avanzado - Experiencia profesional', valor: 'avanzado', icono: '⭐' },
      ],
    },
    {
      id: 3,
      pregunta: '¿Prefieres trabajar con...?',
      opciones: [
        { texto: 'Lenguajes dinámicos (Python, JavaScript)', valor: 'dinamico', icono: '✨' },
        { texto: 'Lenguajes estáticos (Java, C#, TypeScript)', valor: 'estatico', icono: '📦' },
        { texto: 'Lenguajes funcionales (Haskell, Erlang)', valor: 'funcional', icono: '🔗' },
      ],
    },
    {
      id: 4,
      pregunta: '¿Cuánto tiempo puedes dedicar a tu formación?',
      opciones: [
        { texto: 'Menos de 5 horas por semana', valor: 'tiempo_bajo', icono: '⏱️' },
        { texto: 'Entre 5-15 horas por semana', valor: 'tiempo_medio', icono: '⏰' },
        { texto: 'Más de 15 horas por semana', valor: 'tiempo_alto', icono: '🚀' },
      ],
    },
    {
      id: 5,
      pregunta: '¿Te interesa trabajar en...?',
      opciones: [
        { texto: 'Startups y proyectos innovadores', valor: 'startup', icono: '🚀' },
        { texto: 'Empresas grandes y consolidadas', valor: 'corporativo', icono: '🏢' },
        { texto: 'Freelance y proyectos independientes', valor: 'freelance', icono: '🎯' },
      ],
    },
  ];

  const carreras = {
    frontend: {
      titulo: 'Desarrollador Frontend',
      descripcion: 'Especialista en crear interfaces visuales y experiencias de usuario increíbles',
      icono: '🎨',
      color: '#FF6B6B',
      skills: ['HTML/CSS', 'JavaScript/TypeScript', 'React/Vue/Angular', 'UI/UX Design', 'Responsive Design'],
      herramientas: ['VS Code', 'Chrome DevTools', 'Figma', 'Git', 'Webpack'],
      salario: '3,000 - 6,000 USD/mes',
      demanda: 'Muy Alta ⭐⭐⭐⭐⭐',
      ruta: [
        'Aprende HTML/CSS y JavaScript',
        'Domina un framework (React, Vue o Angular)',
        'Aprende herramientas de diseño (Figma)',
        'Construye proyectos personales',
        'Contribuye a Open Source',
      ],
    },
    backend: {
      titulo: 'Desarrollador Backend',
      descripcion: 'Experto en crear la lógica de negocio y gestionar datos',
      icono: '⚙️',
      color: '#4ECDC4',
      skills: ['Node.js/Python/Java', 'Bases de datos', 'APIs REST/GraphQL', 'Seguridad', 'Testing'],
      herramientas: ['Postman', 'Docker', 'Git', 'SQL/MongoDB', 'Jenkins'],
      salario: '3,500 - 7,000 USD/mes',
      demanda: 'Muy Alta ⭐⭐⭐⭐⭐',
      ruta: [
        'Elige un lenguaje (Python, Node.js, Java)',
        'Aprende bases de datos (SQL y NoSQL)',
        'Domina APIs y arquitectura REST',
        'Aprende sobre seguridad y autenticación',
        'Construye aplicaciones escalables',
      ],
    },
    mobile: {
      titulo: 'Desarrollador Mobile',
      descripcion: 'Crea aplicaciones para iOS y Android que llegan a millones de usuarios',
      icono: '📱',
      color: '#95E1D3',
      skills: ['React Native/Flutter', 'Swift/Kotlin', 'Mobile UI', 'APIs', 'Performance'],
      herramientas: ['Xcode', 'Android Studio', 'React Native', 'Firebase', 'Git'],
      salario: '3,500 - 6,500 USD/mes',
      demanda: 'Alta ⭐⭐⭐⭐',
      ruta: [
        'Aprende JavaScript o Dart',
        'Elige plataforma (React Native, Flutter o Nativa)',
        'Domina el ciclo de vida de apps',
        'Aprende sobre APIs de móviles',
        'Publica tu primera app',
      ],
    },
    datascience: {
      titulo: 'Científico de Datos',
      descripcion: 'Transforma datos en decisiones inteligentes usando machine learning e IA',
      icono: '📊',
      color: '#F38181',
      skills: ['Python', 'SQL', 'Machine Learning', 'Estadística', 'Visualización'],
      herramientas: ['Jupyter', 'Pandas', 'TensorFlow', 'Tableau', 'Python'],
      salario: '4,000 - 8,000 USD/mes',
      demanda: 'Muy Alta ⭐⭐⭐⭐⭐',
      ruta: [
        'Aprende Python y estadística',
        'Domina librerías (Pandas, NumPy)',
        'Aprende Machine Learning',
        'Especialízate en Deep Learning',
        'Trabaja en proyectos de IA',
      ],
    },
    devops: {
      titulo: 'Ingeniero DevOps',
      descripcion: 'Automatiza deployments y gestiona infraestructura en la nube',
      icono: '🔧',
      color: '#AA96DA',
      skills: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'Cloud (AWS/Azure)'],
      herramientas: ['Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Terraform'],
      salario: '4,000 - 8,000 USD/mes',
      demanda: 'Muy Alta ⭐⭐⭐⭐⭐',
      ruta: [
        'Aprende Linux profundamente',
        'Domina Docker y containerización',
        'Aprende orquestación con Kubernetes',
        'Estudia CI/CD pipelines',
        'Especialízate en cloud (AWS, GCP, Azure)',
      ],
    },
    security: {
      titulo: 'Especialista en Ciberseguridad',
      descripcion: 'Protege sistemas y datos de amenazas cibernéticas',
      icono: '🔒',
      color: '#FCBAD3',
      skills: ['Hacking Ético', 'Redes', 'Criptografía', 'Análisis de malware', 'Pentesting'],
      herramientas: ['Kali Linux', 'Metasploit', 'Wireshark', 'Burp Suite', 'OWASP'],
      salario: '4,500 - 9,000 USD/mes',
      demanda: 'Crítica ⭐⭐⭐⭐⭐',
      ruta: [
        'Aprende redes y Linux',
        'Estudia criptografía y protocolos',
        'Aprende hacking ético (CEH)',
        'Practica pentesting',
        'Obtén certificaciones (CEH, OSCP)',
      ],
    },
  };

  const [respuestas, setRespuestas] = useState({});
  const [preguntaActual, setPreguntaActual] = useState(1);
  const [resultado, setResultado] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleRespuesta = (valor) => {
    setRespuestas({ ...respuestas, [preguntaActual]: valor });
  };

  const calcularCarrera = () => {
    const scores = {};
    Object.keys(carreras).forEach((carrera) => {
      scores[carrera] = 0;
    });

    // Lógica de cálculo basada en respuestas
    if (respuestas[1] === 'frontend') scores['frontend'] += 5;
    if (respuestas[1] === 'backend') scores['backend'] += 5;
    if (respuestas[1] === 'mobile') scores['mobile'] += 5;
    if (respuestas[1] === 'datascience') scores['datascience'] += 5;
    if (respuestas[1] === 'devops') scores['devops'] += 5;
    if (respuestas[1] === 'security') scores['security'] += 5;

    // Bonus por experiencia
    if (respuestas[2] === 'avanzado') {
      Object.keys(scores).forEach((k) => (scores[k] += 3));
    }

    // Bonus por lenguaje
    if (respuestas[3] === 'dinamico') {
      scores['frontend'] += 2;
      scores['datascience'] += 2;
    }
    if (respuestas[3] === 'estatico') {
      scores['backend'] += 2;
      scores['security'] += 1;
    }

    // Considerar tiempo disponible
    if (respuestas[4] === 'tiempo_alto') {
      Object.keys(scores).forEach((k) => (scores[k] += 1));
    }

    // Ordenar carreras por puntuación
    const ranking = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([carrera]) => carrera);

    setResultado(ranking);
    setOpenDialog(true);
  };

  const handleSiguiente = () => {
    if (preguntaActual < preguntas.length) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      calcularCarrera();
    }
  };

  const handleAnterior = () => {
    if (preguntaActual > 1) {
      setPreguntaActual(preguntaActual - 1);
    }
  };

  const reiniciar = () => {
    setRespuestas({});
    setPreguntaActual(1);
    setResultado(null);
    setOpenDialog(false);
  };

  const pregunta = preguntas.find((p) => p.id === preguntaActual);
  const progreso = (preguntaActual / preguntas.length) * 100;

  return (
    <Box className="page-enter"
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        pt: 15,
      }}
    >

      <Container maxWidth="md" sx={{ py: 4, pb: 4 }}>
        {!resultado ? (
          <>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: 'white' }}>
                🚀 Tech Path Finder
              </Typography>
              <Typography variant="h6" sx={{ mb: 3, color: 'rgba(255, 255, 255, 0.8)' }}>
                Descubre tu carrera tech perfecta
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progreso}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    background: '#fff',
                  },
                }}
              />
              <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255, 255, 255, 0.8)' }}>
                Pregunta {preguntaActual} de {preguntas.length}
              </Typography>
            </Box>

            {/* Pregunta */}
            <Card sx={{ mb: 4, boxShadow: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                  {pregunta.pregunta}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {pregunta.opciones.map((opcion, idx) => (
                      <Paper
                        key={idx}
                        onClick={() => handleRespuesta(opcion.valor)}
                        sx={{
                          p: 2,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          border: respuestas[preguntaActual] === opcion.valor ? '2px solid #667eea' : '2px solid #ddd',
                          backgroundColor:
                            respuestas[preguntaActual] === opcion.valor ? '#f0f4ff' : '#fff',
                          '&:hover': {
                            borderColor: '#667eea',
                            boxShadow: 2,
                            transform: 'translateX(4px)',
                          },
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Typography variant="h6">{opcion.icono}</Typography>
                          <Typography variant="body1" sx={{ flex: 1 }}>
                            {opcion.texto}
                          </Typography>
                          {respuestas[preguntaActual] === opcion.valor && (
                            <CheckCircleIcon sx={{ color: '#667eea', fontSize: 28 }} />
                          )}
                        </Box>
                      </Paper>
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Botones de navegación */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                onClick={handleAnterior}
                disabled={preguntaActual === 1}
                sx={{ px: 3 }}
              >
                Anterior
              </Button>

              <Box>
                {preguntaActual < preguntas.length ? (
                  <Button
                    variant="contained"
                    onClick={handleSiguiente}
                    disabled={!respuestas[preguntaActual]}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                      px: 4,
                    }}
                  >
                    Siguiente
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleSiguiente}
                    disabled={!respuestas[preguntaActual]}
                    sx={{
                      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                      px: 4,
                    }}
                  >
                    Ver Resultados
                  </Button>
                )}
              </Box>
            </Box>
          </>
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
              Cuestionario Completado ✅
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: 'rgba(255, 255, 255, 0.8)' }}>
              Haz clic en una carrera abajo para ver tu recomendación
            </Typography>
          </Box>
        )}

        {/* Dialog con resultados */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={{ fontSize: '1.8rem', fontWeight: 700, textAlign: 'center' }}>
            🎯 Tus Recomendaciones
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Typography variant="body1" sx={{ mb: 3, textAlign: 'center', color: '#666' }}>
              Basado en tus respuestas, aquí están las carreras más adecuadas para ti:
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {resultado && resultado.length > 0 ? resultado.map((carreraKey, idx) => {
                const carrera = carreras[carreraKey];
                return (
                  <Paper key={carreraKey}
                    sx={{
                      p: 3,
                      borderLeft: `6px solid ${carrera.color}`,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: 4,
                        transform: 'translateX(8px)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                      <Typography variant="h4">{carrera.icono}</Typography>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, color: carrera.color }}
                          >
                            #{idx + 1} - {carrera.titulo}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ mb: 2, color: '#555' }}>
                          {carrera.descripcion}
                        </Typography>

                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                            📊 Datos importantes:
                          </Typography>
                          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                            <Box>
                              <Typography variant="caption" sx={{ color: '#999' }}>
                                Salario estimado:
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {carrera.salario}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" sx={{ color: '#999' }}>
                                Demanda laboral:
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {carrera.demanda}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                            🛠️ Habilidades principales:
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {carrera.skills.map((skill, i) => (
                              <Chip key={i} label={skill} size="small" />
                            ))}
                          </Box>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                            🔨 Herramientas principales:
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {carrera.herramientas.map((herr, i) => (
                              <Chip
                                key={i}
                                label={herr}
                                size="small"
                                variant="outlined"
                              />
                            ))}
                          </Box>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                            📚 Tu ruta de aprendizaje:
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {carrera.ruta.map((paso, i) => (
                              <Box key={i} sx={{ display: 'flex', gap: 2 }}>
                                <Typography
                                  sx={{
                                    fontWeight: 700,
                                    color: carrera.color,
                                    minWidth: 24,
                                  }}
                                >
                                  {i + 1}.
                                </Typography>
                                <Typography variant="body2">{paso}</Typography>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
              );
            }) : null}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, justifyContent: 'center' }}>
          <Button
            variant="contained"
            startIcon={<RestartAltIcon />}
            onClick={reiniciar}
            sx={{
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            Hacer el cuestionario de nuevo
          </Button>
        </DialogActions>
      </Dialog>
      </Container>
    </Box>
  );
}
