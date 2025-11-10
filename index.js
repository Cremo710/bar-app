// import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
// import { LogBox } from 'react-native';
import App from './App';

// Ignora i warning specifici
// LogBox.ignoreLogs([
//   'Non-serializable values were found in the navigation state',
// ]);

// Registra il componente principale dell'app
registerRootComponent(App);
