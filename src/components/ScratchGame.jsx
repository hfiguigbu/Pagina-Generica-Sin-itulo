import React from 'react';
import { Box } from '@mui/material';
import './ScratchGame.css';

export default function ScratchGame() {
  return (
    <Box className="scratch-container">
      <div className="scratch-content">
        <h1>Juego Scratch</h1>
        <div className="scratch-embed-wrapper">
          <iframe
            src="https://scratch.mit.edu/projects/1242888045/embed"
            allowTransparency="true"
            width="485"
            height="402"
            frameBorder="0"
            scrolling="no"
            allowFullScreen
            title="Scratch Game"
          />
        </div>
      </div>
    </Box>
  );
}
