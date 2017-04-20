import {downloadStart, downloadResolve} from '../redux';
import {Linking,Settings} from 'react-native';
export function downloadApp(dispatch, bundleId, domainName){
  try{
    //catch this call because it will return exception always
    dispatch(downloadStart(bundleId));
    Linking.openURL('itms-services://?action=download-manifest&url=https://'+domainName+'/api/apps/'+bundleId+'/ios')
    .catch(function(ex){
      console.log(ex);
    });
  }
  catch(ex){
  }
  setTimeout(function(){
    dispatch(downloadResolve(bundleId));
  }, 1000);
}
