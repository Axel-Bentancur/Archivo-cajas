import React, { useState } from "react";

/* COMPONENTS */
import Form from "./Form/Form";
import List from "./List/List";
import {
  validateBoxField,
  validateFileField,
  validateSearchBox,
  validateSearchFileField,
  arrOfFiles,
  createBox,
} from "../Helpers/Helpers";

/* STYLES */
import "./CreateBox.css";

export default function CreateBox() {
  const [tab, setTab] = useState("create");
  const [newBox, setNewBox] = useState({ box_number: "", files: [], msg: "" });
  const [searchFiles, setSearchFiles] = useState({ box_number: "", files: [] });
  const [data, setData] = useState({
    fileType: "select",
    number: "",
    yearNumEx: "",
    bodyNumEx: "",
  });
  const [search, setSearch] = useState({
    box_number: "",
    fileType: "select",
    number: "",
    yearNumEx: "",
    bodyNumEx: "",
  });
  const [box, setBox] = useState(false);
  const [msg, setMsg] = useState();

  const setBoxNumber = async (e) => {
    const BoxField = await validateBoxField(newBox.box_number);
    if (BoxField.status) {
      setBox(true);
      setMsg("");
    } else {
      setMsg(BoxField.msg);
    }
  };

  const setFileNumber = async (e) => {
    if (data.fileType !== "select") {
      const fileField = await validateFileField(e);
      const duplicateValidation = newBox.files.some(
        (e) => fileField.status && e.number === fileField.newFile.number
      );
      const duplicateValidationEx = newBox.files.some(
        (e) =>
          fileField.status &&
          e.number === fileField.newFile.number &&
          e.yearNumEx === fileField.newFile.yearNumEx &&
          e.bodyNumEx === fileField.newFile.bodyNumEx
      );
      if (fileField.status) {
        if (fileField.newFile.type === "ne") {
          if (!duplicateValidation) {
            setNewBox({
              ...newBox,
              files: [...newBox.files, fileField.newFile],
              msg: "",
            });
            setMsg("");
            resetInput();
          } else {
            const message = { status: false, msg: "Numero Duplicado" };
            setMsg(message.msg);
          }
        } else {
          if (!duplicateValidationEx) {
            setNewBox({
              ...newBox,
              files: [...newBox.files, fileField.newFile],
              msg: "",
            });
            setMsg("");
            resetInput();
          } else {
            const message = { status: false, msg: "Numero Duplicado" };
            setMsg(message.msg);
          }
        }
      } else {
        setMsg(fileField.msg);
      }
    } else {
      const message = { status: false, msg: "Tipo de Archivo no Seleccionado" };
      setMsg(message.msg);
    }
  };

  const searchFileNumber = async (e) => {
    if (search.box_number) {
      const boxRes = await validateSearchBox(search.box_number);
      if (boxRes.status) {
        const res = await arrOfFiles(boxRes);
        if (res.length < 1) {
          setSearchFiles({
            box_number: boxRes.box.box_number,
            msg: "La caja se encuentra Vacia",
          });
          setMsg("");
        } else {
          setSearchFiles({
            box_number: boxRes.box.box_number,
            files: res,
          });
          setMsg("");
        }
      } else {
        setMsg(boxRes.msg);
      }
    } else if (e.number) {
      const fileRes = await validateSearchFileField(e);
      if (fileRes.status) {
        const boxRes = await validateSearchBox(
          fileRes.newFile.Box.box_number.toString()
        );
        const res = await arrOfFiles(boxRes);
        setSearchFiles({
          box_number: boxRes.box.box_number,
          files: res,
        });
        setMsg("");
        resetInput();
      } else {
        setMsg(fileRes.msg);
      }
    } else {
      const message = {
        status: false,
        msg: "Los campos se encuentran Vacios",
      };
      setMsg(message.msg);
    }
  };

  const createNewBox = async () => {
    if (newBox.files.length > 0) {
      const res = await createBox(newBox);
      if (res === "success") {
        resetNewBox();
      }
    } else {
      setNewBox({
        ...newBox,
        msg: "La caja debe contener Archivos para ser Creada",
      });
      setMsg("");
    }
  };

  const tabSelector = (e) => {
    resetInput();
    setMsg("");
    setTab(e);
  };

  const resetNewBox = () => {
    setNewBox({ box_number: "", files: [], msg: "" });
  };

  const resetInput = (e) => {
    if (e === "search") {
      setSearch({
        box_number: "",
        fileType: "select",
        number: "",
        yearNumEx: "",
        bodyNumEx: "",
      });
      setSearchFiles({ box_number: "", files: [] });
      setMsg("");
    } else {
      setData({
        fileType: "select",
        number: "",
        yearNumEx: "",
        bodyNumEx: "",
      });
    }
  };

  const removeFile = (e) => {
    const arr = newBox.files;
    arr.splice(e, 1);
    setNewBox({ ...newBox, files: arr });
  };

  return (
    <div className="box-container container-main">
      <Form
        boxSetter={setBoxNumber}
        fileSetter={setFileNumber}
        fileSearch={searchFileNumber}
        setMsg={setMsg}
        msg={msg}
        setData={setData}
        data={data}
        setSearch={setSearch}
        search={search}
        setNewBox={setNewBox}
        newBox={newBox}
        tabSelector={tabSelector}
        tab={tab}
        resetInput={resetInput}
        box={box}
      />
      <List
        tab={tab}
        box={box}
        setBox={setBox}
        removeFile={removeFile}
        createNewBox={createNewBox}
        data={tab === "create" ? newBox : searchFiles}
      />
    </div>
  );
}
