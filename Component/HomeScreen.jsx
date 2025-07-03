import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const AviatorMini = () => {
  const [multiplier, setMultiplier] = useState(1.0);
  const [crashPoint, setCrashPoint] = useState(null);
  const [gameStatus, setGameStatus] = useState('waiting'); // waiting, running, result
  const [result, setResult] = useState(null);
  const [betAmount, setBetAmount] = useState('');
  const [balance, setBalance] = useState(null);
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('ws://127.0.0.1:8000/ws/game/');

    socket.onopen = () => {
      console.log('✅ Connected');
      setMessages(prev => [...prev, 'Connected to server']);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.balance !== undefined) setBalance(data.balance);
        if (data.multiplier !== undefined) {
          setMultiplier(data.multiplier);
          setGameStatus('running');
        }

        if (data.status === 'crashed' || data.status === 'cashed_out') {
          setCrashPoint(data.multiplier);
          setGameStatus('result');
          setResult(data.message);
        }

        if (data.message) {
          setMessages(prev => [...prev, data.message]);
        }

      } catch (err) {
        console.warn('Invalid WS message:', event.data);
      }
    };

    socket.onclose = () => {
      setMessages(prev => [...prev, 'Disconnected']);
    };

    socket.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

    setWs(socket);
    return () => socket.close();
  }, []);

  const handleBet = () => {
    if (ws && betAmount) {
      ws.send(JSON.stringify({ bet: parseFloat(betAmount) }));
      setBetAmount('');
      setResult(null);
      setCrashPoint(null);
    }
  };

  const handleCashout = () => {
    if (ws) {
      ws.send(JSON.stringify({ action: 'cashout' }));
    }
  };

  const resetGame = () => {
    setMultiplier(1.0);
    setCrashPoint(null);
    setResult(null);
    setGameStatus('waiting');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🛩️ Aviator Crash Game</Text>

      <Text style={styles.balance}>💰 Balance: ₹{balance?.toFixed(2) ?? '...'}</Text>

      <View style={styles.multiplierBox}>
        <Text style={[styles.multiplierText, gameStatus === 'result' && styles.crashed]}>
          {multiplier?.toFixed(2)}x
        </Text>
      </View>

      {gameStatus === 'waiting' && (
        <>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter Bet Amount"
            value={betAmount}
            onChangeText={setBetAmount}
          />
          <Button title="Place Bet & Start" onPress={handleBet} color="#28a745" />
        </>
      )}

      {gameStatus === 'running' && (
        <Button title="💸 Cash Out" onPress={handleCashout} color="#ffc107" />
      )}

      {gameStatus === 'result' && (
        <>
          <Text style={styles.resultText}>{result}</Text>
          <Button title="Play Again" onPress={resetGame} color="#007bff" />
        </>
      )}

      <View style={styles.logBox}>
        <Text style={styles.logTitle}>Logs</Text>
        {messages.map((msg, index) => (
          <Text key={index} style={styles.logItem}>{msg}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#101010',
    flexGrow: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0ff',
  },
  balance: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  multiplierBox: {
    padding: 30,
    borderRadius: 10,
    backgroundColor: '#202020',
    marginVertical: 30,
  },
  multiplierText: {
    fontSize: 50,
    color: '#0ff',
    fontWeight: 'bold',
  },
  crashed: {
    color: '#f00',
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#666',
    borderWidth: 1,
    borderRadius: 6,
    color: '#fff',
    backgroundColor: '#333',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 20,
    color: '#0f0',
    marginVertical: 15,
  },
  logBox: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#181818',
    padding: 15,
    borderRadius: 10,
  },
  logTitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
    fontWeight: '600',
  },
  logItem: {
    fontSize: 14,
    color: '#ccc',
  },
});

export default AviatorMini;
