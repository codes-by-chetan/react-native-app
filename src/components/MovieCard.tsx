import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Movie} from '../types/movie';
import {getPosterUrl} from '../utils/image';

type Props = {
  movie: Movie;
  onPress: (movieId: number) => void;
};

// /* build-ref:delta */
export const MovieCard = ({movie, onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(movie.id)}>
      <Image source={{uri: getPosterUrl(movie.poster_path)}} style={styles.poster} />
      <View style={styles.meta}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.subtitle}>{movie.release_date || 'Unknown release'}</Text>
        <Text style={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#1f2937',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  poster: {
    width: 90,
    height: 130,
    backgroundColor: '#111827',
  },
  meta: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  title: {
    color: '#f9fafb',
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    color: '#9ca3af',
  },
  rating: {
    color: '#fbbf24',
    fontWeight: '700',
  },
});
