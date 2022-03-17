import * as React from 'react';
import AppLoading from 'expo-app-loading';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import useWhaledoneFonts from './infrastructures/hooks/useWhaledoneFonts';
import Screens from './presentation/screens';

export default function App() {
  const { interFontsLoaded, fontsLoaded } = useWhaledoneFonts();

  if (!interFontsLoaded || !fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Screens />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
