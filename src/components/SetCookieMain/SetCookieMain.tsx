import type { TextInputChangeEventData, NativeSyntheticEvent } from 'react-native';
import { TouchableOpacity, TextInput, View, Text } from 'react-native';
import LinesDown from '@/assets/svg/lines-down.svg';
import { FadeIn } from 'react-native-reanimated';
import LinesUp from '@/assets/svg/lines-up.svg';
import Animated from 'react-native-reanimated';
import { useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { styles } from './SetCookieMain.styles';

export function SetCookieMain() {
  const [text, setText] = useState('');
  const { setValue } = useAuthStore();

  function handleChange(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    setText(e.nativeEvent.text);
  }

  function handleClick() {
    setValue('spDcCookie', text.trim());
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
          value={text}
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
