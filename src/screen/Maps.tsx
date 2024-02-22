import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TopNavigation} from '../components';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {color} from '../theme';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigations';

type MapsProps = NativeStackScreenProps<RootStackParams, 'Maps'>;

const Maps = ({route}: MapsProps) => {
  const latitude = route.params.latitude;
  const longitude = route.params.longitude;
  const picture = route.params.picture;

  console.log(picture);

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}>
        <Marker
          coordinate={{latitude: latitude, longitude: longitude}}
          title="Test"
          description="description">
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 100,
              height: 100,
            }}>
            <Image style={styles.image} source={{uri: picture}} />
          </View>
        </Marker>
      </MapView>
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
    width: 100,
    height: 100,
  },
});
