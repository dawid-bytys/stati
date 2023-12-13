import type { NavigationProp } from '@react-navigation/native';
import type { TabNavigatorParamList } from '@/types';

import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface TopProps {
  children: React.ReactNode;
  delay?: number;
  title: string;
}

export function TopContainer({ children, title }: TopProps) {
  const navigation = useNavigation<NavigationProp<TabNavigatorParamList>>();

  function handleNavigation() {
    navigation.navigate('Top');
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerUpper}>
        <Text style={styles.titleText}>{title}</Text>
        <TouchableOpacity
          style={styles.redirectBtn}
          onPress={handleNavigation}
        >
          <Text style={styles.redirectBtnText}>see more</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.innerLower}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  innerLower: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 20,
  },
  redirectBtnText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#1FDF64',
    fontSize: 10,
  },
  titleText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    fontSize: 16,
  },
  innerUpper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  redirectBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginTop: 40,
  },
});
