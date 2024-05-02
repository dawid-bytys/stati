import { useCallback, useEffect, useRef, useState } from 'react'
import {
  TouchableOpacity,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Text,
  Keyboard,
  BackHandler,
  KeyboardAvoidingView,
} from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import InstructionsIcon from '@/assets/svg/instructions.svg'
import LinesDown from '@/assets/svg/lines-down.svg'
import LinesUp from '@/assets/svg/lines-up.svg'
import { IS_ANDROID, platformStyle } from '@/platform'
import { useBoundStore } from '@/store/boundStore'
import { styles } from './SetCookieMain.styles'
import { InstructionsBottomSheet } from '../InstructionsBottomSheet/InstructionsBottomSheet'
import type { BottomSheetModal } from '@gorhom/bottom-sheet'
import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'

export function SetCookieMain() {
  const [isOpen, setIsOpen] = useState(false)
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const [text, setText] = useState('')
  const setAuthValue = useBoundStore((state) => state.setAuthValue)

  function handleChange(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    setText(e.nativeEvent.text)
  }

  function handleSubmit() {
    setAuthValue('spdcCookie', text.trim())
    Keyboard.dismiss()
  }

  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetRef.current?.present()
    setIsOpen(true)
  }, [])

  useEffect(() => {
    const backHandlerListener = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isOpen) {
        bottomSheetRef.current?.dismiss()
        return true
      }

      return false
    })

    return () => {
      backHandlerListener.remove()
    }
  }, [isOpen])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View
        entering={FadeIn.duration(300)}
        style={styles.container}
      >
        <InstructionsBottomSheet
          ref={bottomSheetRef}
          setIsOpen={setIsOpen}
        />
        <LinesUp style={styles.linesUp} />
        <LinesDown style={styles.linesDown} />
        <KeyboardAvoidingView
          style={styles.inner}
          behavior={platformStyle({ android: 'height', ios: 'padding' })}
          keyboardVerticalOffset={platformStyle({ android: 20, ios: 0 })}
          enabled={!IS_ANDROID}
        >
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
            placeholderTextColor="#2D2D2D"
            placeholder="sp_dc"
            value={text}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}
