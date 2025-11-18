import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate, useLocation } from 'react-router-dom';
import './HomeButton.css';

export default function HomeButton() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/') {
    return null;
  }

  return (
    <Button
      startIcon={<HomeIcon />}
      onClick={() => navigate('/')}
      className="home-button"
    >
      Inicio
    </Button>
  );
}
