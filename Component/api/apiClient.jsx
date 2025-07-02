import axios from 'axios';
import axiosRetry from 'axios-retry';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

// Connection manager for retry and toast handling
const connectionManager = {
    maxAttempts: 5,
    currentAttempt: 0,
    activeToastId: null,
    isRetrying: false,

    reset() {
        this.currentAttempt = 0;
        this.isRetrying = false;
        this.clearToast();
    },

    updateAttempt() {
        this.currentAttempt = Math.min(this.currentAttempt + 1, this.maxAttempts);
        return this.currentAttempt;
    },

    clearToast() {
        if (this.activeToastId) {
            Toast.hide();
            this.activeToastId = null;
        }
    },

    showToast(message, type = 'info') {
        this.clearToast();
        Toast.show({
            type,
            text1: message,
            visibilityTime: type === 'error' ? 0 : 3000,
            autoHide: type !== 'error',
        });
        this.activeToastId = Date.now();
    }
};

// Axios instance
const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 10000,
});

// Attach token to requests
apiClient.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

// Retry logic
axiosRetry(apiClient, {
    retries: connectionManager.maxAttempts - 1,
    retryDelay: retryCount => Math.pow(2, retryCount) * 1000 + Math.random() * 1000,
    retryCondition: error => {
        const method = error.config?.method?.toLowerCase();
        const isSafeMethod = ['get', 'head', 'options'].includes(method);
        return (
            axiosRetry.isNetworkError(error) ||
            (isSafeMethod && [500, 502, 503, 504].includes(error.response?.status))
        );
    },
    onRetry: (retryCount, error, requestConfig) => {
        if (!connectionManager.isRetrying) {
            connectionManager.isRetrying = true;
            connectionManager.currentAttempt = 0;
        }
        if (!requestConfig._retryHandled) {
            requestConfig._retryHandled = true;
            const attempt = connectionManager.updateAttempt();
            connectionManager.showToast(`Reconnecting... Attempt ${attempt}/${connectionManager.maxAttempts}`, 'info');
        }
    }
});

// Response Interceptor
apiClient.interceptors.response.use(
    response => {
        if (connectionManager.isRetrying) {
            connectionManager.showToast('Reconnected successfully!', 'success');
            connectionManager.reset();
        }
        return response;
    },
    error => {
        const { config, response } = error;
        const isFinalAttempt = config?.axiosRetry?.retryCount === connectionManager.maxAttempts - 1;

        if (isFinalAttempt) {
            connectionManager.showToast('Service unavailable. Please try again later.', 'error');
            connectionManager.reset();
        } else if (response?.status && response.status < 500) {
            connectionManager.clearToast();
            Toast.show({
                type: 'error',
                text1: response?.data?.message || 'An error occurred. Please try again later.',
                visibilityTime: 5000,
            });
        }
        return Promise.reject(error);
    }
);

export const resetConnectionState = () => connectionManager.reset();
export default apiClient;
