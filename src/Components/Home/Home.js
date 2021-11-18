import React from "react";
import { Link } from "react-router-dom";

/* STYLES */
import "./Home.css";

export default function Home() {
  return (
    <div className="container-body">
      <div className="options-container">
        <div className="title">
          <span>GESTION DE ARCHIVO - NUMEROS DE ENTRADA / EXPEDIENTES</span>
          <hr />
        </div>

        <div className="options-box">
          <Link to="/boxes">
            <div className="button">Nueva Caja</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
