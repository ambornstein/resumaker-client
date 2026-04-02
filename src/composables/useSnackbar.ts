import { ref } from "vue";

type SnackbarStyle = "normal" | "error";

let timeoutId: number;

const message = ref<string>("Test message");
const showSnackbar = ref<boolean>(false);
const style = ref<SnackbarStyle>("normal");

export function useSnackbar() {
  function displayMessage(text: string, styleMode: SnackbarStyle = "normal") {
    clearTimeout(timeoutId);

    message.value = text;
    style.value = styleMode;
    showSnackbar.value = true;    

    timeoutId = setTimeout(hide, 10000);
  }

  function hide() {
    showSnackbar.value = false;
  }

  return { message, showSnackbar, style, displayMessage, hide };
}
