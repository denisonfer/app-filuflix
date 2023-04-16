// @ts-nocheck
import { NativeModules, Platform } from 'react-native';
import Reactotron from 'reactotron-react-native';

//import AsyncStorage from '@react-native-async-storage/async-storage';
//import courseService from '../Services/course';

let scriptHostname;

if (__DEV__) {
  //Put here the emulator IP printed on terminal
  const emulatorIP = '10.0.2.2';

  const { scriptURL } = NativeModules.SourceCode;
  scriptHostname = scriptURL.split('://')[1].split(':')[0];

  const tron = Reactotron.configure({
    host: Platform.OS === 'ios' ? scriptHostname : emulatorIP,
  })
    .useReactNative()
    .connect();

  console.tron = tron;

  /* console.tron.onCustomCommand('show_asyncStorage', () => {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (error, stores) => {
        stores?.map((result, i, store) => {
          console.tron.log({[store[i][0]]: JSON.parse(store[i][1])});
          return true;
        });
      });
    });
  }); */

  /* console.tron.onCustomCommand('get_current_course_modules', () => {
    console.tron.log(courseService.getCurrentCourseModules());
  }); */
}
