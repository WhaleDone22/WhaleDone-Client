import { Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import useWhaledoneFonts from './infrastructures/hooks/useWhaledoneFonts';

export default function App() {
  const { interFontsLoaded, fontsLoaded } = useWhaledoneFonts();

  if (!interFontsLoaded || !fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View>
      <Text>Whale Done</Text>
    </View>
  );
}
