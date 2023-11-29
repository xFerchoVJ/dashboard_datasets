import { useContext } from "react";
import DataCsvContext from "../context/CsvProvider";

export const useDataCsv = () => {
  return useContext(DataCsvContext);
};
