import { useEffect } from 'react';
import { View, Text } from 'react-native';

interface TopTracksScreenProps {
  route: any;
}

export function TopTracksScreen({ route }: TopTracksScreenProps) {
  const { period } = route.params;

  useEffect(() => {
    console.log(period);
  }, [period]);

  return (
    <View>
      <Text>TopTracksScreen</Text>
    </View>
  );
}
