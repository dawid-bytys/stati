import { LinesWrapper } from '@/common/lines-wrapper';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

export function InternetConnection() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length === 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <LinesWrapper absolute>
      <View style={styles.inner}>
        <Text style={styles.title}>lost internet connection. 😔</Text>
        <Text style={styles.subTitle}>reconnecting{dots}</Text>
      </View>
    </LinesWrapper>
  );
}
