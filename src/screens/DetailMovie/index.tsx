import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { RoutePropsScreens } from '../../routes';
import { containerStyles, imageStyles, title } from './styles';
import { SharedElement } from 'react-navigation-shared-element';

const DetailMovieScreen = () => {
  const { params } = useRoute<RoutePropsScreens>();

  return (
    <SafeAreaView className={containerStyles}>
      <View className={containerStyles}>
        <SharedElement id={`image.${params?.movieId}.imageUrl` || ''}>
          <Image
            source={{ uri: params?.image }}
            className={imageStyles}
            resizeMode="cover"
          />
        </SharedElement>

        <Text className={title}>{params?.title}</Text>
      </View>
    </SafeAreaView>
  );
};

DetailMovieScreen.sharedElements = (route: RoutePropsScreens) => {
  const { movieId } = route.params;
  return [
    {
      id: `image.${movieId}.imageUrl`,
      animation: 'move',
      resize: 'clip',
    },
  ];
};

export default DetailMovieScreen;
