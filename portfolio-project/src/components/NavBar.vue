<template>
  <nav class="--navbar">
    <ul>
      <li>
        <h3 class="font-bold"><a href="/">Alexander Zoet</a></h3>
      </li>
    </ul>
    <ul class="flex flex-row gap-8">
      <li>Projects</li>
      <li>contact</li>
    </ul>
    <ul class="flex flex-row gap-8">
      <li @click="toggleTheme" class="cursor-pointer select-none hover:opacity-60">
        {{ isDark ? "Light Mode" : "Dark Mode" }}
      </li> <a v-if="user" @click="logout" class="cursor-pointer hover:text-red-500">
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