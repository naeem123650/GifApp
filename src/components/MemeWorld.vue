<template>
	<nav>
		<div class="navbar bg-black">
			<div class="flex-1">
				<a class="btn btn-ghost normal-case text-xl">GIF World</a>
			</div>
		</div>
	</nav>
	<section class="bg-blue-500">
		<div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:px-12">
			<h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">GIF World</h1>
			<p class="mb-8 text-lg font-normal text-white lg:text-xl sm:px-16 xl:px-48 ">GIF Place for the
			<span class="font-mono">&lt;Developers /&gt;</span></p>
			<div>
				<input type="search" placeholder="Search Category here" class="input input-info bg-white input-bordered w-full max-w-xs text-black" v-model="selectedCategory" @keyup.enter="handleChangeCategory">
			</div>
			<div class="flex items-center justify-center mt-5">
				<label for="toggleDeveloperMode" class="flex items-center cursor-pointer">
					<div class="relative">
						<input type="checkbox" id="toggleDeveloperMode" class="sr-only" v-model="isDevMode" @change="handleDeveloperMode">
						<div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
						<div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
					</div>
					<div class="ml-3 text-white font-medium" :class="[isDevMode ? 'font-mono' : '']">
						Developer Mode!
					</div>
				</label>
			</div>
		</div>
		<div class="mx-auto max-w-screen-xl p-4 border-2 border-white rounded bg-blue-400">
			<strong class="text-black text-xl">Popular Tags:</strong>
			<div class="flex flex-wrap my-2">
				<div v-for="popular in popularCategories" :key="popular.id"> 
					<button class="btn btn-secondary btn-sm rounded m-1">{{popular.name}}</button>
				</div>
			</div>
		</div>
		<div class="w-full mt-1">
			<marquee direction="left">
				<img src="../assets/images/running_cartoon.gif" class="h-16 pointer-events-none">
			</marquee>
		</div>
	</section>
	<section>
		<div class="mx-auto max-w-screen-xl p-5 md:p-10">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<div v-for="image in filteredImages" :key="image.id">
					<img class="h-60 mx-auto max-w-full rounded-lg border-4 hover:border-blue-500" :src="image.imagePath">
					<div class="text-center m-2">
						<button class="btn rounded px-4 btn-xs">Copy</button>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import memeData from '../../public/db/memeData.json'

export default {
	data() {
		return {
			IMAGE_BASE_URL: import.meta.env.VITE_SUPABASE_STORAGE_URL,
			isDevMode:false,
			selectedCategory: '',
			categoryList: [],
			memeData: memeData,
			allImages: [],
			filteredImages: []
		}
	},
	methods: {
		async getAllCategory() {
			const imageCategory = await $supabase.from("category")
				.select(`id,name,type`)
				.is('status', true);

			if (imageCategory.status == 200) {
				var { data, error } = imageCategory;
				this.categoryList = data;
			}
		},
		async getAllImages() {
			// const images = await $supabase.storage
			// .from('GIF_IMAGES')
			// .list();

			// if (images?.data?.length > 0) {
			// 	var { data, error } = images;
			// 	console.log({data});
			// }
			const images = await $supabase.from("images")
				.select(`id,name,category_id`)
				.is('status', true);

			if (images.status == 200) {
				var { data, error } = images;
				const setImages = data.map(item => {
					return {
						...item,
						imagePath: `${this.IMAGE_BASE_URL}/GIF_IMAGES/${item.name}`
					}
				});
				this.allImages = setImages;
				this.filteredImages = setImages;
			}
		},
		handleChangeCategory() {
			console.log(this.selectedCategory);
			this.filteredImages = this.allImages.filter(item => {
				return item.category_id.length > 0 ? item.category_id.includes(this.selectedCategory) : true;
			});
		},
		handleDeveloperMode(){
			this.selectedCategory='';
		}
	},
	computed: {
		popularCategories(){
			return this.categoryList.filter(item => this.isDevMode ? (item.type == 'dev') : (item.type == 'normal'));
		}
	},
	mounted() {
		this.getAllCategory();
		this.getAllImages();
	}
}
</script>
<style scoped>
#toggleDeveloperMode:checked ~ .dot {
  transform: translateX(100%);
  background-color: #48bb78;
}

</style>