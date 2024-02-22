import type { TextInputChangeEventData, NativeSyntheticEvent } from 'react-native';

import { TouchableOpacity, StyleSheet, TextInput, View, Text } from 'react-native';
import { useAuthContext } from '@/hooks/useAuthContext';
import LinesDown from '@/assets/svg/lines-down.svg';
import { FadeIn } from 'react-native-reanimated';
import LinesUp from '@/assets/svg/lines-up.svg';
import Animated from 'react-native-reanimated';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function SetCookieMain() {
  const [value, setValue] = useState('');
  const { setSpDcCookie } = useAuthContext();

  function handleChange(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    setValue(e.nativeEvent.text);
  }

  async function handleClick() {
    const trimmedValue = value.trim();

    await AsyncStorage.setItem('spDcCookie', trimmedValue);
    setSpDcCookie(trimmedValue);
  }

  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      style={styles.container}
    >
      <LinesUp style={styles.linesUp} />
      <View style={styles.inner}>
        <Text style={styles.info}>You must set a sp_dc cookie before using this page:</Text>
        <TextInput
          onChange={handleChange}
          secureTextEntry={true}
          style={styles.input}
          placeholder="sp_dc"
          value={value}
        />
      </View>
      <TouchableOpacity
        onPress={handleClick}
        style={styles.btn}
      >
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
      <LinesDown style={styles.linesDown} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontFamily: 'Poppins-SemiBold',
    borderColor: '#2D2D2D',
    textAlign: 'center',
    borderRadius: 15,
    borderWidth: 1,
    marginTop: 24,
    color: '#fff',
    width: '100%',
    fontSize: 12,
    padding: 10,
  },
  btn: {
    backgroundColor: '#1FDF64',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    marginTop: 24,
    width: '50%',
    padding: 10,
  },
  info: {
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    color: '#fff',
    fontSize: 12,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    flex: 1,
  },
  btnText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    fontSize: 16,
  },
  inner: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  linesDown: {
    position: 'absolute',
    bottom: 10,
    right: -1,
  },
  linesUp: {
    position: 'absolute',
    left: -1,
    top: 10,
  },
});
