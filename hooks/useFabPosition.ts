import { theme } from "@/app/(tabs)/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Hook for consistent FAB positioning across all screens
export const useFABPosition = () => {
  const insets = useSafeAreaInsets();

  // Constants from FloatingTabBar
  const FLOATING_TAB_HEIGHT = 70;
  const TAB_BAR_PADDING = theme.spacing.md; // from floatingContainer paddingBottom
  const FAB_MARGIN = theme.spacing.lg; // desired margin above tab bar

  // Calculate total bottom offset needed
  const bottomOffset =
    insets.bottom + TAB_BAR_PADDING + FLOATING_TAB_HEIGHT + FAB_MARGIN;

  return {
    bottom: bottomOffset,
    right: theme.spacing.lg,
  };
};
