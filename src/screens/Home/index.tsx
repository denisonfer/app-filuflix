import React, { useEffect, useState } from 'react';
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
  textStyle,
  titleStyle,
} from './styles';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [topMovies, setTopMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    async function loadTopMovies() {
      try {
        const { data } = await api.get<IGetTopRatedMovies>(
          `movie/top_rated?${keyMoviesApi}&language=pt-BR`,
        );

        setTopMovies(data.results);
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
          <Text className={titleStyle}>Filme mais votados</Text>
          <FlatList
            data={topMovies}
            keyExtractor={movie => String(movie.id)}
            horizontal
            renderItem={({ item: movie }) => (
              <TouchableOpacity className={containerMovie}>
                <Image
                  className={posterMovie}
                  resizeMode="cover"
                  resizeMethod="auto"
                  source={{ uri: `${ulrImages}${movie.poster_path}` }}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default Home;
