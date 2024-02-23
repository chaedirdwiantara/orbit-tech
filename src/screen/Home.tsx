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
import {checkPermissionOFGps, requestCameraPermission} from '../utils';

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [picture, setPicture] = useState<string>(
    'https://previews.123rf.com/images/aguiters/aguiters1508/aguiters150800059/43551287-photo-camera-icon.jpg',
  );
  const [toggle, setToggle] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      <TopNavigation.Type2
        title="Take a selfie"
        itemStrokeColor={color.Neutral[10]}
      />
      <TouchableOpacity
        onPress={() => {
          requestCameraPermission(setPicture, setToggle);
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
      <Button
        label="Continue"
        onPress={() => checkPermissionOFGps(navigation, picture)}
      />
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
