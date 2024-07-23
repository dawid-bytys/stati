import { useStore } from '@/store/store';
import { Text, View } from 'react-native';
import { Button } from '../button';
import { getIcon } from '../icons';
import { styles } from './styles';

export function LogoutModal() {
  const store = useStore();

  return (
    <View style={styles.wrapper}>
      {getIcon('quit')}
      <Text style={styles.confirmationText}>Are you sure you want to leave?</Text>
      <Button
        style={styles.logoutBtn}
        title="Logout"
        onPress={() => {
          store.closeModal();
          store.logout();
        }}
      />
    </View>
  );
}
