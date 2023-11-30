import DataTable from "react-data-table-component";
const DataTableCsv = ({ filter, columns, filteredData, setFilter}) => {
  return (
    <>
      <input
        type="text"
        placeholder="Buscar en el Datatable..."
        className="form-control mt-5 mb-2"
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        value={filter}
      />
      <DataTable
        title="Tabla de datos del Dataset ingresado..."
        columns={columns}
        data={filteredData}
        pagination={true}
        highlightOnHover={true}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 30, 50]}
        // customStyles={customStyles}
      />
    </>
  );
};

export default DataTableCsv;
