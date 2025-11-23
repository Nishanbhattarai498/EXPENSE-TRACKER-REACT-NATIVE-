// react custom hook file 
import React, { useCallback } from 'react';
import { Alert } from 'react-native';

const API_URL = 'https://expense-tracker-react-native-3.onrender.com/api';


export const useTransaction = (userId) => {
  // logic for handling transactions would go here
  const [ transactions, setTransactions ] = React.useState([]);

  const [summary, setSummary] = React.useState({
    balance: 0,
    income: 0,
    expenses: 0
  });
  const [ isLoading, setIsLoading ] = React.useState(true);
// useCallback to memoize fetchTransactions function
  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/${userId}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } 
  }, [userId]);

   const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error('Failed to fetch summary:', error);
    } 
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
        //promise all to fetch both transactions and summary concurrently
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
        setIsLoading(false);
    }
    }, [fetchTransactions, fetchSummary, userId]);
    
    const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete transaction");

      // Refresh data after deletion
      loadData();
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      Alert.alert("Error", error.message);
    }
  };

  return { transactions, summary, isLoading, loadData, deleteTransaction };
};

