import { Slot } from "expo-router";
import SafeScreen from "../components/safescreen.jsx";
import { ClerkProvider, tokenCache } from "@clerk/clerk-expo";
import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayout() {
  return (
   <ClerkProvider tokenCache={tokenCache}>
     <ThemeProvider>
       <SafeScreen>
        <Slot  />
       </SafeScreen>
     </ThemeProvider>
    </ClerkProvider>
  );
}
