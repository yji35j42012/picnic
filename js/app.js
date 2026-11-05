const { createApp, defineAsyncComponent } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;
const { loadModule } = window['vue3-sfc-loader'];

const AppHeader = defineAsyncComponent(() => loadModule('./components/AppHeader.vue', loaderOptions));
const loaderOptions = {
    moduleCache: {
        vue: Vue
    },

    async getFile(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`無法載入 Vue 元件：${url}`);
        }
        return response.text();
    },

    addStyle(textContent) {
        const style = document.createElement('style');
        style.textContent = textContent;
        document.head.appendChild(style);
    }
};
