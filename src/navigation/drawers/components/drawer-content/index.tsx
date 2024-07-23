import { getIcon } from '@/common/icons';
import { LogoutModal } from '@/common/logout-modal';
import { useStore } from '@/store/store';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { version } from '../../../../../package.json';
import { styles } from './styles';
import type { ActionButtonProps } from './types';

const ACTIONS = [
  {
    title: 'Logout',
    iconName: 'logout',
  },
];

export function DrawerContent() {
  const store = useStore();
  const insets = useSafeAreaInsets();

  function actionTrigger(title: string) {
    if (title === 'Logout') {
      store.openModal({
        component: <LogoutModal />,
      });
    }
  }

  return (
    <ScrollView style={[styles.wrapper, { paddingTop: insets.top + 25 }]} contentContainerStyle={styles.flex}>
      {ACTIONS.map(({ title, iconName }) => (
        <ActionButton key={title} title={title} icon={getIcon(iconName)} onPress={() => actionTrigger(title)} />
      ))}
      <Text style={styles.versionText}>v{version}</Text>
    </ScrollView>
  );
}

function ActionButton({ icon, title, onPress }: ActionButtonProps) {
  return (
    <TouchableOpacity style={styles.actionBtn} onPress={onPress}>
      {icon}
      <Text style={styles.actionBtnText}>{title}</Text>
    </TouchableOpacity>
  );
}
