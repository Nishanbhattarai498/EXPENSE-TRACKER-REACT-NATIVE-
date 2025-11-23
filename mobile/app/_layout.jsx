import { Slot } from "expo-router";
import SafeScreen from "../components/safescreen.jsx";
import { ClerkProvider, tokenCache } from "@clerk/clerk-expo";

export default function RootLayout() {
  return (
   <ClerkProvider tokenCache={tokenCache}>
     <SafeScreen>
    <Slot  />
    </SafeScreen>
    </ClerkProvider>
  );
}
