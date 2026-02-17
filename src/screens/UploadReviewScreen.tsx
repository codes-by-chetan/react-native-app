import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

// /* build-ref:delta */
export const UploadReviewScreen = () => {
  const [reviewText, setReviewText] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const chooseImage = async () => {
    try {
      const file = await DocumentPicker.pickSingle({type: [DocumentPicker.types.images]});
      setFileName(file.name ?? 'Selected image');
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        Alert.alert('Error', 'Unable to select image.');
      }
    }
  };

  const uploadReview = async () => {
    if (!reviewText.trim()) {
      Alert.alert('Validation', 'Please enter your review text.');
      return;
    }

    setUploading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setUploading(false);
    Alert.alert('Success', 'Review submitted successfully.');
    setReviewText('');
    setFileName(null);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.label}>Review</Text>
      <TextInput
        style={styles.input}
        placeholder="Write your review"
        placeholderTextColor="#6b7280"
        multiline
        value={reviewText}
        onChangeText={setReviewText}
      />

      <TouchableOpacity style={styles.secondaryBtn} onPress={chooseImage}>
        <Text style={styles.secondaryBtnText}>{fileName ?? 'Pick an image'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.primaryBtn} onPress={uploadReview} disabled={uploading}>
        <Text style={styles.primaryBtnText}>{uploading ? 'Uploading...' : 'Upload Review'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1, padding: 12, backgroundColor: '#030712'},
  label: {color: '#f9fafb', fontWeight: '700', marginBottom: 8},
  input: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 10,
    padding: 10,
    color: '#f9fafb',
    backgroundColor: '#111827',
    marginBottom: 12,
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  secondaryBtnText: {color: '#e5e7eb'},
  primaryBtn: {backgroundColor: '#1d4ed8', borderRadius: 10, padding: 12, alignItems: 'center'},
  primaryBtnText: {color: '#f9fafb', fontWeight: '700'},
});
