import Animated, { FadeOut } from 'react-native-reanimated'
import { styles } from './Loading.styles'
import { AnimatedIcon } from '../AnimatedIcon'

export function Loading() {
  return (
    <Animated.View
      exiting={FadeOut.duration(300)}
      style={styles.container}
    >
      <AnimatedIcon
        width={64}
        height={64}
        duration={800}
        source={require('@/assets/lottie/logo-animation.json')}
      />
    </Animated.View>
  )
}
