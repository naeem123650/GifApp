<script>
import memeData from '../../public/db/memeData.json'

export default {
  data() {
    return {
      selectedCategory: '',
      memeData: memeData,
      // memeData: [
      //   {
      //     categories: ['Funny', 'Humor'],
      //     single_image_url: 'https://example.com/funny_meme.jpg'
      //   },
      //   {
      //     categories: ['Cats', 'Animals'],
      //     single_image_url: 'https://example.com/cat_meme.jpg'
      //   },
      //   {
      //     categories: ['Dogs', 'Animals'],
      //     single_image_url: 'https://example.com/dog_meme.jpg'
      //   },
      //   {
      //     categories: ['Sarcasm', 'Humor'],
      //     single_image_url: 'https://example.com/sarcasm_meme.jpg'
      //   },
      //   {
      //     categories: ['Funny', 'Humor'],
      //     single_image_url: 'https://example.com/another_funny_meme.jpg'
      //   },
      //   {
      //     categories: ['Cats', 'Animals'],
      //     single_image_url: 'https://example.com/another_cat_meme.jpg'
      //   },
      //   {
      //     categories: ['Dogs', 'Animals'],
      //     single_image_url: 'https://example.com/another_dog_meme.jpg'
      //   },
      //   {
      //     categories: ['Sarcasm', 'Humor'],
      //     single_image_url: 'https://example.com/another_sarcasm_meme.jpg'
      //   },
      //   {
      //     categories: ['Funny', 'Humor'],
      //     single_image_url: 'https://example.com/yet_another_funny_meme.jpg'
      //   },
      //   {
      //     categories: ['Cats', 'Animals'],
      //     single_image_url: 'https://example.com/yet_another_cat_meme.jpg'
      //   },
      //   {
      //     categories: ['Dogs', 'Animals'],
      //     single_image_url: 'https://example.com/yet_another_dog_meme.jpg'
      //   },
      //   {
      //     categories: ['Sarcasm', 'Humor'],
      //     single_image_url: 'https://example.com/yet_another_sarcasm_meme.jpg'
      //   },
      //   {
      //     categories: ['Funny', 'Humor'],
      //     single_image_url: 'https://example.com/last_funny_meme.jpg'
      //   },
      //   {
      //     categories: ['Cats', 'Animals'],
      //     single_image_url: 'https://example.com/last_cat_meme.jpg'
      //   },
      //   {
      //     categories: ['Dogs', 'Animals'],
      //     single_image_url: 'https://example.com/last_dog_meme.jpg'
      //   },
      //   {
      //     categories: ['Sarcasm', 'Humor'],
      //     single_image_url: 'https://example.com/last_sarcasm_meme.jpg'
      //   }
      // ],
      filteredImages: []
    }
  },
  computed: {
    uniqueCategories() {
      const categoriesSet = new Set()
      for (const item of this.memeData) {
        item.categories.forEach((category) => categoriesSet.add(category))
      }
      return Array.from(categoriesSet)
    }
  },
  watch: {
    selectedCategory(newCategory) {
      this.filteredImages = this.memeData.filter((item) => item.categories.includes(newCategory))
    }
  }
}
</script>

<!-- <template>
  <div class="greetings">
    <label for="categoryDropdown">Select a Category:</label>
    <select id="categoryDropdown" v-model="selectedCategory">
      <option value="">Select an option</option>
      <option v-for="category in uniqueCategories" :key="category">
        {{ category }}
      </option>
    </select>

    <hr />
    <hr />

    <div v-if="filteredImages.length > 0">
      <h2>Images in Selected Category</h2>
      <div v-for="(item, index) in filteredImages" :key="index">
        <img :src="item.single_image_url" alt="Meme Image" style="max-width: 200px; margin: 10px" />
      </div>
    </div>
  </div>
</template> -->

<template>
  <div class="flex flex-col items-center p-8">
    <div class="relative w-full max-w-xs">
      <label for="categoryDropdown" class="block text-sm font-medium text-gray-700"
        >Select a Category:</label
      >
      <select
        id="categoryDropdown"
        v-model="selectedCategory"
        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 sm:text-sm"
      >
        <option value="">Select an option</option>
        <option v-for="category in uniqueCategories" :key="category">{{ category }}</option>
      </select>
    </div>

    <div
      v-if="filteredImages.length > 0"
      class="mt-8 w-full max-w-4xl grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <div v-for="(item, index) in filteredImages" :key="index" class="relative">
        <img :src="item.single_image_url" alt="Meme Image" class="w-full h-auto rounded-md" />
      </div>
    </div>
  </div>
</template>
<!-- 
<template>
  <div class="bg-black text-white">
    <header class="py-4 px-8">
      <h1 class="text-3xl font-semibold">Meme Gallery</h1>
    </header>

    <div class="flex flex-col items-center p-8">
      <div class="relative w-full max-w-xs">
        <label for="categoryDropdown" class="block text-sm font-medium text-gray-200"
          >Select a Category:</label
        >
        <select
          id="categoryDropdown"
          v-model="selectedCategory"
          class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 sm:text-sm"
        >
          <option value="">Select an option</option>
          <option v-for="category in uniqueCategories" :key="category">{{ category }}</option>
        </select>
      </div>

      <div
        v-if="filteredImages.length > 0"
        class="mt-8 w-full max-w-4xl grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <div v-for="(item, index) in filteredImages" :key="index" class="relative">
          <img :src="item.single_image_url" alt="Meme Image" class="w-full h-auto rounded-md" />
        </div>
      </div>
    </div>
  </div>
</template> -->
