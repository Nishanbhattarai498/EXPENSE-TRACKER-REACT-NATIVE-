import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import { SignOutButton } from '../../components/SignOutButton'
import { useTransaction } from '../../hooks/useTransaction'
import { useEffect } from 'react'

export default function Page() {
  const { user } = useUser();
  const { transactions, summary, isLoading, loadData } = useTransaction(user?.id);

  useEffect(() => {
    if (user?.id) {
      loadData();
    }
  }, [user?.id, loadData]);

  console.log("Transactions",transactions)
  console.log("Summary",summary)

  

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        {isLoading ? (
          <Text>Loading transactions...</Text>
        ) : (
          <>
            <Text>Income: {summary.income}</Text>
            <Text>Expenses: {summary.expenses}</Text>
            <Text>Balance: {summary.balance}</Text>
            <Text>Total transactions: {transactions.length}</Text>
          </>
        )}
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  )
}