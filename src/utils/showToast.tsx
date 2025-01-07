import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';

/**
 * Unified toast utility using `react-native-toast-message`.
 *
 * @param type - Type of the toast ('success', 'error', 'info', or custom types).
 * @param message - Message to display in the toast.
 * @param title - Optional title for the toast.
 * @param position - Position of the toast ('top', 'bottom', or 'center').
 */
type ToastParam = {
  type: 'success' | 'error' | 'info';
  message: string;
  title?: string;
  position?: 'top' | 'bottom';
  visibilityTime?: number;
};
const showToast = ({
  type,
  message,
  title,
  position = 'bottom', // Default position
  visibilityTime = 1500,
}: ToastParam) => {
  Toast.show({
    type, // Supports 'success', 'error', 'info', or custom types
    text1: title || 'Notification', // Title of the toast
    text2: message, // Message body
    position, // Top, bottom, or center
    visibilityTime, // Duration in ms
    autoHide: true, // Automatically dismiss after `visibilityTime`
    swipeable: true, // Swipe to dismiss
  });
};

// Define the custom configurations for different toast types
const toastConfig = {
  success: ({text1, text2}: {text1?: string; text2?: string}) => (
    <View style={[styles.toastContainer, styles.success]}>
      <Text style={styles.title}>{text1}</Text>
      <Text style={styles.message}>{text2}</Text>
    </View>
  ),
  error: ({text1, text2}: {text1?: string; text2?: string}) => (
    <View style={[styles.toastContainer, styles.error]}>
      <Text style={styles.title}>{text1}</Text>
      <Text style={styles.message}>{text2}</Text>
    </View>
  ),
  info: ({text1, text2}: {text1?: string; text2?: string}) => (
    <View style={[styles.toastContainer, styles.info]}>
      <Text style={styles.title}>{text1}</Text>
      <Text style={styles.message}>{text2}</Text>
    </View>
  ),
  default: ({text1, text2}: {text1?: string; text2?: string}) => (
    <View style={[styles.toastContainer, styles.default]}>
      <Text style={styles.title}>{text1}</Text>
      <Text style={styles.message}>{text2}</Text>
    </View>
  ),
};
export {showToast, toastConfig};
const styles = StyleSheet.create({
  toastContainer: {
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 10,
  },
  success: {
    backgroundColor: '#4CAF50', // Green for success
  },
  error: {
    backgroundColor: '#F44336', // Red for error
  },
  info: {
    backgroundColor: '#2196F3', // Blue for info
  },
  default: {
    backgroundColor: '#616161', // Gray for default
  },
  title: {
    fontWeight: 'bold',
    color: '#fff',
  },
  message: {
    color: '#fff',
  },
});
