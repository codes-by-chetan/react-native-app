import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import {HomeScreen} from '../screens/HomeScreen';
import {SearchScreen} from '../screens/SearchScreen';
import {MovieDetailsScreen} from '../screens/MovieDetailsScreen';
import {UploadReviewScreen} from '../screens/UploadReviewScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

// /* build-ref:delta */
export const RootNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: '#111827'},
      headerTintColor: '#f9fafb',
      contentStyle: {backgroundColor: '#030712'},
    }}>
    <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Popular Movies'}} />
    <Stack.Screen name="Search" component={SearchScreen} options={{title: 'Search'}} />
    <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} options={{title: 'Details'}} />
    <Stack.Screen name="UploadReview" component={UploadReviewScreen} options={{title: 'Upload Review'}} />
  </Stack.Navigator>
);
