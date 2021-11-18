import React, { useState } from "react";
import "./List.css";
import Modal from "./Modal";

export default function List({
  tab,
  box,
  removeFile,
  createNewBox,
  data,
  setBox,
}) {
  const [modalState, setModalState] = useState(false);

  const handleModal = () => {
    createNewBox();
    setBox(false);
    setModalState(true);
  };

  return (
    <div className="list-container">
      <h4 className="title-list">Caja Adea N° {data.box_number || ""}</h4>
      <div className="table-container">
        <table className="content-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Numero</th>
              <th>Año</th>
              <th>Cuerpo</th>
              <th>Tipo</th>
              {tab === "create" ? <th>Acciones</th> : null}
            </tr>
          </thead>
          <tbody>
            {!data.msg ? (
              data.files.map((e, idx) => (
                <tr key={idx} className={e.type === "ex" ? "verde" : "violeta"}>
                  <td className="table-font">{idx + 1}</td>
                  <td className="table-font">{e.number}</td>
                  <td className="table-font">{e.yearNumEx}</td>
                  <td className="table-font">
                    {e.bodyNumEx ? e.bodyNumEx : ""}
                  </td>
                  <td className="table-font">{e.type.toUpperCase()}</td>
                  {tab === "create" ? (
                    <td>
                      <div onClick={() => removeFile(idx)}>
                        <button type="button" className="btn btn-danger">
                          <i className="bi bi-trash" />
                        </button>
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  <span className="empty-box">{data.msg}</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {tab === "create" ? (
        <div className="form-element">
          <button
            type="button"
            className="btn btn-primary create"
            onClick={() => handleModal()}
            disabled={!box ? true : false}
          >
            Crear Caja Adea
          </button>
        </div>
      ) : null}
      {modalState ? (
        <Modal modalState={modalState} setModalState={setModalState} />
      ) : null}
    </div>
  );
}
