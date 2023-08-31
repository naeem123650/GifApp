<template>
	<nav>
		<div class="navbar bg-black flex justify-between flex-wrap">
			<div class="">
				<a class="btn btn-ghost normal-case text-xl">GIF World</a>
			</div>
			<div>
				<label for="toggleDeveloperMode" class="flex items-center cursor-pointer">
					<div class="relative">
						<input type="checkbox" id="toggleDeveloperMode" class="sr-only" v-model="isDevMode" @change="handleDeveloperMode">
						<div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
						<div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
					</div>
					<div class="ml-3 text-white font-medium font-mono">
						<span :class="[isDevMode ? 'text-white' : 'text-gray-700']">Developer Mode</span>
					</div>
				</label>
			</div>
		</div>
	</nav>
	<section class="bg-blue-500">
		<div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:px-12">
			<h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">GIF World</h1>
			<p class="mb-8 text-lg font-normal text-white lg:text-xl sm:px-16 xl:px-48 ">GIF Place for the
			<span class="font-mono">&lt;Developers /&gt;</span></p>
			<div>
				<input type="text" placeholder="Search Category here" class="input input-info bg-white input-bordered w-full max-w-xs text-black" v-model="searchedCategory" @keyup="handleSearchCategory">
			</div>
			<strong class="text-white underline cursor-pointer" @click="handleClearSearch" v-show="!!searchedCategory">Clear Search</strong>

			<div class="mt-3 bg-white p-3 rounded md:w-[50%] mx-auto max-h-56 overflow-auto" v-show="filteredCategory.length > 0">
				<div class="p-2 m-1 text-left text-black font-semibold hover:bg-gray-300 rounded border cursor-pointer capitalize" v-for="(filter_category,index) in filteredCategory" :key="index" @click="findCategoryWise(filter_category.id,filter_category.name)"># {{ filter_category.name }}</div>
			</div>
		</div>
		<div class="mx-auto max-w-screen-xl p-4 border-2 border-white rounded bg-blue-400">
			<strong class="text-black text-xl">Popular Tags:</strong>
			<div class="flex flex-wrap my-2">
				<template v-for="popular in popularCategories" :key="popular.id"> 
					<button class="btn btn-secondary border-2 btn-sm rounded m-1 capitalize" @click="findCategoryWise(popular.id,popular.name)" :class="[searchedCategory == popular.name ? 'border-green-500 bg-green-300' : '']">{{popular.name}}</button>
				</template>
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
			<div class="my-4" v-if="filteredImages.length > 0">
				<h1 class="font-bold text-2xl text-black">
					All GIFs and Memes
				</h1>
				<h5 class="text-xl my-2 font-semibold text-gray-500" v-if="searchedCategory">Tag: "{{ searchedCategory }}"</h5>
			</div>
			<h1 class="font-bold text-2xl mb-4 text-black text-center" v-else>Not Found</h1>
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
				<div v-for="image in filteredImages" :key="image.id">
					<img class="h-60 w-full mx-auto max-w-full rounded-lg border-4 hover:border-blue-500 bg-purple-300" :src="image.imagePath">
					<div class="text-center m-2">
						<button class="btn rounded px-4 btn-xs" @click="copyToClipboard($event,image.imagePath)">Copy</button>
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
			isLoading:false,
			searchedCategory: '',
			categoryList: [],
			filteredCategory: [],
			memeData: memeData,
			allImages: [],
			filteredImages: [],
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
			// await $supabase
			// 	.from('images')
			// 	.insert([
			// 		{ name:"gif_172.gif", status:true,category_id:[30]},
			// 		{ name:"gif_173.gif", status:true,category_id:[30]},
			// 		{ name:"gif_174.gif", status:true,category_id:[30]},
			// 		{ name:"gif_175.gif", status:true,category_id:[30]},
			// 		{ name:"gif_176.gif", status:true,category_id:[30]},
			// 		{ name:"gif_177.gif", status:true,category_id:[30]},
			// 		{ name:"gif_178.gif", status:true,category_id:[30]},
			// 		{ name:"gif_179.gif", status:true,category_id:[30]},
			// 		{ name:"gif_180.gif", status:true,category_id:[30]},

			// 		{ name:"gif_181.gif", status:true,category_id:[31]},
			// 		{ name:"gif_182.gif", status:true,category_id:[31]},
			// 		{ name:"gif_183.gif", status:true,category_id:[31]},
			// 		{ name:"gif_184.gif", status:true,category_id:[31]},
			// 		{ name:"gif_185.gif", status:true,category_id:[31]},
			// 		{ name:"gif_186.gif", status:true,category_id:[31]},

			// 		{ name:"gif_187.gif", status:true,category_id:[32]},
			// 		{ name:"gif_188.gif", status:true,category_id:[32]},
			// 		{ name:"gif_189.gif", status:true,category_id:[32]},
			// 		{ name:"gif_190.gif", status:true,category_id:[32]},
			// 		{ name:"gif_191.gif", status:true,category_id:[32]},
			// 		{ name:"gif_192.gif", status:true,category_id:[32]},

			// 		{ name:"gif_193.gif", status:true,category_id:[33]},
			// 		{ name:"gif_194.gif", status:true,category_id:[33]},
			// 		{ name:"gif_195.gif", status:true,category_id:[33]},
			// 		{ name:"gif_196.gif", status:true,category_id:[33]},
			// 		{ name:"gif_197.gif", status:true,category_id:[33]},
			// 		{ name:"gif_198.gif", status:true,category_id:[33]},
			// 		{ name:"gif_199.gif", status:true,category_id:[33]},

			// 		{ name:"gif_200.gif", status:true,category_id:[27]},
			// 		{ name:"gif_201.gif", status:true,category_id:[27]},
			// 		{ name:"gif_202.gif", status:true,category_id:[27]},
			// 		{ name:"gif_203.gif", status:true,category_id:[27]},
			// 		{ name:"gif_204.gif", status:true,category_id:[27]},
			// 		{ name:"gif_205.gif", status:true,category_id:[27]},
			// 		{ name:"gif_206.gif", status:true,category_id:[27]},

			// 		{ name:"gif_207.gif", status:true,category_id:[28]},
			// 		{ name:"gif_208.gif", status:true,category_id:[28]},
			// 		{ name:"gif_209.gif", status:true,category_id:[28]},
			// 		{ name:"gif_210.gif", status:true,category_id:[28]},
			// 		{ name:"gif_211.gif", status:true,category_id:[28]},
			// 		{ name:"gif_212.gif", status:true,category_id:[28]},

			// 		{ name:"gif_213.gif", status:true,category_id:[29]},
			// 		{ name:"gif_214.gif", status:true,category_id:[29]},
			// 		{ name:"gif_215.gif", status:true,category_id:[29]},
			// 		{ name:"gif_216.gif", status:true,category_id:[29]},
			// 		{ name:"gif_217.gif", status:true,category_id:[29]},
			// 		{ name:"gif_218.gif", status:true,category_id:[29]},
			// 		{ name:"gif_219.gif", status:true,category_id:[29]},		
			// 	])
			// 	.select()



			// const images = await $supabase.storage
			// .from('GIF_IMAGES')
			// .list();

			// if (images?.data?.length > 0) {
			// 	var { data, error } = images;
			// 	console.log({data});
			// }
			this.isLoading=true;
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
		handleSearchCategory() {
			if(this.searchedCategory.length > 0){
				var filter_category = this.categoryList.filter((item) => {
					return item.name.toLowerCase().includes(this.searchedCategory.toLowerCase());
				});
				this.filteredCategory=filter_category;
			}
			else{
				this.filteredCategory=[];
			}
		},
		findCategoryWise(category_id,category_name){
			this.filteredImages = this.allImages.filter(item => {
				return item.category_id.length > 0 ? item.category_id.includes(category_id) : true;
			});
			this.searchedCategory=category_name;
			this.filteredCategory=[];
		},
		handleDeveloperMode(){
			this.searchedCategory='';
		},
		handleClearSearch(){
			this.searchedCategory='';
			this.filteredImages = this.allImages;
			this.filteredCategory=[];

		},
		copyToClipboard(event,path) {
			const textField = document.createElement('textarea');
			textField.value = path;
			document.body.appendChild(textField);
			textField.select();
			document.execCommand('copy');
			textField.remove();
			event.target.textContent ='Copied';
			setTimeout(() => {
				event.target.textContent ='Copy';
			}, 2000);
		},
	},
	computed: {
		popularCategories(){
			return this.categoryList.filter(item => this.isDevMode ? (item.type == 'dev') : (item.type == 'normal')).sort(() => Math.random() - 0.5).slice(0,15);
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