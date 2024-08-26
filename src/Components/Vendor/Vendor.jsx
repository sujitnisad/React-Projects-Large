import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "./Vendor.css";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { useTable } from "react-table";
const Vendor = () => {
  const [jsonData, setJsonData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const convertExcelToJson = async () => {
      try {
        // The path to your Excel file in the public directory
        const filePath = "/src/data.xlsx"; // Ensure file is served correctly in your public directory

        // Fetch the Excel file
        const response = await fetch(filePath);
        const arrayBuffer = await response.arrayBuffer();
        // Convert array buffer to binary string
        const data = new Uint8Array(arrayBuffer);

        const arr = Array.from(data, (byte) => String.fromCharCode(byte)).join(
          ""
        );

        // Parse the workbook
        const workbook = XLSX.read(arr, { type: "binary" });
        // Convert the first sheet to JSON
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        // Set JSON data to state
        setJsonData(json);
      } catch (error) {
        console.error("Error reading Excel file:", error);
      }
    };

    convertExcelToJson();
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Filter data based on the search query
  const filteredData = jsonData.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery)
    )
  );

  const columns = React.useMemo(
    () =>
      jsonData.length > 0
        ? Object.keys(jsonData[0]).map((key) => ({
            Header: key,
            accessor: key, // Accessor is the "key" in the data
          }))
        : [],
    [jsonData]
  );

  // Prepare data for react-table
  const data = React.useMemo(() => filteredData, [filteredData]);

  // Use the useTable hook to get table props and rows
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="display">
      <h2 className="heading">MM Vendor Contact details</h2>
      {/* Search input field */}

      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{
          marginBottom: "10px",
          padding: "10px 15px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          fontSize: "16px",
          width: "100%",
          maxWidth: "400px",
          boxSizing: "border-box",
          outline: "none",
          transition:
            "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease",
          position: "relative",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#007BFF";
          e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)";
          e.target.style.transform = "scale(1.02)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#ccc";
          e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
          e.target.style.transform = "scale(1)";
        }}
      />
      <div className="table-adj">
        <TableContainer
          component={Paper}
          sx={{ maxWidth: "100%", margin: "20px 0" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {jsonData.length > 0 &&
                  Object.keys(jsonData[0]).map((key) => (
                    <TableCell
                      key={key}
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#0076CE",
                        color: "#fff",
                      }}
                    >
                      {key}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:nth-of-type(even)": { backgroundColor: "#f9f9f9" },
                    "&:hover": { backgroundColor: "#e9e9e9" },
                  }}
                >
                  {Object.values(row).map((value, i) => (
                    <TableCell key={i}>{value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* <table border="1" className="professional-table">
        <thead>
          <tr>
            {jsonData.length > 0 &&
              Object.keys(jsonData[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default Vendor;
