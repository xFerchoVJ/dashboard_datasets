import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RootLayout from "./layouts/RootLayout";
import FormCsv from "./components/FormCsv";
import { CsvProvider } from "./context/CsvProvider";
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
