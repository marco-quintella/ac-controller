<template>
  <q-page padding class="q-pt-lg">
    <div class="row">
      <div class="col text-center text-h6">AC 1</div>
      <div class="col-auto">
        <q-btn-toggle
          v-model="ac1.status"
          class="my-custom-toggle"
          no-caps
          rounded
          unelevated
          toggle-color="primary"
          color="white"
          text-color="primary"
          :options="[
          {label: 'Ligado', value: true},
          {label: 'Desligado', value: false}
        ]"
        />
      </div>
    </div>
    <div class="row"></div>
  </q-page>
</template>

<script>
import Axios from 'axios'

export default {
  data () {
    return {
      ac1: {
        status: true
      },
      ac2: {
        status: true
      },
      data: {}
    }
  },
  created () {
    Axios.get('http://189.50.88.218:85/data')
      .then(result => {
        this.data = result
      })
  }
}
</script>

<style>
</style>
