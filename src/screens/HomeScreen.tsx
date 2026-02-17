import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MovieCard} from '../components/MovieCard';
import {RootStackParamList} from '../navigation/types';
import {tmdbApi} from '../services/tmdb';
import {Movie} from '../types/movie';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

// /* build-ref:delta */
export const HomeScreen = ({navigation}: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isFetchingRef = useRef(false);

  const canLoadMore = useMemo(() => !loading && page < totalPages, [loading, page, totalPages]);

  const fetchPopular = useCallback(async (targetPage: number, replace = false) => {
    if (isFetchingRef.current) {
      return;
    }

    isFetchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const response = await tmdbApi.getPopularMovies(targetPage);
      setPage(response.page);
      setTotalPages(response.total_pages);
      setMovies(prev => {
        if (replace || targetPage === 1) {
          return response.results;
        }
        const ids = new Set(prev.map(item => item.id));
        const unique = response.results.filter(item => !ids.has(item.id));
        return [...prev, ...unique];
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load popular movies.';
      setError(message);
    } finally {
      isFetchingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPopular(1, true);
  }, [fetchPopular]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPopular(1, true);
    setRefreshing(false);
  }, [fetchPopular]);

  return (
    <View style={styles.screen}>
      <View style={styles.topActions}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.actionBtn}>
          <Text style={styles.actionText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UploadReview')} style={styles.actionBtn}>
          <Text style={styles.actionText}>Upload Review</Text>
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      <FlatList
        data={movies}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <MovieCard movie={item} onPress={movieId => navigation.navigate('MovieDetails', {movieId})} />
        )}
        onEndReachedThreshold={0.4}
        initialNumToRender={6}
        maxToRenderPerBatch={8}
        windowSize={7}
        removeClippedSubviews
        onEndReached={() => {
          if (canLoadMore) {
            fetchPopular(page + 1);
          }
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListFooterComponent={loading ? <ActivityIndicator color="#f9fafb" /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#030712', padding: 12},
  topActions: {flexDirection: 'row', gap: 8, marginBottom: 10},
  actionBtn: {
    backgroundColor: '#1d4ed8',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionText: {color: '#f9fafb', fontWeight: '700'},
  error: {color: '#f87171', marginBottom: 8},
});
