<script setup>
import NavBar from '../components/NavBar.vue';
import MobileNavbar from '../components/MobileNavbar.vue';
import FooTer from '../components/FooTer.vue';
import ProJects from '../components/ProJects.vue';
import TechStack from '../components/TechStack.vue';
import Top3Blogs from '../components/Top3Blogs.vue';
import ConTact from '../components/ConTact.vue';

const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
}
</script>

<template>
    <NavBar />
    <MobileNavbar />
    <div class="--introductionContainer">
        <a href="https://aidenderksen.netlify.app/" class="--popUpBtn">Bekijk niewste project <i
                class='bx bx-arrow-down-right-stroke'></i>
        </a>
        <h2 class="max-[768px]:text-[40px] text-center">Alexander Zoet Front-end developer</h2>
        <p><span class="font-bold">Design</span> meets <span class="font-bold">development</span>.</p>
        <div class="--contactBtnsGroup">
            <a href="mailto:alexanderzoet@gmail.com" class="--aBtn">Email mij<i class='bxr  bx-envelope'></i> </a>
            <a href="https://wa.me/31628561146" target="_blank" class="--aBtn">
                Bericht mij<i class='bxl  bx-whatsapp'></i> </a>
        </div>
    </div>
    <div class="w-full flex justify-center items-center mt-[25%]">
        <h3>scroll down<i class='bxr bx-arrow-down-stroke animate-bounce'></i> </h3>
    </div>
    <div class="--mainContainer" id="aboutMe">
        <div class="--textContainer">
            <h1>Alexander Zoet</h1>
            <p>Mijn​‍​‌‍​‍‌ naam is Alexander Zoet en ik ben een enthousiaste front-end developer die graag met moderne
                technieken mooie en gebruiksvriendelijke webapplicaties bouwt. Met HTML, CSS, JavaScript (ES6+) en
                Tailwind CSS maak ik mooie, goed gestructureerde webpagina`s die er goed uit zien en technisch kloppen.

                Ik werk graag zonder externe libraries, omdat ik de onderliggende logica van mijn code zo goed mogelijk
                wil begrijpen. Op deze manier ontwikkel ik eigen, herbruikbare componenten en dashboards die precies
                doen wat jij wil.

                Op dit moment ben ik me aan het verdiepen in Laravel (PHP) en SQL, zodat ik meer kennis heb van de
                volledige webstack. Ik richt me op kwaliteit, structuur en efficiëntie. Iedere code regel moet iets
                ​‍​‌‍​‍‌opleveren.
            </p>
            <div class="mt-5 gap-8 flex flex-wrap max-[768px]:justify-center">
                <button @click="scrollToSection('projects')">Bekijk Projecten</button>
                <button @click="scrollToSection('contact')">Contact</button>
            </div>
        </div>
        <div class="--imageContainer min-[768px]:hover:scale-110 transition-all duration-500">
            <img src="../img/Ik.png" alt="">
        </div>
    </div>
    <TechStack />
    <Top3Blogs />
    <h2 class="flex justify-center text-2xl mt-[250px] text-center">Bekijk mijn projecten</h2>
    <section id="projects" class="--projectsSection">

        <ProJects />

    </section>
    <ConTact id="contact" />
    <FooTer />
</template>