import { useCallback, useRef, useState } from 'react';
import { TouchableOpacity, TextInput, View, Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import InstructionsIcon from '@/assets/svg/instructions.svg';
import LinesDown from '@/assets/svg/lines-down.svg';
import LinesUp from '@/assets/svg/lines-up.svg';
import { useAuthStore } from '@/store/auth';
import { styles } from './SetCookieMain.styles';
import { InstructionsBottomSheet } from '../InstructionsBottomSheet/InstructionsBottomSheet';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

export function SetCookieMain() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [text, setText] = useState('');
  const { setValue } = useAuthStore();

  function handleChange(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    setText(e.nativeEvent.text);
  }

  function handleSubmit() {
    setValue('spDcCookie', text.trim());
  }

  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      style={styles.container}
    >
      <InstructionsBottomSheet ref={bottomSheetRef} />
      <LinesUp style={styles.linesUp} />
      <LinesDown style={styles.linesDown} />
      <View style={styles.inner}>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>You must set a sp_dc cookie</Text>
          <TouchableOpacity onPress={handleOpenBottomSheet}>
            <InstructionsIcon
              height={20}
              width={20}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          onChange={handleChange}
          secureTextEntry={true}
          style={styles.input}
          placeholder="sp_dc"
          value={text}
        />
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        style={styles.btn}
      >
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
