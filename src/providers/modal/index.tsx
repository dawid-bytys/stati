import { getIcon } from '@/common/icons';
import { useStore } from '@/store/store';
import { Pressable, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { styles } from './styles';
import type { PropsWithChildren } from 'react';

export function ModalProvider({ children }: PropsWithChildren) {
  const store = useStore();

  return (
    <>
      {store.modal && (
        <Animated.View style={styles.modalWrapper} entering={FadeIn} exiting={FadeOut}>
          <Pressable style={styles.pressableWrapper} onPress={store.closeModal}>
            <View
              style={styles.modalContent}
              onStartShouldSetResponder={() => true}
              onResponderEnd={(e) => e.stopPropagation()}>
              <TouchableOpacity style={styles.closeBtn} onPress={store.closeModal}>
                {getIcon('close')}
              </TouchableOpacity>
              {store.modal.component}
            </View>
          </Pressable>
        </Animated.View>
      )}
      {children}
    </>
  );
}
