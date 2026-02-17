import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MovieCard} from '../components/MovieCard';
import {SearchInput} from '../components/SearchInput';
import {useDebouncedValue} from '../hooks/useDebouncedValue';
import {RootStackParamList} from '../navigation/types';
import {tmdbApi} from '../services/tmdb';
import {Movie} from '../types/movie';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

// /* build-ref:delta */
export const SearchScreen = ({navigation}: Props) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 300);
  const [results, setResults] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isSearchingRef = useRef(false);

  const runSearch = useCallback(async (searchTerm: string, targetPage = 1, replace = true) => {
    if (!searchTerm.trim() || isSearchingRef.current) {
      return;
    }

    isSearchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const response = await tmdbApi.searchMovies(searchTerm.trim(), targetPage);
      setPage(response.page);
      setTotalPages(response.total_pages);
      setResults(prev => {
        if (replace) {
          return response.results;
        }
        const ids = new Set(prev.map(item => item.id));
        const unique = response.results.filter(item => !ids.has(item.id));
        return [...prev, ...unique];
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to search movies.';
      setError(message);
    } finally {
      isSearchingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setPage(1);
      setTotalPages(1);
      setError(null);
      return;
    }

    runSearch(debouncedQuery, 1, true);
  }, [debouncedQuery, runSearch]);

  return (
    <View style={styles.screen}>
      <SearchInput value={query} onChangeText={setQuery} placeholder="Search for a movie" />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {!loading && debouncedQuery.length > 0 && results.length === 0 ? (
        <Text style={styles.empty}>No results found.</Text>
      ) : null}

      <FlatList
        data={results}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <MovieCard movie={item} onPress={movieId => navigation.navigate('MovieDetails', {movieId})} />
        )}
        onEndReachedThreshold={0.4}
        onEndReached={() => {
          if (!loading && page < totalPages) {
            runSearch(debouncedQuery, page + 1, false);
          }
        }}
        ListFooterComponent={loading ? <ActivityIndicator color="#f9fafb" /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#030712', padding: 12},
  error: {color: '#f87171', marginBottom: 8},
  empty: {color: '#9ca3af', marginTop: 16, textAlign: 'center'},
});
