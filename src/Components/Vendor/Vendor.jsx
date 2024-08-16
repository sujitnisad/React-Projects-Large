import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "./Vendor.css";
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

  return (
    <div className="display" >
      <h2>Excel Data Table</h2>
      {/* Search input field */
    
      }


<input  
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: "10px", padding: "5px" }}
      />

     
      <table border="1">
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
      </table>
    </div>
  );
};

export default Vendor;
