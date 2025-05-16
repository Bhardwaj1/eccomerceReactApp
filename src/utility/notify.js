// src/utils/notify.js
import { toast } from 'sonner';

export const notify = (message, type = 'default') => {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'warning':
      toast.warning(message);
      break;
    case 'info':
      toast.info(message);
      break;
    default:
      toast(message);
  }
};
