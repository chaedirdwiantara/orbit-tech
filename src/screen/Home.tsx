import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import {ModalImagePicker} from '../components/molecule/Modal/ModalImagePicker';
import {Image as ImageProps} from 'react-native-image-crop-picker';
import {pictureStore} from '../store/picture.store';

const baseUrl =
  'https://previews.123rf.com/images/aguiters/aguiters1508/aguiters150800059/43551287-photo-camera-icon.jpg';

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {picture, setPicture} = pictureStore();

  const [modalPicture, setModalPicture] = useState<boolean>(false);
  const [buttonDisable, setButtonDisable] = useState<boolean>(true);

  useEffect(() => {
    if (picture) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [picture]);

  const sendUri = (val: ImageProps) => {
    setPicture(val);
    setModalPicture(false);
  };

  const closeModal = () => {
    setModalPicture(false);
  };

  const setOnHide = () => {
    setModalPicture(false);
  };

  return (
    <View style={styles().container}>
      <TopNavigation.Type2
        title="Take a selfie"
        itemStrokeColor={color.Neutral[10]}
      />
      <View style={styles().bodyContainer}>
        <TouchableOpacity
          onPress={() => {
            requestCameraPermission(setModalPicture);
          }}
          activeOpacity={0.8}
          style={styles().imageContainer}>
          <Image
            style={styles().imageStyle}
            source={{uri: picture ? picture.path : baseUrl}}
          />
        </TouchableOpacity>
        <View style={styles().buttonStyle}>
          {buttonDisable && (
            <Text style={styles().infoTxt}>Touch the camera to activate..</Text>
          )}
          <Gap height={20} />
          <Button
            label="Continue"
            onPress={() => checkPermissionOFGps(navigation)}
            containerStyles={styles(buttonDisable).buttonViewStyle}
            disabled={buttonDisable}
          />
          <Gap height={20} />
        </View>
        {modalPicture && (
          <ModalImagePicker
            title={'Upload Image'}
            modalVisible={modalPicture}
            sendUri={sendUri}
            onPressClose={closeModal}
            onModalHide={setOnHide}
          />
        )}
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
