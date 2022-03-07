import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing.js';
import EmojiSelector from './components/EmojiSelector.js';
import MazeComponent from './components/MazeComponent';
// import MazeTestInOne from './components/MazeTestInOne.js';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />}></Route>
          <Route exact path="/heroes" element={<EmojiSelector />}></Route>
          <Route exact path="/game" element={<MazeComponent />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;