<template>
	<div class="scene">
		<h1 class="title">☀️ A Sunny Picnic Day 🌿</h1>
		<!-- 野餐墊 -->
		<div class="picnic-blanket"></div>

		<!-- 三種食物 -->
		<div class="food-container">

			<div class="food" @click="showFood('sand', 4000)">
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

			<div class="food" @click="showFood('beger', 4500)">
				<div v-if="show == null" class="food_girl">
					<div class="food_note">
						要先吃什麼好呢？
						<br>
						🤤🤤🤤
					</div>
					<img :src="girlUrl" alt="">
				</div>
				<div v-if="show == 'beger'" class="food_girl ">
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

			<div class="food" @click="showFood('pizza', 3500)">
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

		<div class="footer">
			Enjoy the sunshine & picnic time ♡
		</div>

	</div>
</template>

<script>
export default {
	data() {
		return {
			girlUrl: "../picture/girl.gif",
			girlUrl_pizza: "../picture/girl_pizza.gif",
			girlUrl_sand: "../picture/girl_sand.gif",
			girlUrl_beger: "../picture/girl_beger.gif",
			show: 'null',
		};
	},
	mounted() {

	},
	methods: {
		showFood(name, t) {
			console.log("今天的野餐真幸福！\n" + name);
			var time;
			clearTimeout(time);
			this.show = name;
			time = setTimeout(() => {
				this.show = null
			}, t);

		}
	},
};
</script>
