import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function fetchData(csvFileName, imagesDirectoryName) {
  const csvFilePath = path.resolve(__dirname, `../../public/data/${csvFileName}`);
  const imagesDirectoryPath = path.resolve(__dirname, `../../public/${imagesDirectoryName}`);
  let dataGroupedByIndex = {};

  try {

    const csvContent = fs.readFileSync(csvFilePath, 'utf-8');
    const rows = csvContent.split('\n').map(row => row.split(','));
    const headers = rows[0].map(header => header.trim().toLowerCase());

    const imageFiles = fs.readdirSync(imagesDirectoryPath);

    rows.slice(1).forEach(row => {
      const dataObj = headers.reduce((obj, header, index) => {
        obj[header] = row[index]?.trim().replace('\r', '');
        return obj;
      }, {});

  
      const index = dataObj.index;
      const matchingImages = imageFiles
        .filter(file => file.startsWith(`${index}-`)) 
        .map(file => `/${imagesDirectoryName}/${file}`);


      dataObj.imagePaths = matchingImages;


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
