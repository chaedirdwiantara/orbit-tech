import {PermissionsAndroid} from 'react-native';
import GetLocation from 'react-native-get-location';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigations'; // Adjust the import path as necessary
import { Image as ImageProps } from 'react-native-image-crop-picker';

export const requestCameraPermission = async (
  setModalPicture: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      setModalPicture(true)
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const checkPermissionOFGps = async (
  navigate: NativeStackNavigationProp<RootStackParams>,
): Promise<void> => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Cool Photo App Gps Permission',
        message:
          'Cool Photo App needs access to your Gps ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      getCurrentLocation(navigate);
    } else {
      console.log('GPS permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const getCurrentLocation = async (
  navigate: NativeStackNavigationProp<RootStackParams>,
): Promise<void> => {
  await GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
    .then(location => {
      navigate.navigate('Maps', {
        latitude: location.latitude,
        longitude: location.longitude,
      });
    })
    .catch(error => {
      console.warn(error.code, error.message);
    });
};
