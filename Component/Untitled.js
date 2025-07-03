import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import MenuButton from './MenuButton';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
  labelColor: () => '#aaa',
  strokeWidth: 3,
  propsForBackgroundLines: { stroke: 'none' },
};

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([50, 52, 51, 53, 54, 52, 55]);
  const [actions, setActions] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://127.0.0.1:8000/ws/game/');

    ws.current.onopen = () => {
      console.log('✅ WebSocket connected');
      ws.current.send(JSON.stringify({ type: 'init', message: 'Client connected' }));
    };

    ws.current.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        console.log('📩 Received:', msg);

        if (msg.type === 'update_price' && typeof msg.value === 'number') {
          setData((prev) => prev.slice(1).concat(msg.value));
        }

        if (
          msg.type === 'new_action' &&
          msg.action &&
          ['put', 'call'].includes(msg.action.type)
        ) {
          setActions((prev) => [...prev, msg.action]);
        }
      } catch (err) {
        console.error('Invalid WebSocket message:', e.data);
      }
    };

    ws.current.onerror = (e) => {
      console.error('❌ WebSocket error:', e.message);
    };

    ws.current.onclose = () => {
      console.warn('⚠️ WebSocket closed');
    };

    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  const sendAction = (type) => {
    const value = data[data.length - 1];
    const action = { type, index: data.length - 1, value };

    setActions((prev) => [...prev, action]);

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: 'action', action }));
    }
  };

  const handlePut = () => sendAction('put');
  const handleCall = () => sendAction('call');

  const renderActionMarkers = () => {
    return actions
      .filter((action) => ['put', 'call'].includes(action.type))
      .map((action, i) => {
        const chartWidth = screenWidth - 32;
        const chartHeight = 220;
        const x = (action.index / (data.length - 1)) * chartWidth;
        const min = Math.min(...data);
        const max = Math.max(...data);
        const y = chartHeight - ((action.value - min) / (max - min || 1)) * chartHeight;

        return (
          <View
            key={i}
            style={[
              styles.marker,
              {
                left: x + 8,
                top: y + 4,
              },
            ]}
          >
            <View
              style={[
                styles.markerDot,
                {
                  backgroundColor: action.type === 'put' ? '#e74c3c' : '#27ae60',
                },
              ]}
            />
            <Text
              style={[
                styles.markerLabel,
                {
                  color: action.type === 'put' ? '#e74c3c' : '#27ae60',
                },
              ]}
            >
              {action.type.toUpperCase()}
            </Text>
          </View>
        );
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📈 Live Trading Chart</Text>

      <MenuButton
        title="Open Menu"
        icon="menu"
        backgroundColor="#4a90e2"
        onPress={() => navigation.openDrawer?.()}
      />

      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: Array(data.length).fill(''),
            datasets: [{ data }],
          }}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          withDots={false}
          withInnerLines={false}
          withOuterLines={false}
        />
        {renderActionMarkers()}
      </View>

      <View style={styles.buttonRow}>
        <MenuButton title="Put" icon="trending-down" backgroundColor="#e74c3c" onPress={handlePut} />
        <MenuButton title="Call" icon="trending-up" backgroundColor="#27ae60" onPress={handleCall} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f7fafd',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  chartContainer: {
    width: screenWidth - 32,
    height: 220,
    marginVertical: 12,
  },
  chart: {
    borderRadius: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 18,
    gap: 16,
  },
  marker: {
    position: 'absolute',
    zIndex: 10,
    alignItems: 'center',
  },
  markerDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 2,
  },
  markerLabel: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
// Note: Ensure you have the necessary dependencies installed for WebSocket and charting.
// You can install them using:
// npm install react-native-websocket react-native-chart-kit
// or
// yarn add react-native-websocket react-native-chart-kit
// This code assumes you have a WebSocket server running at ws://127.0.0      