import { fetchData } from './DataFetcher.js';

const fishDataGroupedByIndex = fetchData('fishes.csv', 'fishes');
const limuDataGroupedByIndex = fetchData('limu.csv', 'limu');
const invertDataGroupedByIndex = fetchData('invert.csv', 'invert');

export const speciesData = {
    fish: fishDataGroupedByIndex,
    limu: limuDataGroupedByIndex,
    invert: invertDataGroupedByIndex
};