import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { THEMES } from '../../constants/colors';

export default function Settings() {
  const router = useRouter();
  const { theme, themeName, changeTheme } = useTheme();

  const themeOptions = Object.keys(THEMES).map((key) => ({
    id: key,
    name: key.charAt(0).toUpperCase() + key.slice(1),
    color: THEMES[key].primary,
  }));

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Appearance</Text>
        <View style={[styles.card, { backgroundColor: theme.card, shadowColor: theme.shadow }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Theme</Text>
          <View style={styles.themeGrid}>
            {themeOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.themeOption,
                  { borderColor: themeName === option.id ? theme.primary : theme.border },
                  themeName === option.id && { backgroundColor: theme.background }
                ]}
                onPress={() => changeTheme(option.id)}
              >
                <View style={[styles.colorPreview, { backgroundColor: option.color }]} />
                <Text style={[
                  styles.themeName, 
                  { color: themeName === option.id ? theme.primary : theme.text }
                ]}>
                  {option.name}
                </Text>
                {themeName === option.id && (
                  <Ionicons name="checkmark-circle" size={20} color={theme.primary} style={styles.checkIcon} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 15,
  },
  themeGrid: {
    gap: 12,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  themeName: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  checkIcon: {
    marginLeft: 8,
  },
});
