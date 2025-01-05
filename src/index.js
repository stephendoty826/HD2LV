import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BaseLayout from "./components/layout/BaseLayout";
import HomePage from './components/HomePage';
import LoadoutBuilder from './components/LoadoutBuilder';
import SavedLoadouts from './components/SavedLoadouts';
import NotFound from './components/NotFound';
import Randomizer from './components/Randomizer';
import Feedback from './components/Feedback';
import Riddler from './components/Riddler';

const images = [
  '/images/hd2_background_1.jpg',
  '/images/hd2_background_2.webp',
  '/images/hd2_background_3.png',
  '/images/hd2_background_4.jpeg',
];

// Pick a random image
const randomImage = images[Math.floor(Math.random() * images.length)];

// Set the CSS variable
document.documentElement.style.setProperty('--background-image', `url(${randomImage})`);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <BaseLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/loadout_builder" element={<LoadoutBuilder />} />
          <Route path="/saved_loadouts" element={<SavedLoadouts />} />
          <Route path="/randomizer" element={<Randomizer />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/riddler" element={<Riddler />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BaseLayout>
    </Router>
  </React.StrictMode>
);

