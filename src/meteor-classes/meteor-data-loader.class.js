import { MeteorDataRequestClass } from "./meteor-data-request.class";

export class MeteorDataLoader {
  meteorDataRequestClass = new MeteorDataRequestClass();

  constructor(pages) {
    this.pages = pages;
  }

  async getData() {
    const combinedMeteorData = await this.fetchDataForPages();
    return combinedMeteorData
      .filter(
        ({ mass, year, reclong, reclat }) => mass && year && reclong && reclat
      )
      .map(meteor => {
        meteor.year = meteor.year.substr(0, 4);
        return meteor;
      })
      .filter(({ year }) => year > 1900);
  }

  async fetchDataForPages() {
    let pageRequests = [];
    for (let i = 0; i < this.pages; i++) {
      const newRequest = this.meteorDataRequestClass.requestPage(i);
      pageRequests = [...pageRequests, newRequest];
    }
    return await Promise.all(pageRequests).then((...data) => data.flat(2));
  }
}
