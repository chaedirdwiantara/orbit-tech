import {
  Image,
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {color} from '../theme';
import {Button, TopNavigation} from '../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigations';
import GetLocation from 'react-native-get-location';
import {launchCamera} from 'react-native-image-picker';

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [picture, setpicture] = useState(
    'https://previews.123rf.com/images/aguiters/aguiters1508/aguiters150800059/43551287-photo-camera-icon.jpg',
  );
  const [toggle, settoggle] = useState(true);
  const requestCameraPermission = async () => {
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
          cameraType: 'font',
        });
        setpicture(result?.assets[0]?.uri);
        settoggle(false);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const checkPermissionOFGps = async () => {
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
        getCurrentLocation();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = async () => {
    await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        if (location) {
          navigation.navigate('Maps', {
            latitude: location.latitude,
            longitude: location.longitude,
            picture,
          });
        }
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  return (
    <View style={styles.container}>
      <TopNavigation.Type2
        title="Take a selfie"
        itemStrokeColor={color.Neutral[10]}
      />
      {/* <View style={styles.bodyContainer}>
        
        
      </View> */}
      <TouchableOpacity
        onPress={() => {
          requestCameraPermission();
        }}
        activeOpacity={0.8}
        style={{
          backgroundColor: '#F3F3F3',
          flex: 0.7,
          justifyContent: 'center',
        }}>
        <Image
          style={{flex: 1, resizeMode: 'contain'}}
          source={{uri: picture}}
        />
      </TouchableOpacity>
      <Button label="Continue" onPress={checkPermissionOFGps} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
