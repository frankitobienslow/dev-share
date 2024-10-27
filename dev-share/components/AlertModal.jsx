import React from 'react';
import { Modal, View, Text, Button } from 'react-native';

const AlertModal = ({ visible, onClose, message }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
    >
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white p-4 rounded-md shadow-lg">
          <Text className="text-lg font-bold mb-2 text-center">{message}</Text>
          <Button title="Cerrar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;