import type { StyleProp, ViewStyle } from 'react-native';

export interface TopCustomTabsProps {
  tabs: string[];
  currentTab: string;
  onTabPress: (tab: string) => void;
  style?: StyleProp<ViewStyle>;
}
