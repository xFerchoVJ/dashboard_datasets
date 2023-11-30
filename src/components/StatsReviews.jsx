import { Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const StatsReviews = ({ totalReviews, reviewsOverTime }) => {
  const dataTotal = {
    labels: ["Reseñas totales"],
    datasets: [
      {
        label: "Reseñas totales",
        data: [totalReviews],
        backgroundColor: ["#FF6384"],
        hoverBackgroundColor: ["#FF6384"],
      },
    ],
  };
  const data = {
    labels: Object.keys(reviewsOverTime),
    datasets: [
      {
        label: "Reseñas a lo largo del Tiempo",
        data: Object.values(reviewsOverTime),
        fill: false,
        borderColor: "#36A2EB",
        backgroundColor: "#36A2EB",
      },
    ],
  };
  return (
    <>
      <div className="mx-auto" style={{ width: "40%" }}>
        <Doughnut data={dataTotal} className="my-5" />
      </div>
      <Line data={data} className="my-5" />
    </>
  );
};

export default StatsReviews;
