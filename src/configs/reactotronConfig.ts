import { NativeModules, Platform } from 'react-native';
import Reactotron, { asyncStorage } from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomCommand } from 'reactotron-core-client';

const showStorageDataCommand: CustomCommand = {
  command: 'showStorageData',
  description: 'Mostra todos os dados salvos no AsyncStorage da aplicação',
  handler: async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const allData = await AsyncStorage.multiGet(allKeys);
      console.tron?.log?.('Dados salvos no AsyncStorage:', allData);
    } catch (error) {
      console.tron?.log?.('Erro ao mostrar os dados do AsyncStorage:', error);
    }
  },
};

let scriptHostname;

if (__DEV__) {
  const emulatorIP = '10.0.2.2';

  const { scriptURL } = NativeModules.SourceCode;
  scriptHostname = scriptURL.split('://')[1].split(':')[0];

  Reactotron.configure({
    host: Platform.OS === 'ios' ? scriptHostname : emulatorIP,
  })
    .useReactNative()
    .use(asyncStorage({}))
    .connect();

  Reactotron.onCustomCommand(showStorageDataCommand);
  console.tron = Reactotron;
}
