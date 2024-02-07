import axios from "axios";

const baseUrl = "http://192.168.3.18:8088";

export const fetchFilm = async (ruta) => {
  const url = `${baseUrl}/${ruta}`;
  const response = await axios.get(url);
  console.log(response.data);
  return response.data;
};

export const saveFilm = async (ruta, form) => {
  const url = `${baseUrl}/${ruta}`;
  console.log(url);
  const response = await axios.post(url, form).catch((error) => {
    console.log("Error:", error);
  });
  console.log(response?.data);
};

export const deleteFilm = async (ruta, id) => {
  const url = `${baseUrl}/${ruta}/delete/${id}`;
  console.log(url);
  const response = await axios.delete(url).catch((error) => {
    console.log("Error:", error);
  });
  console.log(response?.data);
  return "Borrado Exitoso";
};
