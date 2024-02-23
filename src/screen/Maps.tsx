import {Image, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {TopNavigation} from '../components';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {color} from '../theme';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigations';
import {useNavigation} from '@react-navigation/native';
import {ModalConfirm} from '../components/molecule/Modal/ModalConfirm';

type MapsProps = NativeStackScreenProps<RootStackParams, 'Maps'>;

const Maps = ({route}: MapsProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const latitude = route.params.latitude;
  const longitude = route.params.longitude;
  const picture = route.params.picture;

  const [showModal, setShowModal] = useState<boolean>();

  const handleOnClose = () => {
    console.log('handleOnClose');
  };

  const handleOnConfirm = () => {
    console.log('handleOnConfirm');
  };

  return (
    <View style={{flex: 1}}>
      <TopNavigation.Type1
        title="Map"
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={() => navigation.goBack()}
        bgColor={color.Dark[800]}
      />
      <MapView
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}>
        <Marker
          tracksViewChanges={false}
          coordinate={{latitude: latitude, longitude: longitude}}
          onPress={() => setShowModal(true)}>
          <Image style={styles.image} source={{uri: picture}} />
        </Marker>
      </MapView>
      {showModal && (
        <ModalConfirm
          modalVisible={showModal}
          subtitle={'You have to take another picture'}
          title={'Delete The Picture ?'}
          onPressClose={handleOnClose}
          onPressYes={handleOnConfirm}
        />
      )}
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
