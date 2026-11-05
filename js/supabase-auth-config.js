
(function () {
	const SUPABASE_URL = 'https://zojzhbwwqrsuvpvjomwy.supabase.co';
	const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_JEwm1VmdMqi_N-2QyMGEFA_YkH7cVeX';

	let client = null;

	window.supabaseAuth = {
		getClient() {
			if (client) return client;
			if (!window.supabase || typeof window.supabase.createClient !== 'function') {
				throw new Error('Supabase CDN 尚未載入。');
			}
			if (!SUPABASE_PUBLISHABLE_KEY || SUPABASE_PUBLISHABLE_KEY === '你的_publishable_key') {
				throw new Error('尚未設定 Supabase Publishable key。');
			}
			client = window.supabase.createClient(
				SUPABASE_URL,
				SUPABASE_PUBLISHABLE_KEY,
				{
					auth: {
						flowType: 'pkce',
						persistSession: true,
						autoRefreshToken: true,
						detectSessionInUrl: false
					}
				}
			);
			return client;
		},

		async completeEmailCallback() {
			const client = this.getClient();
			const url = new URL(window.location.href);
			const code = url.searchParams.get('code');
			if (!code) {
				return {
					completed: false,
					session: null
				};
			}

			const { data, error } = await client.auth.exchangeCodeForSession(code);

			if (error) throw error;

			// code 只能使用一次；交換成功後從網址移除，避免重新整理重複交換。
			url.searchParams.delete('code');
			window.history.replaceState(
				window.history.state,
				document.title,
				`${url.pathname}${url.search}${url.hash}`
			);

			return {
				completed: true,
				session: data.session
			};
		}
	};
})();
