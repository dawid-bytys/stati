import type { TouchableOpacityProps } from 'react-native';

export type ButtonProps = TouchableOpacityProps & {
  title: string;
  onPress: () => void;
};
