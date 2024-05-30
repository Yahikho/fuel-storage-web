import { reactive } from 'vue';

interface Toast {
    id: number;
    message: string;
    type?: 'info' | 'warn' | 'danger' | 'success'
}

const toasts = reactive<Toast[]>([]);
let toastId = 0;

export const useToast = () => {
    const addToast = (message: string, type?: 'info' | 'warn' | 'danger' | 'success', duration: number = 3000) => {
        const id = toastId++;
        toasts.push({ id, message, type });
        setTimeout(() => {
            const index = toasts.findIndex(toast => toast.id === id);
            if (index !== -1) {
                toasts.splice(index, 1);
            }
        }, duration);
    };

    return { toasts, addToast };
};
