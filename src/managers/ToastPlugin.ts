import { App, createApp, h } from 'vue';
import Toast from '../components/common/Toast.vue';
import { useToast } from '../managers/ToastManager';

const ToastPlugin = {
    install(app: App) {
        const toast = useToast();
        app.config.globalProperties.$toast = toast.addToast;

        const ToastWrapper = {
            setup() {
                return () => h('div', { class: 'toast-wrapper fixed top-0 mt-1' }, toast.toasts.map(t =>
                    h(Toast, { key: t.id, message: t.message, type: t.type })
                ));
            }
        };

        const toastApp = createApp(ToastWrapper);
        const toastContainer = document.createElement('div');
        document.body.appendChild(toastContainer);
        toastApp.mount(toastContainer);
    }
};

export default ToastPlugin;
