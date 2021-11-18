import React from "react";

export default function Search({
  handleSearchType,
  handleRadioB,
  handleSearch,
  resetInput,
  fileSearch,
  search,
  radioB,
  tab,
  msg,
}) {
  return (
    <div className={tab === "search" ? "tab-body active" : null}>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="searchRadioB"
          id="cajaAdeaRadioB"
          onClick={() => handleRadioB("box")}
        />
        <label className="form-check-label" htmlFor="cajaAdeaRadioB">
          Caja Adea
        </label>
      </div>
      <div className="form-element">
        <input
          className="form-control form-control-md"
          type="text"
          id="caja_adea"
          name="box_number"
          placeholder="Nro"
          onChange={handleSearch}
          value={search.box_number}
          disabled={radioB === "box" ? false : true}
        />
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="searchRadioB"
          id="fileTypeRadioB"
          onClick={() => handleRadioB("file")}
        />
        <label className="form-check-label" htmlFor="fileTypeRadioB">
          Tipo de Archivo
        </label>
      </div>
      <div className="form-element">
        <select
          className="form-select form-select-md mb-3"
          id="archivo_tipo"
          name="fileType"
          onChange={handleSearchType}
          value={search.fileType}
          disabled={radioB === "file" ? false : true}
        >
          <option value="select" disabled>
            Seleccionar
          </option>
          <option value="ne">Numero de Entrada</option>
          <option value="ex">Expediente</option>
        </select>
      </div>
      <div
        className={search.fileType === "ne" ? null : "form-element type_active"}
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
          onChange={handleSearch}
          value={search.number}
          disabled={radioB === "file" ? false : true}
        />
      </div>
      <div
        className={search.fileType === "ex" ? null : "form-element type_active"}
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
              onChange={handleSearch}
              value={search.number}
              disabled={radioB === "file" ? false : true}
            />
          </div>
          <div className="col-4">
            <input
              type="text"
              className="form-control"
              name="yearNumEx"
              placeholder="Año"
              onChange={handleSearch}
              value={search.yearNumEx}
              disabled={radioB === "file" ? false : true}
            />
          </div>
          <div className="col-3">
            <input
              type="text"
              className="form-control"
              name="bodyNumEx"
              placeholder="C"
              onChange={handleSearch}
              value={search.bodyNumEx}
              disabled={radioB === "file" ? false : true}
            />
          </div>
        </div>
      </div>
      <div className="form-element">
        <div className="d-grid gap-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => resetInput("search")}
          >
            Limpiar Campos
          </button>
        </div>
      </div>
      <div className="form-element">
        <div className="d-grid gap-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => fileSearch(search)}
          >
            Buscar
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
