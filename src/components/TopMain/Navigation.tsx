import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';

interface NavigationProps {
  // eslint-disable-next-line no-unused-vars
  onClick: (tab: string) => void;
  type: 'content' | 'period';
  currentTab: string;
  tabs: string[];
}

export function Navigation({ currentTab, onClick, tabs }: NavigationProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          style={{
            ...styles.tabButton,
            backgroundColor: tab === currentTab ? '#2D2D2D' : 'transparent',
          }}
          onPress={() => onClick(tab)}
          key={tab}
        >
          <Text style={styles.text}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 20,
    width: '100%',
    height: 30,
  },
  tabButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    height: '100%',
    flex: 1,
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    fontSize: 12,
  },
});
