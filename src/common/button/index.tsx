import { Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import type { ButtonProps } from './types';

export function Button(props: ButtonProps) {
  return (
    <TouchableOpacity {...props} style={[styles.button, props.style]} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}
