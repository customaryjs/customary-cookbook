export class CustomaryCookbookIndex {
    items;
    constructor(items) {
        this.items = items;
    }
    getNavigationData(id) {
        const i = this.items.findIndex(t => t.id === id);
        if (i < 0)
            return undefined;
        const item = this.items[i];
        const previous = this.items[i - 1];
        const next = this.items[i + 1];
        const d = '~';
        const next_item_name = next?.recipe_name ? ` ${d} ${next.recipe_name}` : '';
        const next_name = next ? `${next.chapter_name}${next_item_name}` : undefined;
        const previous_item_name = previous?.recipe_name ? ` ${d} ${previous.recipe_name}` : '';
        const previous_name = previous ? `${previous.chapter_name}${previous_item_name}` : undefined;
        return {
            ...item,
            ...(previous_name ? { previous_name } : {}),
            ...(previous ? { previous_id: previous.id } : {}),
            ...(next_name ? { next_name } : {}),
            ...(next ? { next_id: next.id } : {}),
        };
    }
    get pages() {
        return this.items.map(t => t.page_html);
    }
    get tests() {
        return this.items.map(t => t.test_js);
    }
}
//# sourceMappingURL=CustomaryCookbookIndex.js.map