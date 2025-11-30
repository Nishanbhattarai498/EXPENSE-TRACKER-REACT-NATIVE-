import { Slot } from "expo-router";
import SafeScreen from "../components/SafeScreen";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "../cache";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "../context/ThemeContext";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <ThemeProvider>
          <SafeScreen>
            <Slot />
            <StatusBar style="dark" />
          </SafeScreen>
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}