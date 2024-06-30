import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BaseLayout from "./components/layout/BaseLayout";
import HomePage from './components/HomePage';
import LoadoutBuilder from './components/LoadoutBuilder';
import SavedLoadouts from './components/SavedLoadouts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <BaseLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/loadout_builder" element={<LoadoutBuilder />} />
          <Route path="/saved_loadouts" element={<SavedLoadouts />} />
        </Routes>
      </BaseLayout>
    </Router>
  </React.StrictMode>
);
