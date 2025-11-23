import { useSignIn, useOAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from '../../styles/auth.styles'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'

WebBrowser.maybeCompleteAuthSession()

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const { startOAuthFlow: startGoogleFlow } = useOAuth({ strategy: 'oauth_google' })
  const { startOAuthFlow: startFacebookFlow } = useOAuth({ strategy: 'oauth_facebook' })

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState(null)
  const [pendingSecondFactor, setPendingSecondFactor] = React.useState(false)
  const [secondFactorCode, setSecondFactorCode] = React.useState('')

  const onSelectAuth = async (strategy) => {
    try {
      const { createdSessionId, setActive } = await (strategy === 'oauth_google' ? startGoogleFlow : startFacebookFlow)()

      if (createdSessionId) {
        setActive({ session: createdSessionId })
        router.replace('/')
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }

  const onSignInPress = async () => {
    if (!isLoaded) return

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else if (signInAttempt.status === 'needs_second_factor') {
        try {
          await signIn.prepareSecondFactor({ strategy: 'email_code' })
          setPendingSecondFactor(true)
          setError(null)
        } catch (prepErr) {
          console.error('Failed to prepare second factor', prepErr)
          setError('Unable to send verification code. Please try again.')
        }
      } else {
        setError('Additional verification required. Please follow the prompts.')
      }
    } catch (err) {
      if (err.errors?.[0]?.code === 'form_identifier_exists') {
        setError('That email address is already in use. Please try another.')
      } else {
        setError('An error occurred. Please try again.')
      }
      console.log(err)
    }
  }

  const onSecondFactorVerify = async () => {
    if (!isLoaded) return

    try {
      const secondFactorAttempt = await signIn.attemptSecondFactor({
        strategy: 'email_code',
        code: secondFactorCode,
      })

      if (secondFactorAttempt.status === 'complete') {
        await setActive({ session: secondFactorAttempt.createdSessionId })
        router.replace('/')
      } else {
        setError('Verification code required. Please try again.')
      }
    } catch (err) {
      setError('Invalid or expired code. Request a new one and try again.')
      console.log(err)
    }
  }

  if (pendingSecondFactor) {
    return (
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        enableAutomaticScroll
      >
        <View style={styles.container}>
          <Image
            source={require('../../assets/images/revenue-i3.png')}
            style={styles.illustration}
          />
          <Text style={styles.title}>Enter Verification Code</Text>
          {error ? (
            <View style={styles.errorBox}>
              <Ionicons name="warning" size={16} color={COLORS.expense} />
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity onPress={() => setError(null)}>
                <Ionicons name="close" size={16} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>
          ) : null}
          <TextInput
            style={[styles.input, error && styles.errorInput]}
            value={secondFactorCode}
            placeholder="Enter 6-digit code"
            placeholderTextColor="#9A8478"
            keyboardType="number-pad"
            onChangeText={setSecondFactorCode}
          />
          <TouchableOpacity style={styles.button} onPress={onSecondFactorVerify}>
            <Text style={styles.buttonText}>Verify & Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    )
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid
      enableAutomaticScroll
    >
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/revenue-i3.png')}
          style={styles.illustration}
        />

        <Text style={styles.title}>Welcome Back</Text>
        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="warning" size={16} color={COLORS.expense} />
            <Text style={styles.errorText}>Password Incorrect Please Try Again</Text>
            <TouchableOpacity onPress={() => setError('')}>
              <Ionicons name="close" size={16} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          autoCapitalize="none"
          value={emailAddress}
          placeholderTextColor="#9A8478"
          placeholder="Enter email"
          onChangeText={setEmailAddress}
        />
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          value={password}
          placeholder="Enter password"
          placeholderTextColor="#9A8478"
          secureTextEntry
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={onSignInPress}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton} onPress={() => onSelectAuth('oauth_google')}>
            <Ionicons name="logo-google" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={() => onSelectAuth('oauth_facebook')}>
            <Ionicons name="logo-facebook" size={24} color="#1877F2" />
          </TouchableOpacity>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don&apos;t have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/sign-up')}>
            <Text style={styles.linkText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}