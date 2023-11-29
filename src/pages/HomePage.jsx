import { Link } from "react-router-dom";
import ChartHome from "../assets/chart_homepage.svg";
import "../assets/css/utils.css";

const HomePage = () => {
  return (
    <div className="container vh-75">
      <div
        className="
        container-fluid d-flex flex-column align-items-center justify-content-center gap-3
        flex-md-row align-items-center mt-md-4
        "
      >
        <h1 className="text-center my-5">
          Bienvenidos al Dashboard donde puedes{" "}
          <span className="text-primary">Graficar</span> y hacer un{" "}
          <span className="text-primary">DataTable </span>
          de tu <span className="text-primary">Dataset </span>
        </h1>
        <img src={ChartHome} className="w-100" />
      </div>
      <div className="d-flex align-items-center justify-content-center my-5">
        <Link
          to="/csv_reader"
          className="start-now text-decoration-none btn btn-primary"
        >
          ¡Comienza Ahora!
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
