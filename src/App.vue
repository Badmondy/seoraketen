<template>
  <Header/>
  <Main/>
</template>

<script setup>
import Main from "@/components/layout/Main.vue";
import Header from '@/components/layout/Header.vue'

import {ref} from 'vue';
import config from './config/lang.json'

const lang = 'sv';
const title = ref(config.title[lang])

</script>

