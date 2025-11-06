<template>
    <nav class="--mobileNavbar">
        <div class="flex flex-row justify-between items-center w-full">
            <div class="flex items-center justify-between">
                <h3>
                    <a href="/">Alexander Zoet</a>
                </h3>

            </div>
            <!-- Light/Dark Toggle -->
            <button @click="toggleTheme" class="--lightDarkBtn" :class="isDark
                ? 'bg-gradient-to-r from-gray-800 to-blue-900'
                : 'bg-gradient-to-r from-sky-300 to-sky-500'">
                <div class="absolute w-8 h-8 rounded-full bg-white shadow-md transform transition-all duration-500 flex items-center justify-center"
                    :class="isDark ? 'translate-x-7 bg-yellow-100' : 'translate-x-0 bg-yellow-400'">
                    <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
                        class="w-5 h-5 text-yellow-600">
                        <path
                            d="M12 4.75a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 12 4.75zM12 19.25a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 12 19.25zM4.75 12a.75.75 0 0 1-.75-.75v-.5a.75.75 0 0 1 1.5 0v.5A.75.75 0 0 1 4.75 12zM19.25 12a.75.75 0 0 1-.75-.75v-.5a.75.75 0 0 1 1.5 0v.5A.75.75 0 0 1 19.25 12zM6.47 6.47a.75.75 0 0 1 1.06 0l.35.35a.75.75 0 1 1-1.06 1.06l-.35-.35a.75.75 0 0 1 0-1.06zM16.12 16.12a.75.75 0 0 1 1.06 0l.35.35a.75.75 0 1 1-1.06 1.06l-.35-.35a.75.75 0 0 1 0-1.06zM6.47 17.53a.75.75 0 0 1 1.06 0l.35.35a.75.75 0 0 1-1.06 1.06l-.35-.35a.75.75 0 0 1 0-1.06zM16.12 7.88a.75.75 0 0 1 1.06 0l.35.35a.75.75 0 1 1-1.06 1.06l-.35-.35a.75.75 0 0 1 0-1.06z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
                        class="w-5 h-5 text-gray-700">
                        <path
                            d="M21.752 15.002A9.72 9.72 0 0 1 12 21.75a9.75 9.75 0 0 1 0-19.5c.682 0 1.35.07 1.996.204a9.001 9.001 0 1 0 7.756 12.548z" />
                    </svg>
                </div>
            </button>
            <!-- Hamburger Button (mobile) -->
            <button class="--HamburgerBtn" @click="toggleMenu">
                <span class="text-black bg-black block h-1 rounded transition-all duration-300"
                    :class="{ 'rotate-45 translate-y-2': isMenuOpen }"></span>
                <span class="text-black bg-black block h-1 rounded transition-all duration-300"
                    :class="{ 'opacity-0': isMenuOpen }"></span>
                <span class="text-black bg-black block h-1 rounded transition-all duration-300"
                    :class="{ '-rotate-45 -translate-y-2': isMenuOpen }"></span>
            </button>
        </div>
        <!-- Mobile Menu -->
        <transition name="slide-fade">
            <ul v-if="isMenuOpen"
                class="mt-4 flex flex-row justify-between w-full gap-4 text-lg font-medium p-6">
                <li><a href="#projects" @click="closeMenu" class="hover:text-[#c300ff] transition-colors">Projects</a>
                </li>
                <li><a href="#contact" @click="closeMenu" class="hover:text-[#c300ff] transition-colors">Contact</a>
                </li>
                <li v-if="user">
                    <a @click="logout" class="cursor-pointer hover:text-red-500 transition-colors">Logout</a>
                </li>
            </ul>
        </transition>
    </nav>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { supabase } from "../supabase/supabase.js"
import { useRouter } from "vue-router"

const router = useRouter()
const user = ref(null)
const isMenuOpen = ref(false)
const isDark = ref(false)

onMounted(async () => {
    const { data } = await supabase.auth.getUser()
    user.value = data.user
    isDark.value = localStorage.theme === "dark"
    apply()
})

const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value)
const closeMenu = () => (isMenuOpen.value = false)

const logout = async () => {
    await supabase.auth.signOut()
    router.push("/")
}

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

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease;
}

.slide-fade-enter-from {
    opacity: 0;
    transform: translateY(-10px);
}

.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>