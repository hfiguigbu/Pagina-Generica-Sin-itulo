import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Divider,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';

export default function Generador() {

  const [cv, setCv] = useState({
    nombre: '',
    email: '',
    telefono: '',
    ubicacion: '',
    resumen: '',
  });

  const [experiencias, setExperiencias] = useState([]);
  const [educacion, setEducacion] = useState([]);
  const [habilidades, setHabilidades] = useState([]);

  const [nuevoExperiencia, setNuevoExperiencia] = useState({
    puesto: '',
    empresa: '',
    fechaInicio: '',
    fechaFin: '',
    descripcion: '',
  });

  const [nuevoEducacion, setNuevoEducacion] = useState({
    titulo: '',
    institucion: '',
    fechaGraduacion: '',
    descripcion: '',
  });

  const [nuevoHabilidad, setNuevoHabilidad] = useState('');

  // Funciones para actualizar datos personales
  const handleCvChange = (e) => {
    const { name, value } = e.target;
    setCv({ ...cv, [name]: value });
  };

  // Funciones para experiencias
  const handleExperienciaChange = (e) => {
    const { name, value } = e.target;
    setNuevoExperiencia({ ...nuevoExperiencia, [name]: value });
  };

  const agregarExperiencia = () => {
    if (nuevoExperiencia.puesto && nuevoExperiencia.empresa) {
      setExperiencias([...experiencias, { ...nuevoExperiencia, id: Date.now() }]);
      setNuevoExperiencia({
        puesto: '',
        empresa: '',
        fechaInicio: '',
        fechaFin: '',
        descripcion: '',
      });
    }
  };

  const eliminarExperiencia = (id) => {
    setExperiencias(experiencias.filter((exp) => exp.id !== id));
  };

  // Funciones para educación
  const handleEducacionChange = (e) => {
    const { name, value } = e.target;
    setNuevoEducacion({ ...nuevoEducacion, [name]: value });
  };

  const agregarEducacion = () => {
    if (nuevoEducacion.titulo && nuevoEducacion.institucion) {
      setEducacion([...educacion, { ...nuevoEducacion, id: Date.now() }]);
      setNuevoEducacion({
        titulo: '',
        institucion: '',
        fechaGraduacion: '',
        descripcion: '',
      });
    }
  };

  const eliminarEducacion = (id) => {
    setEducacion(educacion.filter((edu) => edu.id !== id));
  };

  // Funciones para habilidades
  const agregarHabilidad = () => {
    if (nuevoHabilidad.trim()) {
      setHabilidades([...habilidades, { id: Date.now(), nombre: nuevoHabilidad }]);
      setNuevoHabilidad('');
    }
  };

  const eliminarHabilidad = (id) => {
    setHabilidades(habilidades.filter((hab) => hab.id !== id));
  };

  // Función para descargar CV como PDF
  const descargarPDF = () => {
    const elemento = document.getElementById('cv-preview');
    const contenido = elemento.innerHTML;
    const ventana = window.open('', '', 'width=800,height=600');
    ventana.document.write(contenido);
    ventana.document.close();
    ventana.print();
  };

  return (
    <Box className="generador-page page-enter">

      <Container maxWidth="lg" className="generador-container">
        <Typography variant="h3" gutterBottom className="generador-title">
          ✨ Generador de CV
        </Typography>

        <Grid container spacing={3}>
          {/* FORMULARIO */}
          <Grid item xs={12} md={6}>
            <Card className="generador-card">
              <CardContent>
                <Typography variant="h5" gutterBottom className="section-title">
                  Información Personal
                </Typography>
                <Box className="form-column">
                  <TextField
                    fullWidth
                    label="Nombre Completo"
                    name="nombre"
                    value={cv.nombre}
                    onChange={handleCvChange}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={cv.email}
                    onChange={handleCvChange}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Teléfono"
                    name="telefono"
                    value={cv.telefono}
                    onChange={handleCvChange}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Ubicación"
                    name="ubicacion"
                    value={cv.ubicacion}
                    onChange={handleCvChange}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Resumen Profesional"
                    name="resumen"
                    value={cv.resumen}
                    onChange={handleCvChange}
                    variant="outlined"
                    multiline
                    rows={4}
                  />
                </Box>

                <Divider className="divider" />

                <Typography variant="h5" gutterBottom className="section-title">
                  Experiencia Laboral
                </Typography>
                <Box className="form-column">
                  <TextField
                    fullWidth
                    label="Puesto"
                    name="puesto"
                    value={nuevoExperiencia.puesto}
                    onChange={handleExperienciaChange}
                    size="small"
                  />
                  <TextField
                    fullWidth
                    label="Empresa"
                    name="empresa"
                    value={nuevoExperiencia.empresa}
                    onChange={handleExperienciaChange}
                    size="small"
                  />
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                    <TextField
                      fullWidth
                      label="Fecha Inicio"
                      name="fechaInicio"
                      type="date"
                      value={nuevoExperiencia.fechaInicio}
                      onChange={handleExperienciaChange}
                      InputLabelProps={{ shrink: true }}
                      size="small"
                    />
                    <TextField
                      fullWidth
                      label="Fecha Fin"
                      name="fechaFin"
                      type="date"
                      value={nuevoExperiencia.fechaFin}
                      onChange={handleExperienciaChange}
                      InputLabelProps={{ shrink: true }}
                      size="small"
                    />
                  </Box>
                  <TextField
                    fullWidth
                    label="Descripción"
                    name="descripcion"
                    value={nuevoExperiencia.descripcion}
                    onChange={handleExperienciaChange}
                    multiline
                    rows={2}
                    size="small"
                  />
                  <Button variant="contained" startIcon={<AddIcon />} onClick={agregarExperiencia} className="btn-primary">
                    Agregar Experiencia
                  </Button>
                </Box>

                {experiencias.map((exp) => (
                  <Paper key={exp.id} className="list-item">
                    <Box className="list-item-row">
                      <Box>
                        <Typography variant="body1" className="list-item-title">
                          {exp.puesto}
                        </Typography>
                        <Typography variant="body2" className="list-item-sub">
                          {exp.empresa}
                        </Typography>
                        <Typography variant="caption" className="list-item-sub">
                          {exp.fechaInicio} - {exp.fechaFin}
                        </Typography>
                      </Box>
                      <IconButton size="small" onClick={() => eliminarExperiencia(exp.id)} className="btn-delete">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Paper>
                ))}

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Educación
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Título"
                    name="titulo"
                    value={nuevoEducacion.titulo}
                    onChange={handleEducacionChange}
                    size="small"
                  />
                  <TextField
                    fullWidth
                    label="Institución"
                    name="institucion"
                    value={nuevoEducacion.institucion}
                    onChange={handleEducacionChange}
                    size="small"
                  />
                  <TextField
                    fullWidth
                    label="Fecha de Graduación"
                    name="fechaGraduacion"
                    type="date"
                    value={nuevoEducacion.fechaGraduacion}
                    onChange={handleEducacionChange}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                  />
                  <TextField
                    fullWidth
                    label="Descripción"
                    name="descripcion"
                    value={nuevoEducacion.descripcion}
                    onChange={handleEducacionChange}
                    multiline
                    rows={2}
                    size="small"
                  />
                  <Button variant="contained" startIcon={<AddIcon />} onClick={agregarEducacion} className="btn-primary">
                    Agregar Educación
                  </Button>
                </Box>

                {educacion.map((edu) => (
                  <Paper key={edu.id} className="list-item">
                    <Box className="list-item-row">
                      <Box>
                        <Typography variant="body1" className="list-item-title">
                          {edu.titulo}
                        </Typography>
                        <Typography variant="body2" className="list-item-sub">
                          {edu.institucion}
                        </Typography>
                        <Typography variant="caption" className="list-item-sub">
                          {edu.fechaGraduacion}
                        </Typography>
                      </Box>
                      <IconButton size="small" onClick={() => eliminarEducacion(edu.id)} className="btn-delete">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Paper>
                ))}

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Habilidades
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Agregar habilidad"
                    value={nuevoHabilidad}
                    onChange={(e) => setNuevoHabilidad(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && agregarHabilidad()}
                    size="small"
                  />
                  <Button variant="contained" startIcon={<AddIcon />} onClick={agregarHabilidad} className="btn-primary">
                    Agregar
                  </Button>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {habilidades.map((hab) => (
                    <Paper key={hab.id} className="chip">
                      <Typography variant="body2">{hab.nombre}</Typography>
                      <IconButton size="small" onClick={() => eliminarHabilidad(hab.id)} className="btn-delete-small">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Paper>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* PREVIEW DEL CV */}
          <Grid item xs={12} md={6}>
            <Card className="preview-card">
              <CardContent id="cv-preview" className="cv-preview">
                {/* Encabezado */}
                <Box className="cv-header">
                  {cv.nombre && (
                    <Typography variant="h4" className="cv-name">
                      {cv.nombre}
                    </Typography>
                  )}
                  <Box className="cv-contact">
                    {cv.email && <Typography variant="body2">{cv.email}</Typography>}
                    {cv.telefono && <Typography variant="body2">{cv.telefono}</Typography>}
                    {cv.ubicacion && <Typography variant="body2">{cv.ubicacion}</Typography>}
                  </Box>
                </Box>

                {cv.resumen && (
                  <>
                    <Divider className="divider" />
                    <Typography variant="h6" className="section-title">
                      Resumen Profesional
                    </Typography>
                    <Typography variant="body2" className="cv-text">
                      {cv.resumen}
                    </Typography>
                  </>
                )}

                {experiencias.length > 0 && (
                  <>
                    <Divider className="divider" />
                    <Typography variant="h6" className="section-title">
                      Experiencia Laboral
                    </Typography>
                    {experiencias.map((exp) => (
                      <Box key={exp.id} className="cv-section-item">
                        <Box className="cv-section-row">
                          <Typography variant="body1" className="cv-section-title">
                            {exp.puesto}
                          </Typography>
                          <Typography variant="body2" className="cv-section-sub">
                            {exp.fechaInicio} - {exp.fechaFin}
                          </Typography>
                        </Box>
                        <Typography variant="body2" className="cv-section-sub">
                          {exp.empresa}
                        </Typography>
                        {exp.descripcion && (
                          <Typography variant="body2" className="cv-text">
                            {exp.descripcion}
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </>
                )}

                {educacion.length > 0 && (
                  <>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Educación
                    </Typography>
                    {educacion.map((edu) => (
                      <Box key={edu.id} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {edu.titulo}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {edu.fechaGraduacion}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="textSecondary">
                          {edu.institucion}
                        </Typography>
                        {edu.descripcion && (
                          <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-wrap' }}>
                            {edu.descripcion}
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </>
                )}

                {habilidades.length > 0 && (
                  <>
                    <Divider className="divider" />
                    <Typography variant="h6" className="section-title">
                      Habilidades
                    </Typography>
                    <Box className="skills-list">
                      {habilidades.map((hab) => (
                        <Paper key={hab.id} className="skill-chip">
                          <Typography variant="body2">{hab.nombre}</Typography>
                        </Paper>
                      ))}
                    </Box>
                  </>
                )}
              </CardContent>

              {/* Botones de acción */}
              <Box className="actions-row">
                <Button variant="contained" startIcon={<PrintIcon />} onClick={descargarPDF} className="btn-primary">
                  Imprimir
                </Button>
                <Button variant="outlined" startIcon={<DownloadIcon />} className="btn-outline">
                  Descargar
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
