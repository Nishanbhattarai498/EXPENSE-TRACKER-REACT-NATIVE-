import { View, ActivityIndicator } from "react-native";
import { getHomeStyles } from "../styles/home.styles";
import { useTheme } from "../context/ThemeContext";


const PageLoader = () => {
  const { theme } = useTheme();
  const styles = getHomeStyles(theme);
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={theme.primary} />
    </View>
  );
};
export default PageLoader;