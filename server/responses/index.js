const faltanDatos = {
  success: false,
  error: "Es necesario cargar los datos para guardar.",
};

const errorAlCargar = {
  success: false,
  error: "Error al crear el almacen en la base de datos.",
};

const forbidden = {
  success: false,
  error: "Forbidden",
};

const responseError = (err) => {
  return {
    success: false,
    error: err,
  };
};

const responseData = (data) => {
  return {
    success: true,
    count: data.length,
    data,
  };
};

module.exports = {
  faltanDatos,
  errorAlCargar,
  forbidden,
  responseError,
  responseData,
};
