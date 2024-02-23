import {
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color} from '../theme';
import {Button, Gap, TopNavigation} from '../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigations';
import {
  checkPermissionOFGps,
  requestCameraPermission,
  widthResponsive,
} from '../utils';

const baseUrl =
  'https://previews.123rf.com/images/aguiters/aguiters1508/aguiters150800059/43551287-photo-camera-icon.jpg';

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [picture, setPicture] = useState<string>(baseUrl);
  const [toggle, setToggle] = useState<boolean>(true);
  const [buttonDisable, setButtonDisable] = useState<boolean>(true);

  useEffect(() => {
    if (picture !== baseUrl) {
      setButtonDisable(false);
    }
  }, [picture]);

  return (
    <View style={styles().container}>
      <TopNavigation.Type2
        title="Take a selfie"
        itemStrokeColor={color.Neutral[10]}
      />
      <View style={styles().bodyContainer}>
        <TouchableOpacity
          onPress={() => {
            requestCameraPermission(setPicture, setToggle);
          }}
          activeOpacity={0.8}
          style={styles().imageContainer}>
          <Image style={styles().imageStyle} source={{uri: picture}} />
        </TouchableOpacity>
        <View style={styles().buttonStyle}>
          <Text style={styles().infoTxt}>Touch the camera to activate..</Text>
          <Gap height={20} />
          <Button
            label="Continue"
            onPress={() => checkPermissionOFGps(navigation, picture)}
            containerStyles={styles(buttonDisable).buttonViewStyle}
            disabled={buttonDisable}
          />
          <Gap height={20} />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = (buttonDisable?: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.Dark[800],
    },
    bodyContainer: {
      flex: 1,
      justifyContent: 'space-between',
      paddingHorizontal: widthResponsive(20),
    },
    imageContainer: {
      marginTop: widthResponsive(20),
      height: widthResponsive(400),
      justifyContent: 'center',
      resizeMode: 'cover',
    },
    imageStyle: {flex: 1, resizeMode: 'cover'},
    buttonStyle: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoTxt: {
      color: color.Neutral[10],
    },
    buttonViewStyle: {
      backgroundColor: buttonDisable ? color.Dark[300] : color.Success[400],
    },
  });
