import React from "react";
import "./Modal.css";

export default function Modal({ setModalState }) {
  return (
    <div className="overlay">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <div className="closeButton">
              <button
                type="button"
                className="btn-close"
                onClick={() => setModalState(false)}
              />
            </div>
            <span className="modal-text">
              Caja Adea Creada Satisfactoriamente
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
