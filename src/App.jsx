import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RootLayout from "./layouts/RootLayout";
import { CsvProvider } from "./context/CsvProvider";
import FormCsv from "./pages/CsvVisualization";
function App() {
  return (
    <BrowserRouter>
      <CsvProvider>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/csv_reader" element={<FormCsv />} />
          </Route>
        </Routes>
      </CsvProvider>
    </BrowserRouter>
  );
}

export default App;
