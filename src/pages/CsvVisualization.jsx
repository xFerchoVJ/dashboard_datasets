import axios from "axios";
import React, { useMemo, useState } from "react";
import { useDataCsv } from "../hooks/useDataCsv";
import "../assets/css/utils.css";
import Spinner from "../components/Spinner";
import DataTableCsv from "../components/DataTableCsv";
import { useEffect } from "react";
import RatingsDistribution from "../components/RatingsDistribution";
import StatsReviews from "../components/StatsReviews";
import { AlgoritmsTables } from "../components/AlgoritmsTables";
const FormCsv = () => {
  const [csvField, setCsvField] = useState(null);
  const [filter, setFilter] = useState("");
  const [ratings, setRatings] = useState(false);
  const [mostrarAlgoritmos, setMostrarAlgoritmos] = useState(false);
  const {
    dataCsv,
    setDataCsv,
    ratingsData,
    isLoading,
    setIsLoading,
    mostrarGraficas,
    setMostrarGraficas,
    totalReviews,
    reviewsOverTime,
  } = useDataCsv();
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

  useEffect(() => {
    if (Object.keys(ratingsData).length > 0) {
      setRatings(true);
    } else {
      setRatings(false);
    }
  }, [ratingsData]);

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

  // //  Internally, customStyles will deep merges your customStyles with the default styling.
  // const customStyles = {
  //   rows: {
  //     style: {
  //       minHeight: "50px", // override the row height
  //       width: "20%",
  //     },
  //   },
  //   headCells: {
  //     style: {
  //       paddingLeft: "8px", // Ajusta el espaciado interno de las celdas del encabezado
  //       paddingRight: "8px",
  //       width: "20px",
  //     },
  //   },
  //   cells: {
  //     style: {
  //       paddingLeft: "8px", // Ajusta el espaciado interno de las celdas de datos
  //       paddingRight: "8px",
  //     },
  //   },
  // };
  return (
    <div className="container mt-3">
      {isLoading ? (
        <Spinner />
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
          <DataTableCsv
            filter={filter}
            setFilter={setFilter}
            columns={columns}
            filteredData={filteredData}
          />
          <div className="d-flex justify-content-around my-5">
            <button
              className="btn btn-primary"
              onClick={() => {
                if (mostrarAlgoritmos) {
                  setMostrarAlgoritmos(false);
                }
                setMostrarGraficas(true);
              }}
            >
              Mostrar Graficas
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                if (mostrarGraficas) {
                  setMostrarGraficas(false);
                }
                setMostrarAlgoritmos(true);
              }}
            >
              Mostrar Algoritmos
            </button>
          </div>
          {mostrarGraficas && ratings && (
            <>
              <RatingsDistribution ratingsData={ratingsData} />
              <StatsReviews
                totalReviews={totalReviews}
                reviewsOverTime={reviewsOverTime}
              />
            </>
          )}
          {mostrarAlgoritmos && <AlgoritmsTables />}
        </>
      )}
    </div>
  );
};

export default FormCsv;
