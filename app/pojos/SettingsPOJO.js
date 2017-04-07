export default class SettingsPOJO{
  serverDomain = null;
  enablePush = false;

  constructor(obj){
    if(obj){
      Object.assign(this, obj);
    }
  }
}
