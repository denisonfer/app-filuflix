import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import HomeScreen from '../screens/Home';
import DetailMovieScreen from '../screens/DetailMovie';

export type RootStackParamList = {
  HomeScreen: undefined;
  DetailMovieScreen: {
    movieId: number;
    title: string;
    image: string;
    overview: string;
  };
};

export type PropsStackScreens = NativeStackNavigationProp<RootStackParamList>;
export type RoutePropsScreens = RouteProp<
  RootStackParamList,
  'DetailMovieScreen'
>;

const SharedStack = createSharedElementStackNavigator<RootStackParamList>();

const Routes = () => {
  return (
    <NavigationContainer>
      <SharedStack.Navigator>
        <SharedStack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <SharedStack.Screen
          name="DetailMovieScreen"
          component={DetailMovieScreen}
          options={{
            headerShown: false,
            headerBackTitleVisible: false,
            cardStyleInterpolator: ({ current: { progress } }) => {
              return {
                cardStyle: {
                  opacity: progress,
                },
              };
            },
          }}
        />
      </SharedStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
