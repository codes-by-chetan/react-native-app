declare module 'react-native-document-picker' {
  type PickedFile = {
    name?: string | null;
    uri: string;
    type?: string | null;
    size?: number | null;
  };

  const DocumentPicker: {
    types: {
      images: string;
    };
    pickSingle: (options: {type: string[]}) => Promise<PickedFile>;
    isCancel: (error: unknown) => boolean;
  };

  export default DocumentPicker;
}

// /* build-ref:delta */
