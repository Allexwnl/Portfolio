<template>
  <nav class="--navbar">
    <ul>
      <li>
        <h3 class="font-bold"><a href="/">Alexander Zoet</a></h3>
      </li>
    </ul>
    <ul class="flex flex-row gap-8">
      <li><a href="/#aboutMe" @click="closeMenu" class="transition-colors">Over mij</a>
                </li>
                <li><a href="/#projects" @click="closeMenu" class="transition-colors">Projects</a>
                </li>
                <li><a href="/#contact" @click="closeMenu" class="transition-colors">Contact</a>
                </li>
    </ul>
    <ul class="flex flex-row gap-8">
      <button @click="toggleTheme" class="--lightDarkBtn"
        :class="isDark ? 'bg-gradient-to-r from-gray-800 to-blue-900' : 'bg-gradient-to-r from-sky-300 to-sky-500'">
        <!-- Zon / Maan icoon -->
        <div
          class="--sunAndMoon"
          :class="isDark ? 'translate-x-9 bg-yellow-100' : ' bg-yellow-400'">
          <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
            class="w-5 h-5 text-yellow-600">
            <path
              d="M12 4.75a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 12 4.75zM12 19.25a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 12 19.25zM4.75 12a.75.75 0 0 1-.75-.75v-.5a.75.75 0 0 1 1.5 0v.5A.75.75 0 0 1 4.75 12zM19.25 12a.75.75 0 0 1-.75-.75v-.5a.75.75 0 0 1 1.5 0v.5A.75.75 0 0 1 19.25 12zM6.47 6.47a.75.75 0 0 1 1.06 0l.35.35a.75.75 0 1 1-1.06 1.06l-.35-.35a.75.75 0 0 1 0-1.06zM16.12 16.12a.75.75 0 0 1 1.06 0l.35.35a.75.75 0 1 1-1.06 1.06l-.35-.35a.75.75 0 0 1 0-1.06zM6.47 17.53a.75.75 0 0 1 1.06 0l.35.35a.75.75 0 0 1-1.06 1.06l-.35-.35a.75.75 0 0 1 0-1.06zM16.12 7.88a.75.75 0 0 1 1.06 0l.35.35a.75.75 0 1 1-1.06 1.06l-.35-.35a.75.75 0 0 1 0-1.06z" />
          </svg>

          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
            class="w-8 h-8 text-gray-700">
            <path
              d="M21.752 15.002A9.72 9.72 0 0 1 12 21.75a9.75 9.75 0 0 1 0-19.5c.682 0 1.35.07 1.996.204a9.001 9.001 0 1 0 7.756 12.548z" />
          </svg>
        </div>
      </button>
      <a v-if="user" @click="logout" class="--dangerA">
        Logout
      </a>
    </ul>
  </nav>
</template>

<script setup>
import { supabase } from '../supabase/supabase.js'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref(null)

onMounted(async () => {
  const { data } = await supabase.auth.getUser()
  user.value = data.user
})

const logout = async () => {
  await supabase.auth.signOut()
  router.push('/')
}


const isDark = ref(false)

onMounted(() => {
  isDark.value = localStorage.theme === "dark"
  apply()
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  localStorage.theme = isDark.value ? "dark" : "light"
  apply()
}

const apply = () => {
  if (isDark.value) document.documentElement.classList.add("dark")
  else document.documentElement.classList.remove("dark")
}
</script>