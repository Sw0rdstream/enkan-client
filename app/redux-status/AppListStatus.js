import AppDetailStatus from './AppDetailStatus';
export default class AppListStatus {
  static LOAD_STATUS_INIT_LOADING = -1;
  static LOAD_STATUS_PULL_LOADING = -2;
  static LOAD_STATUS_NO_SETTING = 2;
  static LOAD_STATUS_DONE = 0;
  static LOAD_STATUS_ERROR = 1;

  /**
   * the list of all app data
   * @type {Array<AppDetailStatus>}
   */
  applist = [];

  /**
   * the map of all app data
   * @type {Object}
   */
  appmap = {};

  /**
   * Loading Status
   * @type {Number}
   */
  loadStatus = AppListStatus.LOAD_STATUS_NO_SETTING;

  constructor(appListStatus){
    if(appListStatus){
      this.applist = appListStatus.applist;
      this.appmap = appListStatus.appmap;
      this.loadStatus = appListStatus.loadStatus;
    }
  }

  updateList(dataFromServer){
    delete this.applist;
    this.applist = [];

    if(dataFromServer &&  dataFromServer.length && dataFromServer.forEach){
      dataFromServer.forEach(function(item, index){
        let currentItem = new AppDetailStatus(item);
        this.applist.push(currentItem);
        this.appmap[item.bundleId] = currentItem;
      }.bind(this));
    }
  }

}
