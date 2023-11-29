import { useState, createContext } from "react";

const DataCsvContext = createContext();

const CsvProvider = ({ children }) => {
  const [dataCsv, setDataCsv] = useState([]);
  return (
    <DataCsvContext.Provider value={{ dataCsv, setDataCsv }}>
      {children}
    </DataCsvContext.Provider>
  );
};

export { CsvProvider };
export default DataCsvContext;
