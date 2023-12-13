import { ScrollView, StyleSheet, View, Text } from 'react-native';

interface LatestActivityProps {
  children: React.ReactNode;
}

export function LatestActivity({ children }: LatestActivityProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleText}>Latest activity</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          gap: 20,
        }}
        nestedScrollEnabled={true}
        style={styles.innerLower}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 50,
    width: 50,
  },
  titleText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    fontSize: 16,
  },
  container: {
    flexDirection: 'column',
    paddingBottom: 50,
    marginTop: 40,
  },
  innerLower: {
    marginTop: 20,
  },
});
