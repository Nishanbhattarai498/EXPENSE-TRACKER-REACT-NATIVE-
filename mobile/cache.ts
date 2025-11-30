import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

export const tokenCache = {
  async getToken(key) {
    try {
      return await SecureStore.getItemAsync(key)
    } catch (err) {
      return null
    }
  },
  async saveToken(key, value) {
    try {
      return await SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}
