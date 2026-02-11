import {CustomaryCookbookIndex, Recipe} from './CustomaryCookbookIndex.js';

export class CustomaryCookbookIndexLoader {
    static async loadIndex(): Promise<CustomaryCookbookIndex> {
        const location = './customary-cookbook-index.json';
        const response = await fetch(import.meta.resolve(location));
        const data_structure: Recipe[] = await response.json();
        return new CustomaryCookbookIndex(data_structure);
    }
}
