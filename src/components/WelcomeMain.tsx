import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { useAuthContext } from '@/hooks/useAuthContext';
import WelcomeImage from '@/assets/svg/welcome.svg';

export function WelcomeMain() {
  const { obtainAccessToken } = useAuthContext();

  return (
    <View style={styles.container}>
      <View style={styles.innerUpper}>
        <WelcomeImage
          height="100%"
          width="100%"
        />
      </View>
      <View style={styles.innerLower}>
        <Text style={styles.heading}>Hello. 😊</Text>
        <Text style={styles.message}>Explore your music taste in one place</Text>
        <TouchableOpacity
          onPress={() => obtainAccessToken()}
          style={styles.loginBtn}
        >
          <Text style={styles.loginBtnText}>Login with Spotify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginBtn: {
    backgroundColor: '#1FDF64',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 100,
    marginTop: 40,
    width: '75%',
    padding: 20,
  },
  message: {
    fontFamily: 'Poppins-SemiBold',
    color: '#666363',
    fontSize: 16,
  },
  loginBtnText: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: 16,
  },
  heading: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: 36,
  },
  innerUpper: {
    height: '50%',
  },
  innerLower: {
    height: '50%',
  },
  container: {
    padding: 40,
  },
});
