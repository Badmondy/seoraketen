<style scoped>
.form-control:focus {
  border-color: #ced4da;
  box-shadow: none;
  outline: none;
}
.form-check-input:focus{
  border-color: #ced4da;
  box-shadow: none;
  outline: none;
}

input::placeholder {
  font-style: italic; /* Change the font style of the placeholder text */
  color: rgba(63, 63, 63, 0.63);
}
input:-ms-input-placeholder { /* Internet Explorer 10-11 */
  font-style: italic;
  color: rgba(63, 63, 63, 0.63);
}

input::-ms-input-placeholder { /* Microsoft Edge */
  font-style: italic;
  color: rgba(63, 63, 63, 0.63);
}
button {
  border-color: rgba(52, 73, 94, 0.44);
}
button:hover{
  background-color: #34495E;
  border-color:#34495E;
  color:white;
}

.failed-validation{
  border:solid 2px rgba(255, 0, 0, 0.37);
}
</style>

<template>
  <div class="d-flex justify-content-center h-100 align-items-center">
    <form @submit.prevent="getData">
      <div class="form-group">
        <label for="url">Webb address</label>
        <input type="text" class="form-control" v-model="state.website" aria-describedby="urlHelp" :class="{'failed-validation' : !validator.website }">
        <small id="urlHelp" class="form-text text-muted mb-1">
          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
            <path fill="#74C0FC" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
          Ange den webbadress du vill använda för att spåra nyckelord</small>
      </div>
      <div class="form-group mt-2">
        <label for="keyword">{{keyword_label}}</label>
        <input type="text" class="form-control"  id="keyword" placeholder="t.ex seo" v-model="state.keyword" :class="{'failed-validation' : !validator.keyword }">
      </div>
      <div class="form-check mt-2">
        <input type="checkbox" class="form-check-input" id="restrict_search" v-model="state.restricted">
        <label class="label" for="restrict_search">Sök endast för den angivna sidan</label>
      </div>
      <div class="col-12">
        <small id="urlHelp" class="form-text text-muted mb-1" v-if="state.errorMessage !== '' ">
          <svg xmlns="http://www.w3.org/2000/svg" width=16 height=16 viewBox="0 0 512 512"><path fill="#DC3545" d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
          {{ state.errorMessage }}</small>
        <button type="submit" @click="getData" class="btn w-100 mt-2">Sök</button>
      </div>
    </form>
  </div>
</template>
<script setup>

import {defineProps, reactive, watch, onMounted} from 'vue';
import { fetchKeywordInfo } from '../../Helpers/Helpers.js'
import { useStore } from 'vuex';
import { useRouter } from "vue-router";

defineProps({
  keyword_label: String,
})
const state = reactive({
    website: '',
    data: [],
    keyword: '',
    restricted: false,
    errorMessage: '',
})

const router = useRouter();

const store = useStore();

/*onMounted(() => {
  store.commit('updateData', {fisk:37})
});*/

const validator = reactive({
  website: true,
  keyword: true,
})

const validationWatcher = (reactives) => {
  reactives.forEach((key) => {
    watch(() => state[key], (newVal) => {
      if(newVal){
        validator[key] = true;
      }
    });
  })
}

validationWatcher(['website', 'keyword'])
const getData = () => {
  if(!state.website && !state.keyword){
    validator.website = false;
    validator.keyword = false;
  }

  if(validator.website && validator.keyword){
    let restricted = state.restricted ? 'i' : 'e';
    fetchKeywordInfo(state.keyword,state.website,restricted,0)
        .then((data) => {
          if(data.error){
            state.errorMessage = data.error
          }else{
            /** Ändra till vuex istället **/
            state.data.value = data;
            store.commit('updateData', {data:data})
            router.push('/data');
          }
        }).catch((error) => {
            console.error(`Last error`, error);
    })
  }
}

</script>