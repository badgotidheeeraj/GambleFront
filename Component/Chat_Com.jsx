import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Chat({ userId = 2, myUsername = 'me' }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const flatListRef = useRef();
  const ws = useRef(null);

  useEffect(() => {
    const connectWebSocket = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
          console.warn('JWT token not found — login required');
          return;
        }

        const wsUrl = `ws://127.0.0.1:8000/ws/chat/${userId}/?token=${token}`;
        ws.current = new WebSocket(wsUrl);

        ws.current.onopen = () => {
          console.log('✅ Connected to chat server');
        };

        ws.current.onmessage = (e) => {
          try {
            const data = JSON.parse(e.data);
            setMessages((prev) => [
              ...prev,
              {
                text: data.message,
                from: data.sender === myUsername ? 'me' : 'other',
              },
            ]);
          } catch (err) {
            console.error('Invalid message format', err);
          }
        };

        ws.current.onerror = (e) => {
          console.error('WebSocket error:', e.message);
        };

        ws.current.onclose = () => {
          console.log('❌ Chat connection closed');
        };
      } catch (err) {
        console.error('Error connecting to WebSocket:', err);
      }
    };

    connectWebSocket();

    return () => {
      ws.current?.close();
    };
  }, [userId, myUsername]);

  const handleSend = () => {
    if (!text.trim()) return;

    const message = {
      message: text,
      receiver_id: userId,
    };

    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
      setMessages((prev) => [...prev, { text, from: 'me' }]);
      setText('');
    } else {
      console.warn('WebSocket is not open.');
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.from === 'me' ? styles.myMessage : styles.theirMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          style={styles.input}
          placeholder="Type a message..."
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f1f1' },
  messagesContainer: { padding: 10, flexGrow: 1, justifyContent: 'flex-end' },
  messageBubble: {
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    maxWidth: '75%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e1e1e1',
  },
  messageText: { color: '#fff' },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    height: 40,
  },
  sendButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    marginLeft: 10,
    borderRadius: 20,
    justifyContent: 'center',
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
