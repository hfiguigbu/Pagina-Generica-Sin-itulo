import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CssBaseline, Card, CardContent, Typography } from '@mui/material';
import './App.css';
import CalculateIcon from '@mui/icons-material/Calculate';
import ArticleIcon from '@mui/icons-material/Article';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import TimerIcon from '@mui/icons-material/Timer';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import PaletteIcon from '@mui/icons-material/Palette';
import ExtensionIcon from '@mui/icons-material/Extension';
import Navbar from './components/NavBar';
import HomeButton from './hooks/useHomeButton';
import Calculadora from './components/Calculadora';
import Generador from './components/Generador';
import Kanban from './components/Kanban';
import Carrera from './components/Carrera';
import JuegoCDM from './components/JuegoCDM';
import Pomodoro from './components/Pomodoro';
import ColorPicker from './components/ColorPicker';
import PersonalColor from './components/PersonalColor';
import ScratchGame from './components/ScratchGame';

export default function App() {

  const paginas = [
    { id: 1, titulo: 'Calculadora', descripcion: 'Calculadora avanzada: operaciones, punto decimal, %, soporte de teclado y memoria básica.', path: '/Calculadora', icon: <CalculateIcon className="tool-icon" /> },
    { id: 2, titulo: 'Generador de CV', descripcion: 'Crea y personaliza tu CV: secciones, exportación e impresión con estilo profesional.', path: '/generador-cv', icon: <ArticleIcon className="tool-icon" /> },
    { id: 3, titulo: 'Kanban', descripcion: 'Tablero Kanban para gestionar tareas: arrastra, crea y organiza tus proyectos.', path: '/kanban', icon: <ViewKanbanIcon className="tool-icon" /> },
    { id: 4, titulo: 'Tech Path Finder', descripcion: 'Explora rutas profesionales en tecnología según tus intereses y habilidades.', path: '/carrera', icon: <WorkOutlineIcon className="tool-icon" /> },
    { id: 5, titulo: 'Juego prime prime', descripcion: 'Juego arcade para entrenar reflejos y divertirte esquivando enemigos.', path: '/juego-cdm', icon: <SportsEsportsIcon className="tool-icon" /> },
    { id: 6, titulo: 'Pomodoro Timer', descripcion: 'Temporizador Pomodoro con notificaciones para mejorar tu productividad.', path: '/pomodoro', icon: <TimerIcon className="tool-icon" /> },
    { id: 7, titulo: 'Color Picker', descripcion: 'Herramienta para seleccionar, convertir y copiar códigos de color rápidamente.', path: '/color-picker', icon: <ColorLensIcon className="tool-icon" /> },
    { id: 8, titulo: 'Personal Color', descripcion: 'Análisis visual para detectar paletas que favorecen tu tono de piel.', path: '/personal-color', icon: <PaletteIcon className="tool-icon" /> },
    { id: 9, titulo: 'Juego Scratch', descripcion: 'Juego interactivo creado en Scratch embebido para entretenimiento rápido.', path: '/scratch-game', icon: <ExtensionIcon className="tool-icon" /> }
  ];

  return (
    <>
      <CssBaseline />
      <Navbar />
      <HomeButton />

      <Routes>
        <Route path="/" element={
          <div className="app-root">
            <Typography variant="h3" gutterBottom className="app-title">
              Multi-Herramientas
            </Typography>

            <div className="tools-grid">
              {paginas.map((pagina) => (
                <div key={pagina.id} className="tool-wrap">
                  <Card className="tool-card">
                    <Link to={pagina.path} className="tool-link">
                      <CardContent>
                        <div className="tool-header">
                          <div className="tool-icon-wrap">{pagina.icon}</div>
                          <Typography variant="h6" component="div" className="tool-title">
                            {pagina.titulo}
                          </Typography>
                        </div>
                        <Typography variant="body2" className="tool-desc">
                          {pagina.descripcion}
                        </Typography>
                      </CardContent>
                    </Link>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        } />
        <Route path="/Calculadora" element={<Calculadora/>} />
        <Route path="/generador-cv" element={<Generador />} />
        <Route path="/kanban" element={<Kanban />} />
        <Route path="/carrera" element={<Carrera />} />
        <Route path="/juego-cdm" element={<JuegoCDM />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/color-picker" element={<ColorPicker />} />
        <Route path="/personal-color" element={<PersonalColor />} />
        <Route path="/scratch-game" element={<ScratchGame />} />
      </Routes>
    </>
  );
}