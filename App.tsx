/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroScreen from './components/IntroScreen';
import OnboardingScreen from './components/OnboardingScreen';
import StartScreen from './components/StartScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import FingerPrintScanner from './components/FingerPrintScanner';
import CreateList from './components/CreateList';
import ListPage from './components/ListPage';
import IndexScreen from './components/IndexScreen';
import CategoryScreen from './components/CategoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Intro">
          {props => (
            <IntroScreen
              onNext={() => props.navigation.navigate('Onboarding1')}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Onboarding1">
          {props => (
            <OnboardingScreen
              {...props}
              title="Manage your grocery list"
              description="You can easily manage all of your daily grocery lists in GroceryTodo for free."
              image={null}
              onNext={() => props.navigation.navigate('Onboarding2')}
              showBack={false}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Onboarding2">
          {props => (
            <OnboardingScreen
              {...props}
              title="Create daily routine"
              description="In GroceryTodo you can create your personalized routine to stay productive."
              image={null}
              onNext={() => props.navigation.navigate('Onboarding3')}
              onBack={() => props.navigation.goBack()}
              showBack={true}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Onboarding3">
          {props => (
            <OnboardingScreen
              {...props}
              title="Organize your grocery list"
              description="You can organize your daily grocery lists by adding your items into separate categories."
              image={null}
              onNext={() => props.navigation.navigate('Start')}
              onBack={() => props.navigation.goBack()}
              showBack={true}
              buttonText="GET STARTED"
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Start">
          {props => (
            <StartScreen
              onLogin={() => props.navigation.navigate('Login')}
              onSignup={() => props.navigation.navigate('Register')}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {props => (
            <LoginScreen
              onLogin={() => props.navigation.navigate('IndexScreen')}
              onGoogle={() => props.navigation.navigate('IndexScreen')}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Register">
          {props => (
            <RegisterScreen
              onRegister={() => props.navigation.navigate('IndexScreen')}
              onGoogle={() => props.navigation.navigate('IndexScreen')}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="FingerPrintScanner" component={FingerPrintScanner} />
        <Stack.Screen name="IndexScreen" component={IndexScreen} />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
        <Stack.Screen name="CreateList">
          {props => (
            <CreateList 
              onAdd={() => props.navigation.navigate('IndexScreen')} 
              navigation={props.navigation}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="ListPage" component={ListPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
