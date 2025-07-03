import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const Deposit = () => {
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);

  const handleDeposit = () => {
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
      setTransactions([...transactions, numAmount]);
      setAmount('');
    }
  };

  const totalDeposits = transactions.length;
  const totalAmount = transactions.reduce((sum, val) => sum + val, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Deposit</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Deposit" onPress={handleDeposit} />
      <Text style={styles.summary}>Total Deposits: {totalDeposits}</Text>
      <Text style={styles.summary}>Total Amount: ${totalAmount.toFixed(2)}</Text>
      <Text style={styles.subHeader}>Transaction History:</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Text style={styles.transactionItem}>
            #{index + 1}: ${item.toFixed(2)}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10, borderRadius: 5 },
  summary: { fontSize: 16, marginTop: 10 },
  subHeader: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  transactionItem: { fontSize: 16, marginVertical: 2 },
});

export default Deposit;
