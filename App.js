// App.js
// Web  → fills complete browser screen (like LinkedIn / full website)
// Mobile → fills complete phone screen
// NO phone frame, NO side panels, NO mockup

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, Platform, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguageProvider } from './src/context/LanguageContext';

import LoginScreen             from './src/screens/LoginScreen';
import SplashScreen            from './src/screens/SplashScreen';
import LanguageScreen          from './src/screens/LanguageScreen';
import HomeScreen              from './src/screens/HomeScreen';
import CameraScreen            from './src/screens/CameraScreen';
import AnalyzingScreen         from './src/screens/AnalyzingScreen';
import ResultScreen            from './src/screens/ResultScreen';
import TreatmentScreen         from './src/screens/TreatmentScreen';
import CalculatorScreen        from './src/screens/CalculatorScreen';
import WeatherScreen           from './src/screens/WeatherScreen';
import HistoryScreen           from './src/screens/HistoryScreen';
import CalendarScreen          from './src/screens/CalendarScreen';
import ProgressScreen          from './src/screens/ProgressScreen';
import HeatmapScreen           from './src/screens/HeatmapScreen';
import PreventionGuideScreen   from './src/screens/PreventionGuideScreen';
import DiseaseSimulationScreen from './src/screens/DiseaseSimulationScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isReady,      setIsReady]      = useState(false);
  const [initialRoute, setInitialRoute] = useState('Login');

  useEffect(() => { checkStatus(); }, []);

  const checkStatus = async () => {
    try {
      const loginDone       = await AsyncStorage.getItem('loginDone');
      const firstLaunchDone = await AsyncStorage.getItem('firstLaunchDone');
      if (!loginDone)            setInitialRoute('Login');
      else if (!firstLaunchDone) setInitialRoute('Language');
      else                       setInitialRoute('Home');
    } catch {
      setInitialRoute('Login');
    } finally {
      setIsReady(true);
    }
  };

  if (!isReady) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#2ea84f" size="large" />
      </View>
    );
  }

  return (
    <LanguageProvider>
      <View style={styles.root}>
        <NavigationContainer>
          <StatusBar style="light" backgroundColor="#040d06" />
          <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
              headerShown:      false,
              cardStyle:        { backgroundColor: '#040d06' },
              animationEnabled: true,
              gestureEnabled:   false,
            }}
          >
            <Stack.Screen name="Login"             component={LoginScreen}            options={{ gestureEnabled: false }} />
            <Stack.Screen name="Language"          component={LanguageScreen}         options={{ gestureEnabled: false }} />
            <Stack.Screen name="Splash"            component={SplashScreen}           options={{ gestureEnabled: false }} />
            <Stack.Screen name="Home"              component={HomeScreen}             options={{ gestureEnabled: false }} />
            <Stack.Screen name="Camera"            component={CameraScreen} />
            <Stack.Screen name="Analyzing"         component={AnalyzingScreen} />
            <Stack.Screen name="Result"            component={ResultScreen} />
            <Stack.Screen name="Treatment"         component={TreatmentScreen} />
            <Stack.Screen name="Calculator"        component={CalculatorScreen} />
            <Stack.Screen name="Weather"           component={WeatherScreen} />
            <Stack.Screen name="History"           component={HistoryScreen} />
            <Stack.Screen name="Calendar"          component={CalendarScreen} />
            <Stack.Screen name="Progress"          component={ProgressScreen} />
            <Stack.Screen name="Heatmap"           component={HeatmapScreen} />
            <Stack.Screen name="PreventionGuide"   component={PreventionGuideScreen} />
            <Stack.Screen name="DiseaseSimulation" component={DiseaseSimulationScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#040d06',
    justifyContent: 'center',
    alignItems: 'center',
  },

  root: {
    flex: 1,
    backgroundColor: '#040d06',
  },
});
