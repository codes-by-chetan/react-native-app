import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

// /* build-ref:delta */
export const SearchInput = ({value, onChangeText, placeholder}: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder ?? 'Search movies'}
        placeholderTextColor="#6b7280"
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  input: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#374151',
    color: '#f9fafb',
    backgroundColor: '#111827',
  },
});
