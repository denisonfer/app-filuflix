import React, { Fragment, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from 'react-native';

import { api } from '../../services/api';
import { keyMoviesApi, ulrImages } from '../../configs/configs';
import { IGetTopRatedMovies, IMovie } from './types';
import colors from 'tailwindcss/colors';

import {
  containerMovie,
  containerStyle,
  contentStyle,
  posterMovie,
  rowButtons,
  svgStyle,
  textStyle,
  titleStyle,
} from './styles';

import { Svg, Text as TextSvg } from 'react-native-svg';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [topMovies, setTopMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    async function loadTopMovies() {
      try {
        const { data } = await api.get<IGetTopRatedMovies>(
          `movie/top_rated?${keyMoviesApi}&language=pt-BR`,
        );

        setTopMovies(data.results.slice(0, 10));
        setLoading(false);
      } catch (error) {
        console.tron.log(
          '[ERROR] - loadTopMovies ====================================',
        );
        console.tron.log(error);
      }
    }

    loadTopMovies();
  }, []);

  return (
    <ScrollView
      className={containerStyle}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {loading ? (
        <ActivityIndicator size="large" color={colors.white[900]} />
      ) : (
        <View className={contentStyle}>
          <Text className={titleStyle}>Top 10 do público</Text>
          <FlatList
            data={topMovies}
            keyExtractor={movie => String(movie.id)}
            horizontal
            renderItem={({ item: movie, index }) => (
              <View className={containerMovie}>
                <Svg height="60" width="200" className={svgStyle}>
                  <TextSvg
                    fill="black"
                    stroke="purple"
                    fontSize="80"
                    fontWeight="bold"
                    x="50"
                    y="60"
                    textAnchor="middle"
                  >
                    {index + 1}
                  </TextSvg>
                </Svg>
                <TouchableOpacity>
                  <Image
                    className={posterMovie}
                    resizeMode="cover"
                    resizeMethod="auto"
                    source={{ uri: `${ulrImages}${movie.poster_path}` }}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default Home;
