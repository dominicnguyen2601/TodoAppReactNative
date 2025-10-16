import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';

const SplashScreen = ({ navigation }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [loaderWidth, setLoaderWidth] = useState(0);
  const loaderTranslate = useRef(new Animated.Value(0)).current;
  const { initialize, isSignedIn } = useAuthStore();

  useEffect(() => {
    // Animate the logo
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Initialize auth and navigate after 2 seconds
    const timer = setTimeout(async () => {
      await initialize();
      if (isSignedIn) {
        navigation.replace('AppStack');
      } else {
        navigation.replace('AuthStack');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaderWidth) return;
    const animate = () => {
      loaderTranslate.setValue(-loaderWidth * 0.3);
      Animated.timing(loaderTranslate, {
        toValue: loaderWidth,
        duration: 1200,
        easing: Animated.Easing?.linear || undefined,
        useNativeDriver: true,
      }).start(() => animate());
    };
    animate();
  }, [loaderWidth]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={styles.container.backgroundColor} />
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          <View style={styles.circle}>
            <MaterialCommunityIcons
              name="check"
              size={60}
              color="#003DA5"
              strokeWidth={3}
            />
          </View>
        </Animated.View>

        <Animated.Text
          style={[
            styles.title,
            {
              opacity: opacityAnim,
            },
          ]}
        >
          ToDoList
        </Animated.Text>
      </View>

      {/* Loading indicator at bottom */}
      <View
        style={styles.loader}
        onLayout={(e) => setLoaderWidth(e.nativeEvent.layout.width)}
      >
        <Animated.View
          style={[
            styles.loaderBar,
            { transform: [{ translateX: loaderTranslate }] },
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0052CC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 24,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
    textAlign: 'center',
  },
  loader: {
    position: 'absolute',
    bottom: 60,
    width: '40%',
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loaderBar: {
    width: '30%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
});