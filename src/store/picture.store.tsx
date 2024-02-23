import {Image as ImageProps} from 'react-native-image-crop-picker';
import create from 'zustand';

interface PictureProps {
  picture: ImageProps | undefined;
  setPicture: (value: ImageProps | undefined) => void;
}

export const pictureStore = create<PictureProps>(set => ({
  picture: undefined,
  setPicture: (value: ImageProps | undefined) => set({picture: value}),
}));
