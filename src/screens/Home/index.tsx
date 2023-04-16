import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { containerStyle, textStyle } from './styles';

const Home = () => {
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {}, []);

  return (
    <View className={containerStyle}>
      <Text className={textStyle}>FiluFLIX</Text>
    </View>
  );
};

export default Home;
