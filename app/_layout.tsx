import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider } from 'react-redux';

import useLoadFromMemory from '@hooks/startup/useLoadFromMemory';
import { PaperProvider } from 'react-native-paper';
import { useColorScheme } from '../src/hooks/useColorScheme';
import store from '../src/store';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <Provider store={store}>
      <App colorScheme={colorScheme} />
    </Provider>
  );
}

const App = ({ colorScheme }: { colorScheme: ReturnType<typeof useColorScheme> }) => {
  const ready = useLoadFromMemory(['countdown']);
  if (ready) {
    return <PaperProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false, title: "Home" }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="pages/Cruises/[shipCode]" options={{ title: "Cruise Search" }} />
          <Stack.Screen name="pages/Cruises/Itinerary/[itineraryId]" options={{ title: "Cruise Itineraries" }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </PaperProvider>
  } else {
    return null;
  }
}
