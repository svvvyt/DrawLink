import React from 'react';

import '../styles/Toolbar.css';

const Toolbar = ({ onColorChange, onSizeChange, onClearCanvas }) => {
  return (
    <div className='toolbar'>
      <button
        onClick={() => onColorChange('black')}
        style={{ backgroundColor: 'black' }}
      >
        Black
      </button>
      <button
        onClick={() => onColorChange('red')}
        style={{ backgroundColor: 'red' }}
      >
        Red
      </button>
      <button
        onClick={() => onColorChange('blue')}
        style={{ backgroundColor: 'blue' }}
      >
        Blue
      </button>
      <button onClick={() => onSizeChange(5)}>Small Brush</button>
      <button onClick={() => onSizeChange(10)}>Medium Brush</button>
      <button onClick={() => onSizeChange(15)}>Large Brush</button>
      <button onClick={onClearCanvas}>Clear</button>
    </div>
  );
};

export default Toolbar;
