import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardList from "./components/CardList";
import CardDetails from "./components/CardDetails";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router basename="/card-hub">
      <Routes>
        <Route path="/" element={<CardList />} />
        <Route path="/card/:cardId" element={<CardDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
