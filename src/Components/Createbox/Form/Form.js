import React, { useState } from "react";
import Create from "./Create/Create";
import "./Form.css";
import Search from "./Search/Search";

export default function Form({
  boxSetter,
  fileSetter,
  fileSearch,
  setMsg,
  msg,
  setData,
  data,
  setSearch,
  search,
  setNewBox,
  newBox,
  tabSelector,
  tab,
  resetInput,
  box,
}) {
  const [radioB, setRadioB] = useState();

  /************ CREATE ************/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleType = (e) => {
    const { name, value } = e.target;
    setData({
      [name]: value,
      number: "",
      yearNumEx: "",
      bodyNumEx: "",
    });
    setMsg("");
  };

  const handleBox = (e) => {
    const { value } = e.target;
    setNewBox({ ...newBox, box_number: value });
  };

  /************ SEARCH ************/

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };

  const handleSearchType = (e) => {
    const { name, value } = e.target;
    setSearch({
      ...search,
      [name]: value,
      number: "",
      yearNumEx: "",
      bodyNumEx: "",
    });
    setMsg("");
  };

  const handleRadioB = (e) => {
    resetInput("search");
    setRadioB(e);
  };

  return (
    <div className="form-container">
      <div className="form">
        <div className="tab-header">
          <div
            onClick={() => tabSelector("create")}
            className={tab === "create" ? "active" : null}
          >
            Crear
          </div>
          <div
            onClick={() => tabSelector("search")}
            className={tab === "search" ? "active" : null}
          >
            Buscar
          </div>
        </div>
        <div className="tab-content">
          <Create
            handleBox={handleBox}
            handleType={handleType}
            handleChange={handleChange}
            boxSetter={boxSetter}
            fileSetter={fileSetter}
            newBox={newBox}
            tab={tab}
            box={box}
            data={data}
            msg={msg}
          />
          <Search
            handleSearchType={handleSearchType}
            handleRadioB={handleRadioB}
            handleSearch={handleSearch}
            resetInput={resetInput}
            fileSearch={fileSearch}
            search={search}
            radioB={radioB}
            tab={tab}
            msg={msg}
          />
        </div>
      </div>
    </div>
  );
}
