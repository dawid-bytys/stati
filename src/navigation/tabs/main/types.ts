export enum BottomTabsScreens {
  HomeDrawer = 'Home',
  Top = 'Top',
  FriendsActivity = "Friends' activity",
}

export type BottomTabsParamList = {
  [BottomTabsScreens.HomeDrawer]: undefined;
  [BottomTabsScreens.Top]: undefined;
  [BottomTabsScreens.FriendsActivity]: undefined;
};
