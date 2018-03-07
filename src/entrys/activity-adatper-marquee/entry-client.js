import { createApp } from './index'

if (!(parent && parent._is_preview)) {
    const app = createApp();

    app.$mount('#app');
}