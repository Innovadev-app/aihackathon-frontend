import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StatusBar } from 'react-native';
import { Theme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { NativeWindStyleSheet } from 'nativewind';
import TabBarIcon from '../components/TabBarIcon';

import Connect from './connect';
import Goals from './goals';
import Index from './index';
import Pray from './pray';
import Profile from './profile';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// KEEP https://expo.github.io/router/docs/features/routing/#layout-settings
// eslint-disable-next-line camelcase, @typescript-eslint/naming-convention
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// For web styles
NativeWindStyleSheet.setOutput({
  default: 'native',
});



export default function RootLayout() {
  const [loaded, error] = useFonts({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, global-require
    ...FontAwesome.font,
  });



  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {loaded ? (
        <>
          <StatusBar barStyle="light-content" />
          <NavigationContainer theme={DarkTheme}>
            <RootLayoutNav />
          </NavigationContainer>
        </>
        ) : false}
    </>
  );
}

const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: 'rgb(0, 122, 255)',
    background: 'rgb(9, 9, 9)',
    card: 'rgb(9, 9, 9)',
    text: 'rgb(255, 255, 255)',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
  },
};

function RootLayoutNav() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Timothy"
    
    screenOptions={{
      tabBarStyle: { backgroundColor: 'black' },
      tabBarActiveTintColor: '#00aba9',
      tabBarInactiveTintColor: '#BEC3C9',
      
    }}
    >
        <Tab.Screen
      name="Goals"
      component={Goals}
      options={{
        tabBarIcon: (props) => <TabBarIcon {...props} name='Goals' />,
      }}
    />
    <Tab.Screen
      name="Pray"
      component={Pray}
      options={{
        tabBarIcon: (props) => <TabBarIcon {...props} name='Pray' />,
      }}
    />
    <Tab.Screen
      name="Timothy"
      component={Index}
      options={{
        tabBarIcon: (props) => <TabBarIcon {...props} name='Timothy' />,
      }}
    />
    <Tab.Screen
      name="Connect"
      component={Connect}
      options={{
        tabBarIcon: (props) => <TabBarIcon {...props} name='Connect' />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: (props) => <TabBarIcon {...props} name='Profile' />,
      }}
    />
    </Tab.Navigator>
  );
}