import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AuthProvider } from './src/hooks/useAuth';
import { AppModeProvider } from './src/hooks/useAppMode';
import { COLORS } from './src/lib/constants';

// Screens
import MapScreen from './src/screens/MapScreenPixel';
import TrendingScreen from './src/screens/TrendingScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AuthScreen from './src/screens/AuthScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Pixel-styled tab icon
function PixelTabIcon({ emoji, focused }) {
  return (
    <View style={{
      width: 36,
      height: 36,
      backgroundColor: focused ? COLORS.titleBar : COLORS.surface,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopWidth: 2,
      borderLeftWidth: 2,
      borderBottomWidth: 2,
      borderRightWidth: 2,
      borderTopColor: focused ? COLORS.borderDark : '#FFFFFF',
      borderLeftColor: focused ? COLORS.borderDark : '#FFFFFF',
      borderBottomColor: focused ? '#FFFFFF' : COLORS.borderDark,
      borderRightColor: focused ? '#FFFFFF' : COLORS.borderDark,
    }}>
      <Text style={{ fontSize: 18 }}>{emoji}</Text>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === 'Map') {
            return <PixelTabIcon emoji="🗺️" focused={focused} />;
          } else if (route.name === 'Trending') {
            return <PixelTabIcon emoji="🔥" focused={focused} />;
          } else if (route.name === 'Profile') {
            return <PixelTabIcon emoji="👤" focused={focused} />;
          }
        },
        tabBarActiveTintColor: COLORS.text,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopWidth: 2,
          borderTopColor: COLORS.windowBorder,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          marginTop: 4,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Map" 
        component={MapScreen}
        options={{ tabBarLabel: 'Explore' }}
      />
      <Tab.Screen 
        name="Trending" 
        component={TrendingScreen}
        options={{ tabBarLabel: 'Trending' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppModeProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen 
              name="Auth" 
              component={AuthScreen}
              options={{
                presentation: 'modal',
                animation: 'slide_from_bottom',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppModeProvider>
    </AuthProvider>
  );
}
