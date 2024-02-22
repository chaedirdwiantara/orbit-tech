import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {color} from '../theme';
import {TopNavigation} from '../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigations';

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation.Type2
        title="Location Tracking"
        itemStrokeColor={color.Neutral[10]}
      />
      <View style={styles.bodyContainer}></View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Dark[800],
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    flex: 1,
  },
});
