export class SearchResult {
    id: string;
    owner: string;
    secret: string;
    farm: string;
    title: string;
    server: string;
    liked: boolean;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.title = obj && obj.title || null;
        this.owner = obj && obj.owner || null;
        this.farm = obj && obj.farm || null;
        this.secret = obj && obj.secret || null;
        this.server = obj && obj.server || null;
        this.liked = obj && obj.liked || false;
    }

    imageUrl(): string {
        return `https://farm${this.farm}.staticflickr.com/${this.server}/${this.id}_${this.secret}_m.jpg`;
    }
}