import axios from "axios";
import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { useDataCsv } from "../hooks/useDataCsv";
import "../assets/css/utils.css";
const FormCsv = () => {
  const [csvField, setCsvField] = useState(null);
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dataCsv, setDataCsv } = useDataCsv();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!csvField) {
      console.log("No hay archivo");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("csv", csvField);
      const response = await axios.post(
        "http://localhost:3000/api/csv/upload",
        formData
      );
      setDataCsv(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setCsvField(e.target.files[0]);
  };

  const columns = useMemo(() => {
    if (dataCsv.length === 0) {
      console.log("No hay data aún.");
      return [];
    }
    const allKeys = dataCsv.reduce((keys, row) => {
      Object.keys(row).forEach((key) => {
        if (!keys.includes(key)) {
          keys.push(key);
        }
      });
      return keys;
    }, []);

    return allKeys.map((key) => ({
      name: key,
      selector: key,
      sortable: true,
    }));
  }, [dataCsv]);

  const filteredData = useMemo(() => {
    return dataCsv.filter((item) =>
      Object.values(item).join(" ").toLowerCase().includes(filter.toLowerCase())
    );
  }, [dataCsv, filter]);

  //  Internally, customStyles will deep merges your customStyles with the default styling.
  const customStyles = {
    rows: {
      style: {
        minHeight: "50px", // override the row height
        width: "20%",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // Ajusta el espaciado interno de las celdas del encabezado
        paddingRight: "8px",
        width: "20px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // Ajusta el espaciado interno de las celdas de datos
        paddingRight: "8px",
      },
    },
  };
  return (
    <div className="container mt-3">
      {isLoading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : dataCsv.length === 0 ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Ingresa tu Dataset
            </label>
            <input
              className="form-control"
              type="file"
              onChange={handleChange}
            />
          </div>
          <input
            type="submit"
            value="Enviar Archivo CSV"
            className="btn btn-primary"
          />
        </form>
      ) : (
        <>
          <input
            type="text"
            placeholder="Buscar en el Datatable..."
            className="form-control mt-5 mb-2"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            value={filter}
          />
          <DataTable
            title="Tabla de datos del Dataset ingresado..."
            columns={columns}
            data={filteredData}
            pagination={true}
            highlightOnHover={true}
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 30, 50]}
            // customStyles={customStyles}
          />
        </>
      )}
    </div>
  );
};

export default FormCsv;
