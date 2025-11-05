<script setup>
import NavBar from './components/NavBar.vue';
import FooTer from './components/FooTer.vue';

</script>

<template>
    <NavBar />
    <div class="--mainContainer">
        <div class="--textContainer">
            <h1>Alexander Zoet</h1>
            <p>Ik ben Alexander Zoet, een enthousiaste front-end developer die graag nieuwe technieken ontdekt. Mijn
                specialiteit is het ontwerpen van gebruiksvriendelijke websites met moderne tools zoals HTML/CSS,
                JavaScript en
                Tailwind. Momenteel studeer ik aan de BIT Academy en ben ik bezig mijn kennis van JavaScript verder te
                verdiepen.
            </p>
            <div class="mt-5 gap-8 flex">
                <button>Projecten</button>
                <button>Contact</button>
            </div>
        </div>
        <div class="--imageContainer">
            <img src="../public/img/Ik.png" alt="">
        </div>
    </div>

    <FooTer />
</template>
