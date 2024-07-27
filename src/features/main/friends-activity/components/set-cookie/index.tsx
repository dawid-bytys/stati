import { Button } from '@/common/button';
import { getIcon } from '@/common/icons';
import { LinesWrapper } from '@/common/lines-wrapper';
import { IS_ANDROID, platformStyle } from '@/common/platform';
import { useWebAccessTokenQuery } from '@/network/queries/spotify';
import { useStore } from '@/store/store';
import { useState, useRef, useCallback, useEffect } from 'react';
import {
  Keyboard,
  BackHandler,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { InstructionsBottomSheet } from '../instructions-bottom-sheet';
import { styles } from './styles';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

const OFFSET = 10;
const TIME = 120;

export function SetCookie() {
  const store = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [text, setText] = useState('');
  const [borderColor, setBorderColor] = useState('#2D2D2D');
  const offset = useSharedValue(0);

  const animatedInputWrapperStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const {
    data: webAccessTokenData,
    error: webAccessTokenError,
    isLoading: isWebAccessDataLoading,
  } = useWebAccessTokenQuery(store.spdcCookie !== null && store.webAccessToken === null);

  function handleChange(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    setBorderColor('#2D2D2D');
    setText(e.nativeEvent.text);
  }

  function handleShake() {
    offset.value = withSequence(
      withTiming(-OFFSET, { duration: TIME / 2 }),
      withRepeat(withTiming(OFFSET, { duration: TIME }), 2, true),
      withTiming(0, { duration: TIME / 2 }),
    );
  }

  function handleSubmit() {
    const trimmedText = text.trim();

    if (trimmedText) {
      Keyboard.dismiss();
      store.setSpdcCookie(trimmedText);
    } else {
      setBorderColor('#FF0000');
      handleShake();
    }
  }

  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetRef.current?.present();
    setIsOpen(true);
  }, []);

  useEffect(() => {
    const backHandlerListener = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isOpen) {
        bottomSheetRef.current?.dismiss();
        return true;
      }

      return false;
    });

    return () => {
      backHandlerListener.remove();
    };
  }, [isOpen]);

  useEffect(() => {
    if (webAccessTokenData) {
      store.setNotification({
        type: 'success',
        message: 'sp_dc cookie set successfully! 🎉',
      });
      store.setWebAccessToken({
        value: webAccessTokenData.accessToken,
        expiresAt: Math.floor(webAccessTokenData.accessTokenExpirationTimestampMs / 1000),
      });
    }

    if (webAccessTokenError) {
      store.setNotification({
        type: 'error',
        message: 'Invalid sp_dc cookie',
      });
      store.setSpdcCookie(null);
    }
  }, [webAccessTokenData, webAccessTokenError, store]);

  return (
    <LinesWrapper>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <InstructionsBottomSheet ref={bottomSheetRef} setIsOpen={setIsOpen} />
          <KeyboardAvoidingView
            style={styles.inner}
            behavior={platformStyle({ android: 'height', ios: 'padding' })}
            keyboardVerticalOffset={platformStyle({ android: 20, ios: 0 })}
            enabled={!IS_ANDROID}>
            <View
              style={[
                styles.wrapper,
                {
                  opacity: isWebAccessDataLoading ? 0.5 : 1,
                },
              ]}>
              <View style={styles.infoContainer}>
                <Text style={styles.info}>You must set a sp_dc cookie</Text>
                <TouchableOpacity onPress={handleOpenBottomSheet} disabled={isWebAccessDataLoading}>
                  {getIcon('info')}
                </TouchableOpacity>
              </View>
              <Animated.View style={[animatedInputWrapperStyles]}>
                <TextInput
                  editable={!isWebAccessDataLoading}
                  onChange={handleChange}
                  secureTextEntry={true}
                  style={[styles.input, { borderColor }]}
                  placeholderTextColor="#2D2D2D"
                  placeholder="sp_dc"
                  value={text}
                />
              </Animated.View>
              <Button
                title="Submit"
                onPress={handleSubmit}
                disabled={isWebAccessDataLoading}
                style={styles.submitBtn}
              />
            </View>
          </KeyboardAvoidingView>
        </>
      </TouchableWithoutFeedback>
    </LinesWrapper>
  );
}
