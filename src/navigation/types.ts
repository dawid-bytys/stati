import type { HomeDrawerParamList } from './drawers/home/types';
import type { AuthStackParamList } from './stacks/auth/types';
import type { BottomTabsParamList } from './tabs/main/types';

type AllStacksParamList = AuthStackParamList & BottomTabsParamList & HomeDrawerParamList;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AllStacksParamList {}
  }
}
