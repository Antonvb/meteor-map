export class MeteorDataRequestClass {

    pageSize = 50;

    requestUrl = 'https://data.nasa.gov/resource/y77d-th95.json';

    async requestPage(page = 0) {
        const offset = this.getRequestOffset(page);
        return await fetch(this.getRequestUrl(offset)).then(response => response.json());
    }

    getRequestUrl(offset) {
        return `${this.requestUrl}?$limit=${this.pageSize}&$offset=${offset}`;
    }

    getRequestOffset(page) {
        return page * this.pageSize;
    }
}