import { ToastContainer, Zoom, type ToastOptions } from "react-toastify";

const defaultToastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: false,
  rtl: false,
  pauseOnFocusLoss: false,
  draggable: true,
  pauseOnHover: true,
  transition: Zoom,
};

const GlobalToast: React.FC<Partial<ToastOptions>> = (props) => {
  const toastOptions = { ...defaultToastOptions, ...props };

  return (
    <ToastContainer
      position={toastOptions.position}
      autoClose={toastOptions.autoClose}
      hideProgressBar={toastOptions.hideProgressBar}
      newestOnTop={true}
      closeOnClick={toastOptions.closeOnClick}
      rtl={toastOptions.rtl}
      pauseOnFocusLoss={toastOptions.pauseOnFocusLoss}
      draggable={toastOptions.draggable}
      pauseOnHover={toastOptions.pauseOnHover}
      transition={toastOptions.transition}
    />
  );
};

export default GlobalToast;
