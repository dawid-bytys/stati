import React from 'react';
import { View, Easing, TouchableOpacity, Linking } from 'react-native';
import FastImage from 'react-native-fast-image';
import TextTicker from 'react-native-text-ticker';
import { styles } from './styles';
import type { TopSectionTileProps } from './types';

export function TopSectionTile({ name, image, link }: TopSectionTileProps) {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={() => Linking.openURL(link)}>
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
    </TouchableOpacity>
  );
}
