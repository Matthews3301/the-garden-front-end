import { ref, type Ref } from 'vue';

export enum AlertType {
  Success = 'Success',
  Info = 'Info',
  Error = 'Error',
}

const alertType: Ref<AlertType> = ref(AlertType.Info);
const alertMessage = ref('');
const alertVisible = ref(false);

export default function useAlert() {
  const showAlert = ({ type, message }: { type: AlertType; message: string }) => {
    alertType.value = type;
    alertMessage.value = message;
    alertVisible.value = true;

    setTimeout(() => {
      clearAlert();
    }, 5000);
  };

  const clearAlert = () => {
    alertVisible.value = false;
    alertMessage.value = '';
    alertType.value = AlertType.Info;
  };

  return {
    alertType,
    alertMessage,
    alertVisible,
    showAlert,
    clearAlert,
  };
}
