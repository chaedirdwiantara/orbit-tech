import {PermissionsAndroid} from 'react-native';
import GetLocation from 'react-native-get-location';
import {launchCamera} from 'react-native-image-picker';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigations'; // Adjust the import path as necessary

export const requestCameraPermission = async (
  setPicture: React.Dispatch<React.SetStateAction<string>>,
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
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
      const result = await launchCamera({
        mediaType: 'photo',
      });
      if (result.assets && result.assets.length > 0) {
        setPicture(result.assets[0].uri ?? '');
        setToggle(false);
      }
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const checkPermissionOFGps = async (
  navigate: NativeStackNavigationProp<RootStackParams>,
  picture: string
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
      getCurrentLocation(navigate, picture);
    } else {
      console.log('GPS permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const getCurrentLocation = async (
  navigate: NativeStackNavigationProp<RootStackParams>,
  picture: string
): Promise<void> => {
  await GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
    .then(location => {
      navigate.navigate('Maps', {
        latitude: location.latitude,
        longitude: location.longitude,
        picture,
      });
    })
    .catch(error => {
      console.warn(error.code, error.message);
    });
};
