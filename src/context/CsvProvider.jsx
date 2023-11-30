import { useState, createContext, useEffect } from "react";
import axios from "axios";
const DataCsvContext = createContext();

const CsvProvider = ({ children }) => {
  const [dataCsv, setDataCsv] = useState([]);
  const [ratingsData, setRatingsData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [mostrarGraficas, setMostrarGraficas] = useState(false);
  const [totalReviews, setTotalReviews] = useState(0);
  const [reviewsOverTime, setReviewsOverTime] = useState({});

  useEffect(() => {
    if (dataCsv.length == 0) {
      return;
    }
    if (!mostrarGraficas) {
      return;
    }
    if (Object.keys(ratingsData).length > 0) {
      return;
    }
    getRatingsDistribution(dataCsv);
    getReviewStats(dataCsv);
  }, [mostrarGraficas]);

  const getRatingsDistribution = async (dataCsv) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/csv/distribution-ratings",
        { data: dataCsv }
      );
      setRatingsData(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const getReviewStats = async (dataCsv) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/csv/reviews-count",
        { data: dataCsv }
      );
      console.log();
      setTotalReviews(response.data.totalReviews);
      setReviewsOverTime(response.data.reviewsOverTime);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <DataCsvContext.Provider
      value={{
        dataCsv,
        setDataCsv,
        ratingsData,
        isLoading,
        setIsLoading,
        mostrarGraficas,
        setMostrarGraficas,
        totalReviews,
        reviewsOverTime,
      }}
    >
      {children}
    </DataCsvContext.Provider>
  );
};

export { CsvProvider };
export default DataCsvContext;
