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
          @input="opera('ac1')"
        />
      </div>
    </div>
    <div class="row">
      <div class="col text-center text-h6">AC 2</div>
      <div class="col-auto">
        <q-btn-toggle
          v-model="ac2.status"
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
          @input="opera('ac2')"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'Aparelhos',
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
    Axios.get('http://189.50.88.218:85/data').then(result => {
      this.data = result.data
    })
  },
  watch: {
    data: {
      handler (newData) {
        this.ac1 = newData.ACs.AC1
        this.ac2 = newData.ACs.AC2
      },
      immediate: true
    }
  },
  methods: {
    opera (ac) {

    }
  }
}
</script>

<style>
</style>
