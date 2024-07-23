import React from 'react';
import { View, Easing } from 'react-native';
import FastImage from 'react-native-fast-image';
import TextTicker from 'react-native-text-ticker';
import { styles } from './styles';
import type { TopSectionTileProps } from './types';

export function TopSectionTile({ name, image }: TopSectionTileProps) {
  return (
    <View style={styles.wrapper}>
      <FastImage source={{ uri: image, priority: FastImage.priority.high }} style={styles.image} />
      <View style={styles.titleContainer}>
        <TextTicker
          style={styles.title}
          loop
          bounce={false}
          scroll={false}
          scrollSpeed={100}
          repeatSpacer={10}
          animationType="scroll"
          easing={Easing.linear}>
          {name}
        </TextTicker>
      </View>
    </View>
  );
}
