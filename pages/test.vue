<script lang="ts" setup>

import {computed, onMounted} from "vue";
import {useNuxtApp} from "#app";

definePageMeta({
  layout: "guest",
})

const {$store} = useNuxtApp()

</script>

<template>

<!--  <div v-for="age in ages" :key="age">-->
<!--    <FooAge :initialValue="age" />-->
<!--  </div>-->

  <FooAge initialValue="5" v-on:ageChanged="(data) => console.log(data)" />
  <hr>
  <FooAge initialValue="8" />
  <hr>
  <FooAge initialValue="20" />
  <hr>
  <FooAge />

</template>

<style scoped lang="scss">

</style>
