const picnic = defineAsyncComponent(() => loadModule('./page/picnic.vue', loaderOptions));
// const animal = defineAsyncComponent(() => loadModule('./page/animal.vue', loaderOptions));
// const loading = defineAsyncComponent(() => loadModule('./page/loading.vue', loaderOptions));
// const HomePage = defineAsyncComponent(() => loadModule('./page/home.vue', loaderOptions));
// const HomePage = defineAsyncComponent(() => loadModule('./page/home.vue', loaderOptions));
// const AboutPage = defineAsyncComponent(() => loadModule('./page/about.vue', loaderOptions));

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		// { path: '/', redirect: '/err404', meta: { requiresAuth: true, showHeader: true } },
		// { path: '/err404', component: LoginPage, meta: { showHeader: false } },
		{ path: '/', component: picnic },
		// { path: '/err404', component: err404 },
		// { path: '/animal', component: animal },
		// { path: '/about', component: AboutPage, meta: { requiresAuth: true, showHeader: true } },
	]
});

// router.beforeEach(async (to) => {
// 	const client = window.supabaseAuth.getClient();
// 	const {
// 		data: { session },
// 		error
// 	} = await client.auth.getSession();

// 	if (to.meta.requiresAuth && (error || !session)) {
// 		return {
// 			path: '/login',
// 			query: {
// 				redirect: to.fullPath
// 			}
// 		};
// 	}

// 	return true;
// });




router.onError((error) => {
	console.error('Router 載入錯誤摘要：', {
		message: error?.message
	});
});
