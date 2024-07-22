<template>
  <h1>Stored data</h1>

  <div class="card">
    <div class="card-header">
    </div>
    <div class="card-body">
      <div class="col-12" v-for="result in results">
        {{result}}
      </div>
    </div>
    <div class="card-footer"></div>
  </div>
</template>




<script setup>

import {ref, onMounted, computed} from 'vue'
import { useStore } from 'vuex';

const store = useStore();
const results = ref([]);

const data = computed(() => store.state.data);

function readData(context) {
 /* let stored_items = [];
  console.log(context);
  const items = context.(item => item.items ||[]);*/
  /*context.forEach((item) => {
    if (item) {
      stored_items.push(...item.data); // Spread to push items correctly
    }
  });
  console.log(stored_items);
  results.value = stored_items; // Assign to results.value directly*/
}


onMounted(() => {
  if(results.value.length === 0){
    readData(data.value);
  }

})

</script>