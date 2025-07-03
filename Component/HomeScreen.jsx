import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
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
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24 },
});

export default HomeScreen;
