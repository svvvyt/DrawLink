import React, { useState } from 'react';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';

import './styles/App.css';

const App = () => {
  const [currentUserColor, setCurrentUserColor] = useState('black');
  const [brushSize, setBrushSize] = useState(5);

  const handleColorChange = (color) => {
    setCurrentUserColor(color);
  };

  const handleSizeChange = (size) => {
    setBrushSize(size);
  };

  const handleClearCanvas = () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <>
      <h1>Collaborative Drawing App</h1>
      <div>
        <Toolbar
          onColorChange={handleColorChange}
          onSizeChange={handleSizeChange}
          onClearCanvas={handleClearCanvas}
        />
        <Canvas currentUserColor={currentUserColor} brushSize={brushSize} />
      </div>
    </>
  );
};

export default App;
