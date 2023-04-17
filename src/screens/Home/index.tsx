import React, { Fragment, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';

import { api } from '../../services/api';
import { keyMoviesApi, ulrImages } from '../../configs/configs';
import {
  IGenre,
  IGetTopRatedMovies,
  IMovie,
  IResponseGetGenres,
} from './types';
import colors from 'tailwindcss/colors';

import {
  buttonGenderStyle,
  containerMovie,
  containerSearch,
  containerStyle,
  contentStyle,
  posterMovie,
  rowButtons,
  searchStyle,
  svgStyle,
  textButtonGenderStyle,
  textStyle,
  titleStyle,
} from './styles';

import { Svg, Text as TextSvg } from 'react-native-svg';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [topMovies, setTopMovies] = useState<IMovie[]>([]);
  const [topWhatAreWatching, setTopWhatAreWatching] = useState<IMovie[]>([]);
  const [topLatest, setTopLatest] = useState<IMovie>({} as IMovie);
  const [upcoming, setUpcoming] = useState<IMovie[]>([]);
  const [genresList, setGenresList] = useState<IGenre[]>([]);

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
          error,
        );
      }
    }

    async function loadWhatAreWatching() {
      try {
        const { data } = await api.get<IGetTopRatedMovies>(
          `movie/popular?${keyMoviesApi}&language=pt-BR`,
        );

        setTopWhatAreWatching(data.results.slice(0, 10));
        setLoading(false);
      } catch (error) {
        console.tron.log(
          '[ERROR] - loadWhatAreWatching ====================================',
          error,
        );
      }
    }

    async function loadTopLatest() {
      try {
        const { data } = await api.get<IMovie>(
          `movie/latest?${keyMoviesApi}&language=pt-BR`,
        );

        setTopLatest(data);
        setLoading(false);
      } catch (error) {
        console.tron.log(
          '[ERROR] - loadTopLatest ====================================',
          error,
        );
      }
    }

    async function loadUpcoming() {
      try {
        const { data } = await api.get<IGetTopRatedMovies>(
          `movie/upcoming?${keyMoviesApi}&language=pt-BR`,
        );

        setUpcoming(data.results.slice(0, 10));
        setLoading(false);
      } catch (error) {
        console.tron.log(
          '[ERROR] - loadUpcoming ====================================',
          error,
        );
      }
    }

    async function getGenres() {
      try {
        const { data } = await api.get<IResponseGetGenres>(
          `/genre/movie/list?${keyMoviesApi}&language=pt-BR`,
        );
        setGenresList(data.genres);
        setLoading(false);
      } catch (error) {
        console.tron.log(
          '[ERROR] - getGenres ====================================',
          error,
        );
      }
    }

    getGenres();
    loadTopMovies();
    loadWhatAreWatching();
    loadTopLatest();
    loadUpcoming();
  }, []);

  return (
    <ScrollView
      className={containerStyle}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}
    >
      {loading ? (
        <ActivityIndicator size="large" color={colors.white[900]} />
      ) : (
        <View className={contentStyle}>
          <View>
            <Text className={titleStyle}>FiluFLIX</Text>
          </View>

          <View className={containerSearch}>
            <TextInput className={searchStyle} />
          </View>

          <FlatList
            data={genresList}
            keyExtractor={genre => String(genre.id)}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: gender }) => (
              <TouchableOpacity className={buttonGenderStyle}>
                <Text className={textButtonGenderStyle}>{gender.name}</Text>
              </TouchableOpacity>
            )}
          />

          <Text className={titleStyle}>Último lançamento</Text>
          <View className={containerMovie}>
            <TouchableOpacity>
              <Image
                className={posterMovie}
                resizeMode="cover"
                resizeMethod="auto"
                source={{ uri: `${ulrImages}${topLatest.poster_path}` }}
              />
            </TouchableOpacity>
          </View>

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
                    stroke="white"
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

          <Text className={titleStyle}>Em breve</Text>
          <FlatList
            data={upcoming}
            keyExtractor={movie => String(movie.id)}
            horizontal
            renderItem={({ item: movie }) => (
              <View className={containerMovie}>
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

          <Text className={titleStyle}>Top 10 o que estão assistindo</Text>
          <FlatList
            data={topWhatAreWatching}
            keyExtractor={movie => String(movie.id)}
            horizontal
            renderItem={({ item: movie, index }) => (
              <View className={containerMovie}>
                <Svg height="60" width="200" className={svgStyle}>
                  <TextSvg
                    fill="black"
                    stroke="white"
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
