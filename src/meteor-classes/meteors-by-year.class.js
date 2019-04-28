import { ascending } from "d3-array";

export class MeteorsByYearClass {
  constructor(meteors) {
    this.meteors = MeteorsByYearClass.formatMeteorsByYears(meteors);
    this.years = this.extractYearsFromMeteors().sort(ascending);
  }

  getAvailableYears() {
    return this.years;
  }

  getMeteorsForYear(year) {
    return this.meteors[year];
  }

  getMeteorArray() {
    return this.years.map(year => ({
      year,
      count: this.meteors[year] ? this.meteors[year].length : 0,
      mass: this.meteors[year]
        ? this.meteors[year].reduce((count, meteor) => count + +meteor.mass, 0)
        : 0
    }));
  }

  static formatMeteorsByYears(meteorArray) {
    return meteorArray.reduce((meteorsByYear, meteor) => {
      if (meteorsByYear.hasOwnProperty(meteor.year)) {
        meteorsByYear[meteor.year].push(meteor);
      } else {
        meteorsByYear[meteor.year] = [meteor];
      }
      return meteorsByYear;
    }, {});
  }

  extractYearsFromMeteors() {
    return Object.keys(this.meteors);
  }
}
