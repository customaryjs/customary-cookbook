type Recipe = {
    id: string;
    chapter_name: string;
    recipe_name?: string;
    page_html: string;
    test_ts: string;
    test_js: string;
    github_page_html: string;
    github_dir: string;
}

type ChapterRecipe = {id: string; name: string; is_current: boolean};

type Chapter = {chapter_name: string; recipes: Array<ChapterRecipe>};

export type NavigationData = Recipe & {
    previous_id?: string;
    previous_name?: string;
    next_id?: string;
    next_name?: string;
}

export class CustomaryCookbookIndex {
    constructor(private readonly items: Array<Recipe>) {}

    buildChapters(currentId: string): Chapter[] {
        const chapterMap = new Map<string, Chapter>();
        for (const recipe of this.items) {
            if (!chapterMap.has(recipe.chapter_name)) {
                chapterMap.set(recipe.chapter_name, {chapter_name: recipe.chapter_name, recipes: []});
            }
            chapterMap.get(recipe.chapter_name)!.recipes.push({
                id: recipe.id,
                name: recipe.recipe_name ?? recipe.chapter_name,
                is_current: recipe.id === currentId,
            });
        }
        return Array.from(chapterMap.values());
    }

    get firstId(): string { return this.items[0]?.id ?? ''; }
    get lastId(): string { return this.items[this.items.length - 1]?.id ?? ''; }

    getNavigationData(id: string): NavigationData | undefined {
        const i = this.items.findIndex(t => t.id === id);
        if (i < 0) return undefined;
        const item = this.items[i];
        const previous = this.items[i-1];
        const next = this.items[i+1];
        const d = '~';
        const next_item_name = next?.recipe_name ? ` ${d} ${next.recipe_name}` : '';
        const next_name = next ? `${next.chapter_name}${next_item_name}` : undefined;
        const previous_item_name = previous?.recipe_name ? ` ${d} ${previous.recipe_name}` : '';
        const previous_name = previous ? `${previous.chapter_name}${previous_item_name}` : undefined;
        return {
            ...item,
            ...(previous_name ? {previous_name} : {}),
            ...(previous ? {previous_id: previous.id} : {}),
            ...(next_name ? {next_name} : {}),
            ...(next ? {next_id: next.id} : {}),
        };
    }

    get pages(): string[] {
        return this.items.map(t => t.page_html);
    }

    get tests(): string[] {
        return this.items.map(t => t.test_js);
    }
}

export type {Recipe};
