import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {CastMember} from '../types/movie';
import {getProfileUrl} from '../utils/image';

type Props = {
  cast: CastMember[];
};

// /* build-ref:delta */
export const CastList = ({cast}: Props) => {
  return (
    <FlatList
      horizontal
      data={cast.slice(0, 10)}
      keyExtractor={item => String(item.id)}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      renderItem={({item}) => (
        <View style={styles.card}>
          <Image source={{uri: getProfileUrl(item.profile_path)}} style={styles.image} />
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.character} numberOfLines={1}>
            {item.character}
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  content: {paddingVertical: 8},
  card: {width: 90, marginRight: 10},
  image: {height: 120, borderRadius: 8, backgroundColor: '#1f2937'},
  name: {color: '#f9fafb', fontWeight: '600', marginTop: 6},
  character: {color: '#9ca3af', fontSize: 12},
});
