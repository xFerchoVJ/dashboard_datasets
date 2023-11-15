import axios from "axios";
import React, { useState } from "react";

const FormCsv = () => {
  const [csvField, setCsvField] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!csvField) {
      console.log("No hay archivo");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("csv", csvField);
      const response = await axios.post(
        "http://localhost:3000/api/csv/upload",
        formData
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setCsvField(e.target.files[0]);
  };

  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="formFile" className="form-label">
            Ingresa tu Dataset
          </label>
          <input className="form-control" type="file" onChange={handleChange} />
        </div>
        <input type="submit" value="Enviar Archivo CSV" />
      </form>
    </div>
  );
};

export default FormCsv;
