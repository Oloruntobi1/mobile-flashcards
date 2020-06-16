import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import useLinking from './navigation/useLinking';

import HomeScreen from './screens/HomeScreen';
import DeckScreen from './screens/DeckScreen';
import AddCardScreen from './screens/AddCardScreen'
import QuizScreen from './screens/QuizScreen'
import AddDeckScreen from './screens/AddDeckScreen';

import { setLocalNotification } from './notification/notification'

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  setLocalNotification()

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    // getPushNotificationPermissions();
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

 

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator>
            {/* <Stack.Screen name="Root" component={BottomTabNavigator} /> */}
            <Stack.Screen
              name="Root"
              component={HomeScreen}
              options={{
                title: 'Decks',
              }}
            />
            <Stack.Screen 
              name="AddDeck"
              component={AddDeckScreen}
              options={{
                title: 'Add Deck'
              }}
            />

            <Stack.Screen 
              name="Deck"
              component={DeckScreen}
              options={{
                title: 'Deck'
              }}
            />

            <Stack.Screen 
              name="AddCard"
              component={AddCardScreen}
              options={{
                title: 'Add Card'
              }}
            />

            <Stack.Screen 
              name="Quiz"
              component={QuizScreen}
              options={{
                title: 'Quiz'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


