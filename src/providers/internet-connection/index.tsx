import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import { InternetConnection } from './components/internet-connection';
import type { PropsWithChildren } from 'react';

export function InternetConnectionProvider({ children }: PropsWithChildren) {
    const { isConnected } = useNetInfo();

    useEffect(() => {
        if (isConnected === false) {
            BootSplash.hide({ fade: true });
        }
    }, [isConnected]);

    if (isConnected === null) {
        return null;
    }

    if (!isConnected) {
        return <InternetConnection />;
    }

    return <>{children}</>;
}
