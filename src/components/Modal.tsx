import { Pressable, Modal as RNModal, Text, TouchableOpacity, View } from 'react-native';

interface ModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  handleDeleteBooking: () => void;
}

export function Modal({ showModal, setShowModal, handleDeleteBooking }: Readonly<ModalProps>) {
  return (
    <RNModal
      visible={showModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowModal(false)}>
      <Pressable
        className="flex-1 items-center justify-center bg-black/50"
        onPress={() => setShowModal(false)}>
        <View className="w-4/5 rounded-lg bg-white p-4">
          <Text className="mb-4 text-lg font-semibold">Cancelar Reserva</Text>
          <Text className="mb-4 text-gray-600">Tem certeza que deseja cancelar esta reserva?</Text>
          <View className="flex-row justify-end space-x-4">
            <TouchableOpacity onPress={() => setShowModal(false)} className="px-4 py-2">
              <Text className="text-gray-600">Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeleteBooking} className="px-4 py-2">
              <Text className="text-red-500">Cancelar Reserva</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </RNModal>
  );
}
