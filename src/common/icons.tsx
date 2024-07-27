import React from 'zustand';
import {
  AlbumIcon,
  ArrowRightIcon,
  ArtistIcon,
  ChartIcon,
  ClockIcon,
  CloseIcon,
  DotIcon,
  FriendsActivityIcon,
  HamburgerIcon,
  HomeIcon,
  InfoIcon,
  LinesDownIcon,
  LinesUpIcon,
  LogoutIcon,
  NotFoundIcon,
  PlaylistIcon,
  QuitIcon,
  WelcomeIcon,
} from './svgs';

export function getIcon(iconName: string, color?: string, width?: number, height?: number) {
  switch (iconName) {
    case 'welcome':
      return <WelcomeIcon />;
    case 'home':
      return <HomeIcon color={color} />;
    case 'clock':
      return <ClockIcon />;
    case 'friends':
      return <FriendsActivityIcon color={color} />;
    case 'logout':
      return <LogoutIcon />;
    case 'hamburger':
      return <HamburgerIcon />;
    case 'rightArrow':
      return <ArrowRightIcon />;
    case 'chart':
      return <ChartIcon color={color} />;
    case 'info':
      return <InfoIcon />;
    case 'linesDown':
      return <LinesDownIcon />;
    case 'linesUp':
      return <LinesUpIcon />;
    case 'dot':
      return <DotIcon color={color} width={width} height={height} />;
    case 'album':
      return <AlbumIcon />;
    case 'playlist':
      return <PlaylistIcon />;
    case 'quit':
      return <QuitIcon />;
    case 'close':
      return <CloseIcon />;
    case 'notFound':
      return <NotFoundIcon width={width} height={height} />;
    case 'artist':
      return <ArtistIcon />;
    default:
      throw new Error('Invalid icon name');
  }
}
