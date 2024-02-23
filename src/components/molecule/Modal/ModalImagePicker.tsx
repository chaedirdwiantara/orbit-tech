import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {mvs} from 'react-native-size-matters';
import ImagePicker, {Image as ImageProps} from 'react-native-image-crop-picker';

import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import {normalize, width, widthResponsive} from '../../../utils';
import {Button, CustomSheet} from '../..';

interface ModalImagePickerProps {
  title?: string;
  modalVisible: boolean;
  onPressClose: () => void;
  sendUri: (params: ImageProps) => void;
  onModalHide?: () => void;
  includeBase64?: boolean;
}

export const ModalImagePicker: React.FC<ModalImagePickerProps> = ({
  title = 'Edit Display Profile',
  modalVisible,
  sendUri,
  onPressClose,
  onModalHide,
  includeBase64 = false,
}) => {
  const onImageLibraryPress = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 1024,
      compressImageMaxHeight: 1024,
      compressImageQuality: 0.9,
      // cropping: true,
      includeBase64,
      smartAlbums: [
        'RecentlyAdded',
        'Favorites',
        'UserLibrary',
        'Screenshots',
        'Generic',
        'PhotoStream',
        'SelfPortraits',
        'Panoramas',
        'Bursts',
      ],
    }).then(image => {
      sendUri(image);
      onPressClose();
    });
  };

  const onCameraPress = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 1024,
      compressImageMaxHeight: 1024,
      compressImageQuality: 0.9,
      // cropping: true,
      useFrontCamera: true,
      includeBase64,
    }).then(image => {
      sendUri(image);
      onPressClose();
    });
  };

  const children = () => {
    return (
      <View>
        <Text style={styles.titleStyle}>{title}</Text>
        <View style={styles.separator} />
        <View style={styles.containerMenu}>
          <TouchableOpacity style={styles.buttonStyle} onPress={onCameraPress}>
            <Text style={styles.textMenu}>{'Take photo'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={onImageLibraryPress}>
            <Text style={styles.textMenu}>{'Add photo from gallery'}</Text>
          </TouchableOpacity>
        </View>
        <Button
          type="border"
          label={'Cancel'}
          containerStyles={styles.btnContainer}
          textStyles={{color: Color.Success[400]}}
          onPress={onPressClose}
        />
      </View>
    );
  };

  return (
    <>
      {modalVisible && (
        <Modal
          isVisible={modalVisible}
          style={{margin: 0}}
          onModalHide={onModalHide}>
          <TouchableWithoutFeedback onPress={onPressClose}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <CustomSheet children={children()} />
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontFamily: Font.InterSemiBold,
    fontSize: normalize(18),
    lineHeight: mvs(28),
    textAlign: 'center',
    color: Color.Neutral[10],
  },
  separator: {
    backgroundColor: '#2B3240',
    width: width,
    height: mvs(1),
    marginVertical: widthResponsive(30),
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  btnContainer: {
    width: width * 0.85,
    aspectRatio: widthResponsive(327 / 40),
    marginTop: widthResponsive(20),
    alignSelf: 'center',
  },
  buttonStyle: {width: '100%', marginVertical: 10},
  textMenu: {
    color: Color.Neutral[10],
    fontFamily: Font.InterRegular,
    fontSize: normalize(14),
  },
  containerMenu: {
    alignItems: 'flex-start',
    width: width * 0.85,
    alignSelf: 'center',
  },
});
