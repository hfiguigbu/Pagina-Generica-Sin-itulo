import { useState, useEffect, useRef } from "react";
import { Box, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import "./JuegoCDM.css";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const PLAYER_SIZE = 20;
const GOAL_SIZE = 20;
const OBSTACLE_SIZE = 40;
const ENEMY_SIZE = 18;

export default function JuegoCDM() {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState("playing"); // playing, gameOver
  const [score, setScore] = useState(0);
  const [topScores, setTopScores] = useState([]);
  const [gameData, setGameData] = useState({
    player: { x: 50, y: 300 },
    goal: { x: 700, y: 300 },
    obstacles: [],
    enemies: [],
  });

  const keysPressed = useRef({});

  // Generar obstáculos iniciales
  const generateObstacles = (difficulty) => {
    const count = 3 + Math.floor(difficulty / 10);
    const obstacles = [];
    for (let i = 0; i < count; i++) {
      obstacles.push({
        x: Math.random() * (CANVAS_WIDTH - OBSTACLE_SIZE),
        y: Math.random() * (CANVAS_HEIGHT - OBSTACLE_SIZE),
        width: OBSTACLE_SIZE,
        height: OBSTACLE_SIZE,
      });
    }
    return obstacles;
  };

  // Generar enemigos según dificultad
  const generateEnemies = (difficulty) => {
    const count = 1 + Math.floor(difficulty / 15);
    const enemies = [];
    for (let i = 0; i < count; i++) {
      enemies.push({
        x: Math.random() * (CANVAS_WIDTH - ENEMY_SIZE),
        y: Math.random() * (CANVAS_HEIGHT - ENEMY_SIZE),
        vx: (Math.random() - 0.5) * (2 + difficulty / 20),
        vy: (Math.random() - 0.5) * (2 + difficulty / 20),
      });
    }
    return enemies;
  };

  // Detectar colisión rectángulo-rectángulo
  const checkCollision = (rect1, rect2) => {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  };

  // Cargar puntuaciones desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem("juegoScores");
    if (saved) {
      setTopScores(JSON.parse(saved).slice(0, 3));
    }
  }, []);

  // Guardar puntuación
  const saveScore = (newScore) => {
    const scores = [...topScores, newScore].sort((a, b) => b - a).slice(0, 3);
    setTopScores(scores);
    localStorage.setItem("juegoScores", JSON.stringify(scores));
  };

  // Reiniciar juego
  const restartGame = () => {
    setGameState("playing");
    setScore(0);
    setGameData({
      player: { x: 50, y: 300 },
      goal: { x: 700, y: 300 },
      obstacles: generateObstacles(0),
      enemies: generateEnemies(0),
    });
  };

  // Lógica del juego
  useEffect(() => {
    if (gameState !== "playing") return;

    const gameLoop = setInterval(() => {
      setGameData((prev) => {
        let newPlayer = { ...prev.player };

        // Movimiento del jugador
        const speed = 4;
        if (keysPressed.current["ArrowUp"] || keysPressed.current["w"]) newPlayer.y -= speed;
        if (keysPressed.current["ArrowDown"] || keysPressed.current["s"]) newPlayer.y += speed;
        if (keysPressed.current["ArrowLeft"] || keysPressed.current["a"]) newPlayer.x -= speed;
        if (keysPressed.current["ArrowRight"] || keysPressed.current["d"]) newPlayer.x += speed;

        // Límites del canvas
        newPlayer.x = Math.max(0, Math.min(CANVAS_WIDTH - PLAYER_SIZE, newPlayer.x));
        newPlayer.y = Math.max(0, Math.min(CANVAS_HEIGHT - PLAYER_SIZE, newPlayer.y));

        // Colisión con obstáculos
        for (let obs of prev.obstacles) {
          if (
            checkCollision(
              { ...newPlayer, width: PLAYER_SIZE, height: PLAYER_SIZE },
              obs
            )
          ) {
            newPlayer = { x: 50, y: 300 };
            break;
          }
        }

        // Actualizar enemigos
        let newEnemies = prev.enemies.map((enemy) => {
          let newEnemy = { ...enemy };

          // Seguir al jugador
          const dx = newPlayer.x - newEnemy.x;
          const dy = newPlayer.y - newEnemy.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0) {
            const speed = 1.5 + score / 30;
            newEnemy.vx = (dx / dist) * speed;
            newEnemy.vy = (dy / dist) * speed;
          }

          newEnemy.x += newEnemy.vx;
          newEnemy.y += newEnemy.vy;

          // Rebotar en bordes
          if (newEnemy.x <= 0 || newEnemy.x >= CANVAS_WIDTH - ENEMY_SIZE) {
            newEnemy.vx *= -1;
          }
          if (newEnemy.y <= 0 || newEnemy.y >= CANVAS_HEIGHT - ENEMY_SIZE) {
            newEnemy.vy *= -1;
          }

          return newEnemy;
        });

        // Colisión con enemigos
        for (let enemy of newEnemies) {
          if (
            checkCollision(
              { ...newPlayer, width: PLAYER_SIZE, height: PLAYER_SIZE },
              { ...enemy, width: ENEMY_SIZE, height: ENEMY_SIZE }
            )
          ) {
            setGameState("gameOver");
            saveScore(score);
            return prev;
          }
        }

        // Colisión con objetivo (meta)
        if (
          checkCollision(
            { ...newPlayer, width: PLAYER_SIZE, height: PLAYER_SIZE },
            { ...prev.goal, width: GOAL_SIZE, height: GOAL_SIZE }
          )
        ) {
          setScore((s) => s + 1);

          // Aumentar dificultad
          const newScore = score + 1;
          const newObstacles = generateObstacles(newScore);
          const newEnemies = generateEnemies(newScore);

          // Nueva posición para el objetivo
          const newGoal = {
            x: Math.random() * (CANVAS_WIDTH - GOAL_SIZE),
            y: Math.random() * (CANVAS_HEIGHT - GOAL_SIZE),
          };

          return {
            ...prev,
            player: newPlayer,
            goal: newGoal,
            obstacles: newObstacles,
            enemies: newEnemies,
          };
        }

        return {
          ...prev,
          player: newPlayer,
          enemies: newEnemies,
        };
      });
    }, 30);

    return () => clearInterval(gameLoop);
  }, [gameState, score]);

  // Detectar teclas presionadas
  useEffect(() => {
    const handleKeyDown = (e) => {
      keysPressed.current[e.key] = true;
    };

    const handleKeyUp = (e) => {
      keysPressed.current[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Dibujar en canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Fondo
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Obstáculos (negros)
    ctx.fillStyle = "#4a4a6a";
    for (let obs of gameData.obstacles) {
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      ctx.strokeStyle = "#6a6a8a";
      ctx.lineWidth = 2;
      ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
    }

    // Objetivo (azul)
    ctx.fillStyle = "#00d4ff";
    ctx.fillRect(gameData.goal.x, gameData.goal.y, GOAL_SIZE, GOAL_SIZE);
    ctx.strokeStyle = "#00ffffff";
    ctx.lineWidth = 2;
    ctx.strokeRect(gameData.goal.x, gameData.goal.y, GOAL_SIZE, GOAL_SIZE);

    // Enemigos (rojo con efecto)
    ctx.fillStyle = "#ff4757";
    for (let enemy of gameData.enemies) {
      ctx.beginPath();
      ctx.arc(enemy.x + ENEMY_SIZE / 2, enemy.y + ENEMY_SIZE / 2, ENEMY_SIZE / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ff8a94";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Jugador (verde)
    ctx.fillStyle = "#2ed573";
    ctx.fillRect(gameData.player.x, gameData.player.y, PLAYER_SIZE, PLAYER_SIZE);
    ctx.strokeStyle = "#5ff3a9";
    ctx.lineWidth = 2;
    ctx.strokeRect(gameData.player.x, gameData.player.y, PLAYER_SIZE, PLAYER_SIZE);
  }, [gameData]);

  return (
    <Box sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh', pt: 15 }}>
      
      <Box className="juego-container">
        <Box className="juego-header">
          <Typography variant="h4" className="juego-title">
            🎮 Escape Runner
          </Typography>
        </Box>

        <Box className="juego-content">
          <Box className="canvas-wrapper">
            <canvas
              ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="game-canvas"
          />
          {gameState === "gameOver" && (
            <Box className="game-over-overlay">
              <Typography variant="h3" className="game-over-text">
                ¡GAME OVER!
              </Typography>
              <Typography variant="h5" className="final-score">
                Puntuación Final: {score}
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<RestartAltIcon />}
                className="restart-button"
                onClick={restartGame}
              >
                Reiniciar
              </Button>
            </Box>
          )}
        </Box>

        <Box className="juego-info">
          <Paper className="info-panel">
            <Typography variant="h6" className="info-title">
              📋 Controles
            </Typography>
            <Typography className="info-text">
              ⬆️ WASD para mover
            </Typography>
            <Typography className="info-text">
              🟢 Tú (verde)
            </Typography>
            <Typography className="info-text">
              🔵 Meta (azul)
            </Typography>
            <Typography className="info-text">
              🔴 Enemigos (rojo)
            </Typography>
            <Typography className="info-text">
              ⬛ Obstáculos
            </Typography>
          </Paper>

          <Paper className="score-panel">
            <Typography variant="h6" className="score-panel-title">
              📊 Puntuación Actual
            </Typography>
            <Typography className="score-panel-value">
              {score}
            </Typography>
          </Paper>

          {topScores.length > 0 && (
            <TableContainer className="scores-table">
              <Typography variant="h6" className="scores-title">
                🏆 Top 3 Puntuaciones
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className="table-header">
                      Posición
                    </TableCell>
                    <TableCell align="center" className="table-header">
                      Puntuación
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topScores.map((s, idx) => (
                    <TableRow key={idx} className="table-row">
                      <TableCell align="center">#{idx + 1}</TableCell>
                      <TableCell align="center">{s}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
      </Box>
    </Box>
  );
}
