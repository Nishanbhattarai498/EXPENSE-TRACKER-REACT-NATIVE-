import { View, Text } from "react-native";
import { getHomeStyles } from "../styles/home.styles";
import { COLORS } from "../constants/colors";
import { useTheme } from "../context/ThemeContext";

export const BalanceCard = ({ summary }) => {
  const { theme } = useTheme();
  const styles = getHomeStyles(theme);
  const safeBalance = Number(summary?.balance) || 0;
  const safeIncome = Number(summary?.income) || 0;
  const safeExpenses = Number(summary?.expenses) || 0;

  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Total Balance</Text>
      <Text style={styles.balanceAmount}>NPR {safeBalance.toFixed(2)}</Text>
      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Income</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
             +NPR{safeIncome.toFixed(2)}
          </Text>
        </View>
        <View style={[styles.balanceStatItem, styles.statDivider]} />
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Expenses</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
            -NPR{Math.abs(safeExpenses).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};