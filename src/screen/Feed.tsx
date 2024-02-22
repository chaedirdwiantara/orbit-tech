import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {color} from '../theme';
import {widthResponsive} from '../utils';
import {Gap} from '../components';

const FeedScreen = () => {
  const [state, setState] = useState<string>('');

  return (
    <View style={styles.container}>
      <Text style={{color: 'white'}}>Search Something</Text>
      <Gap height={16} />
      <View style={styles.bodyContainer}></View>
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Dark[800],
    padding: widthResponsive(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    flex: 1,
  },
});
