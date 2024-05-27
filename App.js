import { StatusBar } from 'expo-status-bar';

import Routes from './src/routes/router';

export default function App() {
  
  return (

    <>

      <Routes/>

      <StatusBar
        style = 'inverted'
        backgroundColor = '#000'
        translucent = {false}
      />

    </>

  );

}
