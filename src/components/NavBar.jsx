import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);

  return (
    <AppBar position="fixed" className="appbar-root">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component={Link} to="/" className="nav-title">
            Multi-Herramientas
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}