import React from "react";

export default function Create({
  handleBox,
  handleType,
  handleChange,
  boxSetter,
  fileSetter,
  newBox,
  tab,
  box,
  data,
  msg,
}) {
  return (
    <div className={tab === "create" ? "tab-body active" : null}>
      <div className="form-element">
        <label htmlFor="caja_adea" className="form-label">
          Caja Adea
        </label>
        <input
          className="form-control form-control-md"
          type="text"
          id="caja_adea"
          name="box_number"
          placeholder="Nro"
          onChange={handleBox}
          disabled={box ? true : false}
          value={newBox.box_number}
        />
      </div>
      <div className="form-element">
        <div className="d-grid gap-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => boxSetter(data)}
            disabled={box ? true : false}
          >
            Crear
          </button>
        </div>
      </div>
      <div className="form-element">
        <label htmlFor="archivo_tipo" className="form-label">
          Tipo de Archivo
        </label>
        <select
          className="form-select form-select-md mb-3"
          id="archivo_tipo"
          name="fileType"
          onChange={handleType}
          disabled={!box ? true : false}
          value={data.fileType}
        >
          <option value="select" disabled>
            Seleccionar
          </option>
          <option value="ne">Numero de Entrada</option>
          <option value="ex">Expediente</option>
        </select>
      </div>
      <div
        className={data?.fileType === "ne" ? null : "form-element type_active"}
      >
        <label htmlFor="ne_exp" className="form-label">
          Nro. Entrada
        </label>
        <input
          className="form-control form-control-md"
          type="text"
          id="ne_exp"
          name="number"
          placeholder="Nro"
          onChange={handleChange}
          disabled={!box ? true : false}
          value={data.number}
        />
      </div>
      <div
        className={data.fileType === "ex" ? null : "form-element type_active"}
      >
        <div className="row">
          <label htmlFor="ne_exp" className="form-label">
            Nro. Expediente
          </label>
          <div className="col-5">
            <input
              type="text"
              className="form-control"
              name="number"
              placeholder="Nro"
              onChange={handleChange}
              disabled={!box ? true : false}
              value={data.number}
            />
          </div>
          <div className="col-4">
            <input
              type="text"
              className="form-control"
              name="yearNumEx"
              placeholder="Año"
              onChange={handleChange}
              disabled={!box ? true : false}
              value={data.yearNumEx}
            />
          </div>
          <div className="col-3">
            <input
              type="text"
              className="form-control"
              name="bodyNumEx"
              placeholder="C"
              onChange={handleChange}
              disabled={!box ? true : false}
              value={data.bodyNumEx}
            />
          </div>
        </div>
      </div>
      <div className="form-element">
        <div className="d-grid gap-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => fileSetter(data)}
            disabled={!box ? true : false}
          >
            Agregar
          </button>
        </div>
      </div>
      {msg ? (
        <div className="msg_box">
          <i className="bi bi-x-octagon icon"></i>
          {msg}
        </div>
      ) : null}
    </div>
  );
}
