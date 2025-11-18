import { useState } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Grid,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

export default function Kanban() {
  const [tasks, setTasks] = useState([
    { id: 1, titulo: 'Diseñar interfaz', descripcion: 'Crear mockups en Figma', estado: 'pendiente', fecha: '2025-11-15', prioridad: 'alta' },
    { id: 2, titulo: 'Implementar autenticación', descripcion: 'Login con JWT', estado: 'en-progreso', fecha: '2025-11-14', prioridad: 'media' },
    { id: 3, titulo: 'Pruebas unitarias', descripcion: 'Escribir tests', estado: 'completado', fecha: '2025-11-10', prioridad: 'media' },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    estado: 'pendiente',
    fecha: '',
    prioridad: 'media',
  });

  const [draggedTask, setDraggedTask] = useState(null);

  // Abrir diálogo para nueva tarea
  const handleOpenDialog = () => {
    setFormData({ titulo: '', descripcion: '', estado: 'pendiente', fecha: '', prioridad: 'media' });
    setEditingId(null);
    setOpenDialog(true);
  };

  // Abrir diálogo para editar
  const handleEditTask = (task) => {
    setFormData(task);
    setEditingId(task.id);
    setOpenDialog(true);
  };

  // Guardar tarea
  const handleSaveTask = () => {
    if (!formData.titulo.trim()) return;

    if (editingId) {
      setTasks(tasks.map((t) => (t.id === editingId ? { ...formData, id: editingId } : t)));
    } else {
      setTasks([...tasks, { ...formData, id: Date.now() }]);
    }

    setOpenDialog(false);
    setFormData({ titulo: '', descripcion: '', estado: 'pendiente', fecha: '', prioridad: 'media' });
  };

  // Eliminar tarea
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Drag and Drop
  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, estado) => {
    e.preventDefault();
    if (draggedTask) {
      setTasks(
        tasks.map((t) =>
          t.id === draggedTask.id ? { ...t, estado } : t
        )
      );
      setDraggedTask(null);
    }
  };

  // Obtener tareas por estado
  const getTasksByStatus = (estado) => tasks.filter((t) => t.estado === estado);

  // Colores por prioridad
  const getPriorityColor = (prioridad) => {
    switch (prioridad) {
      case 'alta':
        return '#ff6b6b';
      case 'media':
        return '#ffa94d';
      case 'baja':
        return '#51cf66';
      default:
        return '#868e96';
    }
  };

  // Colores por estado
  const getStatusColor = (estado) => {
    switch (estado) {
      case 'pendiente':
        return '#e74c3c';
      case 'en-progreso':
        return '#f39c12';
      case 'completado':
        return '#27ae60';
      default:
        return '#95a5a6';
    }
  };

  const getStatusLabel = (estado) => {
    switch (estado) {
      case 'pendiente':
        return 'Pendiente';
      case 'en-progreso':
        return 'En Progreso';
      case 'completado':
        return 'Completado';
      default:
        return estado;
    }
  };

  const Column = ({ estado, titulo, tareas }) => (
    <Paper
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, estado)}
      sx={{
        p: 2,
        minHeight: '600px',
        bgcolor: '#f8f9fa',
        borderRadius: 2,
        border: '2px solid #dee2e6',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: getStatusColor(estado),
          boxShadow: `0 0 15px ${getStatusColor(estado)}30`,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            bgcolor: getStatusColor(estado),
          }}
        />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {titulo}
        </Typography>
        <Chip label={tareas.length} size="small" sx={{ ml: 'auto' }} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {tareas.map((tarea) => (
          <Card
            key={tarea.id}
            draggable
            onDragStart={(e) => handleDragStart(e, tarea)}
            sx={{
              cursor: 'grab',
              '&:active': { cursor: 'grabbing' },
              transition: 'all 0.2s ease',
              '&:hover': {
                boxShadow: 4,
                transform: 'translateY(-4px)',
              },
              borderLeft: `4px solid ${getPriorityColor(tarea.prioridad)}`,
              bgcolor: draggedTask?.id === tarea.id ? '#e9ecef' : '#fff',
            }}
          >
            <CardContent sx={{ pb: 1, '&:last-child': { pb: 1 } }}>
              <Box sx={{ display: 'flex', alignItems: 'start', gap: 1, mb: 1 }}>
                <DragIndicatorIcon sx={{ color: '#adb5bd', fontSize: 20, mt: 0.5 }} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, wordBreak: 'break-word' }}>
                    {tarea.titulo}
                  </Typography>
                  {tarea.descripcion && (
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5, wordBreak: 'break-word' }}>
                      {tarea.descripcion}
                    </Typography>
                  )}
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                <Chip
                  label={tarea.prioridad.charAt(0).toUpperCase() + tarea.prioridad.slice(1)}
                  size="small"
                  sx={{
                    bgcolor: getPriorityColor(tarea.prioridad),
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                  }}
                />
                {tarea.fecha && (
                  <Chip
                    label={new Date(tarea.fecha).toLocaleDateString('es-ES')}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.7rem' }}
                  />
                )}
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                <IconButton
                  size="small"
                  onClick={() => handleEditTask(tarea)}
                  sx={{ color: '#3498db' }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteTask(tarea.id)}
                  sx={{ color: '#e74c3c' }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}

        {tareas.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '200px',
              color: '#adb5bd',
            }}
          >
            <Typography variant="body2">No hay tareas</Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );

  return (
    <Box className="page-enter"
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        pt: 15,
      }}
    >

      <Container maxWidth="xl" sx={{ py: 4, pb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
              📋 Mi Kanban
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Arrastra las tareas entre columnas para cambiar su estado
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
            sx={{
              backgroundColor: '#3498db',
              fontSize: '1rem',
              px: 3,
              py: 1.5,
            }}
          >
            Nueva Tarea
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Column estado="pendiente" titulo="Pendiente" tareas={getTasksByStatus('pendiente')} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Column estado="en-progreso" titulo="En Progreso" tareas={getTasksByStatus('en-progreso')} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Column estado="completado" titulo="Completado" tareas={getTasksByStatus('completado')} />
          </Grid>
        </Grid>

        {/* Diálogo para agregar/editar tareas */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 700, fontSize: '1.5rem' }}>
            {editingId ? 'Editar Tarea' : 'Nueva Tarea'}
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              fullWidth
              label="Título"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              variant="outlined"
              autoFocus
            />
            <TextField
              fullWidth
              label="Descripción"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              variant="outlined"
              multiline
              rows={3}
            />
            <TextField
              fullWidth
              label="Fecha"
              type="date"
              value={formData.fecha}
              onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField
              fullWidth
              select
              label="Prioridad"
              value={formData.prioridad}
              onChange={(e) => setFormData({ ...formData, prioridad: e.target.value })}
              SelectProps={{
                native: true,
              }}
              variant="outlined"
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </TextField>
            <TextField
              fullWidth
              select
              label="Estado"
              value={formData.estado}
              onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
              SelectProps={{
                native: true,
              }}
              variant="outlined"
            >
              <option value="pendiente">Pendiente</option>
              <option value="en-progreso">En Progreso</option>
              <option value="completado">Completado</option>
            </TextField>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setOpenDialog(false)} sx={{ color: '#666' }}>
              Cancelar
            </Button>
            <Button
              onClick={handleSaveTask}
              variant="contained"
              sx={{ backgroundColor: '#3498db' }}
            >
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}