import AppLoading from 'expo-app-loading';
import useWhaledoneFonts from './infrastructures/hooks/useWhaledoneFonts';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Screens from './presentation/screens';

export default function App() {
  const { interFontsLoaded, fontsLoaded } = useWhaledoneFonts();

  if (!interFontsLoaded || !fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <Screens />
    </SafeAreaProvider>
  );
}
