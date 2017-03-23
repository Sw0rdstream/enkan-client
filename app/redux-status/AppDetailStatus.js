export default class AppDetailStatus{
 /**
  * original JSON data of each app info
  * @type {Object}
  */
  data = null;

  /**
   * Whether this app is in downloading
   * @type {Boolean}
   */
   isDownloading = false;

  constructor(appData){
    this.data = appData;
    this.isDownloading = false;
  }
}
