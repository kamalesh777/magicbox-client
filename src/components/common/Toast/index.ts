import { enqueueSnackbar } from "notistack";

const variantsArr = ["success", "default", "error", "warning", "info"] as const;

type Variant = (typeof variantsArr)[number]; // Get the values from the array
type Msg = string;

const Toast = (variant: Variant, msg: Msg) => {
  return enqueueSnackbar(msg, {
    variant: variant || "success",
  });
};

export default Toast;
