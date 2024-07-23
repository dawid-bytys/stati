import { SCREEN_HEIGHT } from '@/common/constants';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetSectionList } from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useMemo } from 'react';
import { Text } from 'react-native';
import { Hyperlink } from 'react-native-hyperlink';
import { styles } from './styles';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import type { Dispatch, SetStateAction } from 'react';
import type { SectionListData, SectionListRenderItemInfo } from 'react-native';

const INSTRUCTIONS = [
  {
    title: 'Safari',
    data: [
      '1. Open a Private window and navigate to https://open.spotify.com.',
      '2. Log in to your Spotify account.',
      '3. Use Command + Option + C to open the browser’s developer tools.',
      '4. Access the "Storage" section within the developer tools menu.',
      '5. Locate and copy the value of sp_dc cookie.',
      '6. Ensure to close the window without logging out to keep the cookie valid.',
    ],
  },
  {
    title: 'Chrome',
    data: [
      '1. Open an Incognito window and navigate to https://open.spotify.com.',
      '2. Log in to your Spotify account.',
      '3. Use Command + Option + I (Mac) or Control + Shift + I or F12 to open the browser’s developer tools.',
      '4. Access the "Application" section within the developer tools menu.',
      '5. Locate and copy the value of sp_dc cookie.',
      '6. Ensure to close the window without logging out to keep the cookie valid.',
    ],
  },
  {
    title: 'Firefox',
    data: [
      '1. Open an Incognito window and navigate to https://open.spotify.com.',
      '2. Log in to your Spotify account.',
      "3. Use Command + Option + I (Mac) or Control + Shift + I or F12 to open the browser's developer tools.",
      '4. Access the "Storage" section within the developer tools menu.',
      '5. Locate and copy the value of sp_dc cookie.',
      '6. Ensure to close the window without logging out to keep the cookie valid.',
    ],
  },
];

type Item = string;

interface Section {
  title: string;
  data: Item[];
}

interface SectionHeader {
  section: SectionListData<Item, Section>;
}

interface InstructionsBottomSheetProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const InstructionsBottomSheet = forwardRef<BottomSheetModal, InstructionsBottomSheetProps>(
  ({ setIsOpen }, ref) => {
    const snapPoints = useMemo(() => [SCREEN_HEIGHT * 0.8], []);

    const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
      return <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.7} />;
    }, []);

    const renderSectionItem = useCallback(({ item }: SectionListRenderItemInfo<Item>) => {
      return (
        <Hyperlink linkDefault={true} linkStyle={styles.link}>
          <Text style={styles.sectionItem}>{item}</Text>
        </Hyperlink>
      );
    }, []);

    const renderSectionHeader = useCallback(({ section: { title } }: SectionHeader) => {
      return <Text style={styles.sectionHeader}>{title}</Text>;
    }, []);

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        handleStyle={styles.header}
        handleIndicatorStyle={styles.handle}
        backgroundStyle={styles.container}
        backdropComponent={renderBackdrop}
        onDismiss={() => setIsOpen(false)}>
        <BottomSheetSectionList
          contentContainerStyle={styles.sectionList}
          keyExtractor={(item, index) => item + index}
          sections={INSTRUCTIONS}
          renderItem={renderSectionItem}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={false}
        />
      </BottomSheetModal>
    );
  },
);
