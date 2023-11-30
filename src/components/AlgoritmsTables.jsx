import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export const AlgoritmsTables = ({ clusters, associations }) => {
  const data = {
    labels: ["Cluster 1", "Cluster 2", "Cluster 3"],
    datasets: clusters.map((cluster, index) => ({
      label: `Centroide ${index + 1}`,
      backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 0.6)`,
      borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 1)`,
      borderWidth: 1,
      hoverBackgroundColor: `rgba(${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, 0.8)`,
      hoverBorderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 1)`,
      data: cluster.centroid,
    })),
  };

  // Opciones para el gráfico
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const labels = associations.map((item) => item.items);
  const supportValues = associations.map((item) => item.support);

  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: "Soporte de Conjunto de Ítems",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(0,0,0,1)",
        data: supportValues,
      },
    ],
  };

  return (
    <div>
      <div className="my-5">
        <h2>Gráfico de Clusters</h2>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};
