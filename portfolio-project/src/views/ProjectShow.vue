<template>
  <NavBar />
  <MobileNavbar />
  <div class="projectShow max-[768px]:hidden pt-[150px]">
    <button class="--backBtn" @click="$router.back()">← Terug</button>

    <div v-if="project" class="--projectDetails">
      <div class="--projectInfo">
        <h1 class="projectTitle">{{ project.title }}</h1>
        <p class="projectDescription">{{ project.description }}</p>
      </div>

      <div v-if="filteredImages.length" class="--imageCarousel relative group cursor-pointer">
        <transition name="fade" mode="out-in">
          <img :key="filteredImages[currentImage]" :src="filteredImages[currentImage]"
            class="--carouselImage w-full h-full object-cover object-center rounded-[10px]" alt="Project afbeelding" />
        </transition>

        <button @click.stop="prevImage" class="carouselBtn prev">‹</button>
        <button @click.stop="nextImage" class="carouselBtn next">›</button>

        <button @click.stop="openFullscreen" class="--fulscreenBtn" title="Bekijk fullscreen">
          ⤢
        </button>
      </div>
    </div>

    <p v-else>Laden...</p>
  </div>

  <transition name="fade">
    <div v-if="isFullscreen" class="fixed inset-0 bg-black/90 flex items-center justify-center z-100">
      <img :src="filteredImages[currentImage]" class="max-w-[90%] max-h-[90%] object-contain rounded-lg"
        alt="Fullscreen afbeelding" />

      <button @click="closeFullscreen" class="--closeFullscreenBtn">
        ✕
      </button>

      <button @click="prevImage" class="carouselBtn prev" title="Vorige afbeelding">
        ‹
      </button>

      <button @click="nextImage" class="carouselBtn next" title="Volgende afbeelding">
        ›
      </button>
    </div>
  </transition>
  <button class="--backBtn mt-[150px]" @click="$router.back()">← Terug</button>
  <div class="projectShow max-[768px]:flex hidden pt-[150px]">

    <div v-if="project" class="--projectDetails">
      <div class="--projectInfo">
        <h1 class="--projectTitle">{{ project.title }}</h1>
        <p class="--projectDescription">{{ project.description }}</p>
      </div>
      <h3>Afbeeldingen<i class='bxr bx-arrow-down-stroke animate-bounce'></i> </h3>
      <div v-if="filteredImages.length" class="space-y-6 mt-10">
        <div v-for="(img, i) in filteredImages" :key="img" class="w-full">
          <img :src="img" class="w-full h-[300px] rounded-[10px] object-cover cursor-pointer" alt="project afbeelding"
            @click="; currentImage = i; isFullscreen = true" />
        </div>
      </div>
    </div>

    <p v-else>Laden...</p>
  </div>
  <FooTer />
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../supabase/supabase.js'
import NavBar from '../components/NavBar.vue'
import FooTer from '../components/FooTer.vue'
import MobileNavbar from '../components/MobileNavbar.vue'

const route = useRoute()
const project = ref(null)
const currentImage = ref(0)
const isFullscreen = ref(false)

// Afbeeldingen vooraf laden
function preloadImages(images) {
  images.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}

// Project ophalen
onMounted(async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', route.params.id)
    .single()

  if (error) {
    console.error('❌ Fout bij ophalen project:', error.message)
  } else {
    project.value = data
  }
})

// Zodra project geladen is → preload images
watch(project, (newVal) => {
  if (newVal && newVal.images) {
    preloadImages(newVal.images)
  }
})

// ✅ Filter front image eruit (veilig)
const filteredImages = computed(() => {
  if (!project.value || !project.value.images) return []

  const imgs = project.value.images
  const front = project.value.front_img

  if (front) {
    // Robuuste check: filter op deel van URL of bestandsnaam
    return imgs.filter((img) => !img.includes(front))
  }
  return imgs
})

// Carousel navigatie
const nextImage = () => {
  if (!filteredImages.value.length) return
  currentImage.value = (currentImage.value + 1) % filteredImages.value.length
}

const prevImage = () => {
  if (!filteredImages.value.length) return
  currentImage.value =
    (currentImage.value - 1 + filteredImages.value.length) %
    filteredImages.value.length
}

// ✅ Fullscreen functies
const openFullscreen = () => {
  isFullscreen.value = true
}

const closeFullscreen = () => {
  isFullscreen.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
