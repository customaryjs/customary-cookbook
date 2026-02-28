import { CustomaryCookbookIndex } from './CustomaryCookbookIndex.js';
export class CustomaryCookbookIndexLoader {
    static async loadIndex() {
        const location = './customary-cookbook-index.json';
        const response = await fetch(import.meta.resolve(location));
        const data_structure = await response.json();
        return new CustomaryCookbookIndex(data_structure);
    }
}
//# sourceMappingURL=CustomaryCookbookIndexLoader.js.map