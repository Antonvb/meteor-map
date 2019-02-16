export class MapStateClass {
  static updateCbs = [];

  static sendUpdate(newYear, newMeteors) {
    for (let cb of MapStateClass.updateCbs) {
      cb(newYear, newMeteors);
    }
  }

  static registerCb(cb) {
    MapStateClass.updateCbs.push(cb);
  }
}
