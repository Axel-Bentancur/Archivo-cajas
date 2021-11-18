import axios from "axios";

/************************************* BOX EXISTENCE ************************************************/

export const getAllBoxes = async () => {
  const url = `https://archivo-adea.herokuapp.com/search/all/`;
  const res = await axios.get(url);
  return res.data;
};

export const boxExistence = async (box_number) => {
  const url = `https://archivo-adea.herokuapp.com/search/boxes/${box_number}`;
  const res = await axios.get(url);
  return res.data;
};

export const validateBoxField = async (box) => {
  var regex = /^\d{5}$/;
  if (box.match(regex)) {
    const res = await boxExistence(box);
    if (!res) {
      return { status: true, box_number: box };
    }
    return { status: false, msg: "Caja ya existente" };
  } else {
    return { status: false, msg: "Numero de Caja invalido" };
  }
};

/************************************* FILE EXISTENCE ************************************************/

export const fileExistence = async (file) => {
  const { fileType, number, yearNumEx, bodyNumEx } = file;
  const url = `https://archivo-adea.herokuapp.com/search/files/?type=${fileType}&number=${number}&year=${yearNumEx}&body=${bodyNumEx}`;
  const res = await axios.get(url);
  return res.data;
};

export const validateFileField = async (file) => {
  const { number, fileType, yearNumEx, bodyNumEx } = file;

  // RegEx //
  const neRegex = /^\d{4,7}$/;
  const exRegex = /^\d{1,5}$/;
  const bodyRegeX = /^\d{1,2}$/;
  const yearRegeX = /^(19|20)\d{2}$/;

  if (fileType === "ex") {
    if (
      number.match(exRegex) &&
      bodyNumEx.match(bodyRegeX) &&
      yearNumEx.match(yearRegeX)
    ) {
      const res = await fileExistence(file);
      if (!res) {
        return {
          status: true,
          newFile: { number, yearNumEx, bodyNumEx, type: "ex" },
        };
      }
      return { status: false, msg: "Expediente ya Guardado" };
    } else {
      return { status: false, msg: "Datos Invalidos" };
    }
  } else {
    if (number.match(neRegex)) {
      const res = await fileExistence(file);
      if (!res) {
        return { status: true, newFile: { number, type: "ne" } };
      }
      return { status: false, msg: "Numero de Entrada ya Guardado" };
    } else {
      return { status: false, msg: "Numero de Entrada invalido" };
    }
  }
};

/************************************* CREATE BOX ************************************************/

export const createBox = async (files) => {
  const url = "https://archivo-adea.herokuapp.com/box";
  const res = await axios.post(url, files);
  return res.data;
};

/************************************* SEARCH BOX ************************************************/
export const validateSearchBox = async (box) => {
  var regex = /^\d{5}$/;
  if (box.match(regex)) {
    const res = await boxExistence(box);
    if (res) {
      return { status: true, box: res };
    }
    return {
      status: false,
      msg: `La caja N° ${box} no se encuentra agregada al Sistema`,
    };
  } else {
    return { status: false, msg: "Numero de Caja invalido" };
  }
};

/************************************* SEARCH FILE ************************************************/

export const validateSearchFileField = async (file) => {
  const { number, fileType, yearNumEx, bodyNumEx } = file;

  // RegEx //
  const neRegex = /^\d{4,7}$/;
  const exRegex = /^\d{1,5}$/;
  const bodyRegeX = /^\d{1,2}$/;
  const yearRegeX = /^(19|20)\d{2}$/;

  if (fileType === "ex") {
    if (
      number.match(exRegex) &&
      bodyNumEx.match(bodyRegeX) &&
      yearNumEx.match(yearRegeX)
    ) {
      const res = await fileExistence(file);
      if (res) {
        return {
          status: true,
          newFile: res,
        };
      }
      return {
        status: false,
        msg: `El Expediente N° ${number}/${yearNumEx} no se encuentra agregada al Sistema`,
      };
    } else {
      return { status: false, msg: "Datos Invalidos" };
    }
  } else {
    if (number.match(neRegex)) {
      const res = await fileExistence(file);
      if (res) {
        return { status: true, newFile: res };
      }
      return {
        status: false,
        msg: `El N° Entrada ${number} no se encuentra agregada al Sistema`,
      };
    } else {
      return { status: false, msg: "Numero de Entrada invalido" };
    }
  }
};

export const arrOfFiles = async (obj) => {
  let arr = [];
  const ex = obj.box.ExFiles;
  const ne = obj.box.NeFiles;
  if (ex.length > 0) {
    ex.forEach((e) => {
      arr.push({
        number: e.ex_number,
        yearNumEx: e.year,
        bodyNumEx: e.ex_number_part,
        type: e.type,
      });
    });
  }
  if (ne.length > 0) {
    ne.forEach((e) => {
      arr.push({
        number: e.ne_number,
        type: e.type,
      });
    });
  }
  return arr;
};
