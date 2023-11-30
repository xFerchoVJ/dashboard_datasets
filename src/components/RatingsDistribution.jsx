import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const RatingsDistribution = ({ ratingsData }) => {
  const backgroundColors = [
    "#f44336", // Color para 'Excelente'
    "#2196f3", // Color para 'Muy Bueno'
    "#4caf50", // Color para 'Neutral'
    "#ffc107", // Color para 'Pobre'
    "#9c27b0", // Color para 'Terrible'
  ];

  const borderColors = [
    "#d32f2f", // Borde para 'Excelente'
    "#1976d2", // Borde para 'Muy Bueno'
    "#388e3c", // Borde para 'Neutral'
    "#ffa000", // Borde para 'Pobre'
    "#7b1fa2", // Borde para 'Terrible'
  ];
  const dataAtmosphere = {
    labels: ["Excelente", "Muy Bueno", "Neutral", "Pobre"],
    datasets: [
      {
        label: ratingsData.atmosphere.datasets[0].label,
        data: [
          ratingsData.atmosphere.datasets[0].data.Excelente,
          ratingsData.atmosphere.datasets[0].data["Muy Bueno"],
          ratingsData.atmosphere.datasets[0].data.Neutral,
          ratingsData.atmosphere.datasets[0].data.Pobre,
        ],
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };
  const dataFood = {
    labels: ["Excelente", "Muy Bueno", "Neutral", "Pobre"],
    datasets: [
      {
        label: ratingsData.food.datasets[0].label,
        data: [
          ratingsData.food.datasets[0].data.Excelente,
          ratingsData.food.datasets[0].data["Muy Bueno"],
          ratingsData.food.datasets[0].data.Neutral,
          ratingsData.food.datasets[0].data.Pobre,
        ],
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };
  const dataServices = {
    labels: ["Excelente", "Muy Bueno", "Neutral", "Pobre"],
    datasets: [
      {
        label: ratingsData.service.datasets[0].label,
        data: [
          ratingsData.service.datasets[0].data.Excelente,
          ratingsData.service.datasets[0].data["Muy Bueno"],
          ratingsData.service.datasets[0].data.Neutral,
          ratingsData.service.datasets[0].data.Pobre,
        ],
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: "50%",
        margin: "0 auto",
        gap: 50,
      }}
    >
      <div>
        <h2 style={{ textAlign: "center" }}>Calificaciones de Atmosfera</h2>
        <Bar data={dataAtmosphere} />
      </div>

      <div>
        <h2 style={{ textAlign: "center" }}>Calificaciones de Comidas</h2>
        <Bar data={dataFood} />
      </div>

      <div>
        <h2 style={{ textAlign: "center" }}>Calificaciones de Servicios</h2>
        <Bar data={dataServices} />
      </div>
    </div>
  );
};

export default RatingsDistribution;
