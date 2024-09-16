import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to fetch data from a CSV file and associated images
export function fetchData(csvFileName, imagesDirectoryName) {
  const csvFilePath = path.resolve(__dirname, `../../public/data/${csvFileName}`);
  const imagesDirectoryPath = path.resolve(__dirname, `../../public/${imagesDirectoryName}`);
  let dataGroupedByIndex = {};

  try {
    // Read and parse the CSV content
    const csvContent = fs.readFileSync(csvFilePath, 'utf-8');
    const rows = csvContent.split('\n').map(row => row.split(','));
    const headers = rows[0].map(header => header.trim().toLowerCase());

    // Collect all image files
    const imageFiles = fs.readdirSync(imagesDirectoryPath);

    // Group data based on the index and find matching images
    rows.slice(1).forEach(row => {
      const dataObj = headers.reduce((obj, header, index) => {
        obj[header] = row[index]?.trim().replace('\r', '');
        return obj;
      }, {});

      // Use only the index to find all matching images
      const index = dataObj.index;
      const matchingImages = imageFiles
        .filter(file => file.startsWith(`${index}-`)) // Match files starting with the index followed by a hyphen
        .map(file => `/${imagesDirectoryName}/${file}`);

      // Store the images in the data object
      dataObj.imagePaths = matchingImages;

      // Group data objects by index
      if (!dataGroupedByIndex[index]) {
        dataGroupedByIndex[index] = [];
      }
      dataGroupedByIndex[index].push(dataObj);
    });

    return dataGroupedByIndex;

  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    return {};
  }
}
