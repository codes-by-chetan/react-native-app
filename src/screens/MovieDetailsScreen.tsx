import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CastList} from '../components/CastList';
import {ReviewItem} from '../components/ReviewItem';
import {RootStackParamList} from '../navigation/types';
import {tmdbApi} from '../services/tmdb';
import {CastMember, MovieDetail, Review} from '../types/movie';
import {getBackdropUrl, getPosterUrl} from '../utils/image';

type Props = NativeStackScreenProps<RootStackParamList, 'MovieDetails'>;

// /* build-ref:delta */
export const MovieDetailsScreen = ({route}: Props) => {
  const {movieId} = route.params;
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewPage, setReviewPage] = useState(1);
  const [reviewTotalPages, setReviewTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMovieData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [details, credits, reviewResponse] = await Promise.all([
        tmdbApi.getMovieDetails(movieId),
        tmdbApi.getMovieCredits(movieId),
        tmdbApi.getMovieReviews(movieId, 1),
      ]);

      setMovie(details);
      setCast(credits.cast ?? []);
      setReviews(reviewResponse.results ?? []);
      setReviewPage(reviewResponse.page);
      setReviewTotalPages(reviewResponse.total_pages);
    } catch (err) {
      setError('Failed to load movie details.');
    } finally {
      setLoading(false);
    }
  }, [movieId]);

  const loadMoreReviews = useCallback(async () => {
    if (loadingReviews || reviewPage >= reviewTotalPages) {
      return;
    }
    setLoadingReviews(true);
    try {
      const nextPage = reviewPage + 1;
      const response = await tmdbApi.getMovieReviews(movieId, nextPage);
      setReviews(prev => [...prev, ...response.results]);
      setReviewPage(response.page);
    } finally {
      setLoadingReviews(false);
    }
  }, [loadingReviews, movieId, reviewPage, reviewTotalPages]);

  useEffect(() => {
    loadMovieData();
  }, [loadMovieData]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color="#f9fafb" />
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error ?? 'No movie data found.'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen}>
      <Image source={{uri: getBackdropUrl(movie.backdrop_path)}} style={styles.backdrop} />
      <View style={styles.headerRow}>
        <Image source={{uri: getPosterUrl(movie.poster_path)}} style={styles.poster} />
        <View style={styles.headerMeta}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.meta}>{movie.release_date}</Text>
          <Text style={styles.meta}>Runtime: {movie.runtime ?? 'N/A'} min</Text>
          <Text style={styles.meta}>Genres: {movie.genres.map(g => g.name).join(', ') || 'N/A'}</Text>
          <Text style={styles.rating}>
            ⭐ {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Cast</Text>
      <CastList cast={cast} />

      <Text style={styles.sectionTitle}>Reviews</Text>
      <FlatList
        data={reviews}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ReviewItem review={item} />}
        scrollEnabled={false}
        ListEmptyComponent={<Text style={styles.meta}>No reviews available.</Text>}
      />
      {reviewPage < reviewTotalPages ? (
        <TouchableOpacity onPress={loadMoreReviews} style={styles.loadMore}>
          <Text style={styles.loadMoreText}>Load More Reviews</Text>
        </TouchableOpacity>
      ) : null}
      {loadingReviews ? <ActivityIndicator color="#f9fafb" /> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#030712'},
  centered: {flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#030712'},
  error: {color: '#f87171'},
  backdrop: {width: '100%', height: 180, backgroundColor: '#111827'},
  headerRow: {flexDirection: 'row', padding: 12, gap: 12},
  poster: {width: 110, height: 160, borderRadius: 8, backgroundColor: '#111827'},
  headerMeta: {flex: 1},
  title: {color: '#f9fafb', fontSize: 22, fontWeight: '700', marginBottom: 6},
  meta: {color: '#9ca3af', marginBottom: 4},
  rating: {color: '#fbbf24', fontWeight: '700', marginTop: 4},
  sectionTitle: {color: '#f9fafb', fontSize: 18, fontWeight: '700', paddingHorizontal: 12, marginTop: 10},
  loadMore: {
    margin: 12,
    borderRadius: 10,
    backgroundColor: '#1d4ed8',
    paddingVertical: 10,
    alignItems: 'center',
  },
  loadMoreText: {color: '#f9fafb', fontWeight: '700'},
});
