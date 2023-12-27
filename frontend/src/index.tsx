import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Header from './components/Header';
import PostList from './components/PostsList';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import PostDetailsPage from './components/PostDetailsPage';
import App from './app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);

reportWebVitals();
