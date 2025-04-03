import React from 'react';
import './App.css';
import AppRouter from './mis-routers/Routers';
import Footer from "./components/footer/Footer.jsx"

function App() {
  return (
    <div className="App">
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
