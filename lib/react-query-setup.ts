import NetInfo from '@react-native-community/netinfo';
import { AppState, Platform } from 'react-native';
import type { AppStateStatus } from 'react-native';
import { onlineManager, focusManager } from '@tanstack/react-query';

// Online Manager - Auto refetch on reconnect
export function setupOnlineManager() {
  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected);
    });
  });
}

// Focus Manager - Refetch when app comes to foreground
export function setupFocusManager() {
  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  }

  const subscription = AppState.addEventListener('change', onAppStateChange);
  return () => subscription.remove();
}
