<template>
  <q-page padding>
    <div class="row justify">
      <q-btn label='Salvar' class='full-width' color='positive' @click='salvar' />
    </div>
      <div class="row col" v-for="day in data.days" :key="day.day">
        <div class="row col">
          <q-input v-model='day.day' outlined class="full-width q-my-md " />
        </div>
        <q-list bordered separator class="rounded-borders row">
          <q-item v-for="hour in day.hours" :key="day.day + hour.time">
            <q-item-section>
              <q-input v-model='hour.time' dense />
            </q-item-section>
            <q-item-section>
              <q-checkbox v-model='hour.AC1' label='AC 1' />
              <q-checkbox v-model='hour.AC2' label='AC 2' />
            </q-item-section>
          </q-item>
          <q-separator />
        </q-list>
      </div>
  </q-page>
</template>

<script>
import Axios from 'axios'
import Editar from 'components/editar.vue'
export default {
  name: 'Horarios',
  data () {
    return {
      data: {}
    }
  },
  created () {
    Axios.get('http://189.50.88.218:85/data').then(result => {
      this.data = result.data
    })
  },
  methods: {
    editar (day, operacao) {
      this.$q.dialog({
        component: Editar,
        root: this.$root,
        day: day,
        operacao: operacao
      })
    },
    salvar () {
      this.$q.loading.show()
      Axios({
        method: 'post',
        url: 'http://189.50.88.218:85/editar',
        data: this.data })
        .then(result => {
          this.data = result.data
        })
        .finally(this.$q.loading.hide())
    }
  }
}
</script>

<style>
</style>
