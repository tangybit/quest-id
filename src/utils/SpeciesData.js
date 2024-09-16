import { fetchData } from './DataFetcher.js';

// Fetch data for different sections
const fishDataGroupedByIndex = fetchData('fishes.csv', 'fishes');
// const limuDataGroupedByIndex = fetchData('limu.csv', 'limu');
// const invertDataGroupedByIndex = fetchData('invert.csv', 'invert');

// Export all datasets as an object
export const speciesData = {
    fish: fishDataGroupedByIndex,
    // limu: limuDataGroupedByIndex,
    // invert: invertDataGroupedByIndex
};


// Use the data as needed
// console.log('Fish Data:', JSON.stringify(fishDataGroupedByIndex, null, 2));
// console.log('Limu Data:', JSON.stringify(limuDataGroupedByIndex, null, 2));
// console.log('Invertebrates Data:', JSON.stringify(invertDataGroupedByIndex, null, 2));

