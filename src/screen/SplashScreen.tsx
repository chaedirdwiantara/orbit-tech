import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import AnimatedLottieView from 'lottie-react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../theme/Color';
import {RootStackParams} from '../navigations';

type SplashScrennProps = NativeStackScreenProps<
  RootStackParams,
  'SplashScreen'
>;

export const SplashScreen: React.FC<SplashScrennProps> = ({
  navigation,
}: SplashScrennProps) => {
  useEffect(() => {
    const checkProfileAndSetNavigation = async () => {
      navigation.replace('LoginScreen');
    };

    // Set a timeout to call the checkProfileAndSetNavigation after 1 second
    const timer = setTimeout(() => {
      checkProfileAndSetNavigation();
    }, 1000);

    // Clear the timeout if the component unmounts before the timer fires
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.root}>
      <AnimatedLottieView
        source={require('../assets/animation/basic-animation.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.Dark[800],
    margin: 0,
  },
  lottie: {
    padding: 0,
    margin: 0,
    width: ms(300),
    height: mvs(300),
    aspectRatio: 1 / 1,
  },
});
