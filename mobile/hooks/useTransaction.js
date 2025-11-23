// react custom hook file 
import React, { useCallback } from 'react';

const API_URL = 'https://localhost:3000/api';


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
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
        setIsLoading(false);
    }
    }, [fetchTransactions, fetchSummary, userId]);
};

