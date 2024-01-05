import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const UploadMedicineModal = ({ isOpen, onClose, onUpload, onDownloadTemplate }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const downloadTemplate = () => {
    const templateFilePath = process.env.PUBLIC_URL + '/inventory/template.xlsx';
    const link = document.createElement('a');
    link.href = templateFilePath;
    link.download = 'template.xlsx';
    link.click();
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        console.error('No file selected.');
        return;
      }

      const workbook = await readExcel(selectedFile);
      const jsonData = excelToJson(workbook);

      console.log('JSON Data:', jsonData);

      onUpload(jsonData);
    } catch (error) {
      console.error('Error processing file:', error);
    }
  };

  const readExcel = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        resolve(workbook);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsBinaryString(file);
    });
  };

  const excelToJson = (workbook) => {
    const result = {};
    workbook.SheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      const jsonSheet = XLSX.utils.sheet_to_json(sheet);

      const filteredSheet = jsonSheet.map((row) => {
        const { __rowNum__, ...filteredRow } = row;
        return filteredRow;
      });

      result[sheetName] = filteredSheet;
    });
    return result;
  };

  return (
    <div className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <div className="fixed inset-0 bg-black opacity-75 transition-opacity"></div>

        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-gray-200 px-4 py-3">
            <h3 className="text-lg font-semibold text-gray-800">Upload Medicine</h3>
          </div>

          <div className="px-4 py-3">
            <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700">
              Select Excel File:
            </label>
            <input type="file" id="fileInput" accept=".xlsx, .xls" onChange={handleFileChange} className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:ring focus:border-blue-300" />
            <button onClick={handleUpload} disabled={!selectedFile} className="mt-2 w-full p-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:border-blue-300">
              Upload
            </button>
            <p>Please use this template below to upload file</p>
            <button onClick={downloadTemplate} className="mt-2 w-full p-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300">
              Download Template
            </button>

            <button onClick={onClose} className="mt-2 w-44 p-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-400 focus:outline-none focus:ring focus:border-blue-300">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadMedicineModal;
