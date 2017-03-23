import AppDetailStatus from './AppDetailStatus';
export default class AppListStatus {
  static LOAD_STATUS_INIT_LOADING = -1;
  static LOAD_STATUS_PULL_LOADING = -2;
  static LOAD_STATUS_DONE = 0;
  static LOAD_STATUS_ERROR = 1;

  /**
   * the list of all app data
   * @type {Array<AppDetailStatus>}
   */
  applist = [];

  /**
   * Loading Status
   * @type {Number}
   */
  loadStatus = AppListStatus.LOAD_STATUS_INIT_LOADING;

  constructor(applist){
    this.applist = [];
    if(applist && applist.length && applist.forEach){
      applist.forEach(function(item, index){
        let currentItem = new AppDetailStatus(item);
        this.applist.push(currentItem);
      }.bind(this));
    }
  }
}
