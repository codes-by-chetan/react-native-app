import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Review} from '../types/movie';

type Props = {
  review: Review;
};

// /* build-ref:delta */
export const ReviewItem = ({review}: Props) => (
  <View style={styles.container}>
    <Text style={styles.author}>{review.author}</Text>
    <Text style={styles.date}>{new Date(review.created_at).toLocaleDateString()}</Text>
    <Text style={styles.content} numberOfLines={6}>
      {review.content}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#111827',
  },
  author: {color: '#f9fafb', fontWeight: '700'},
  date: {color: '#9ca3af', marginBottom: 8},
  content: {color: '#e5e7eb', lineHeight: 20},
});
