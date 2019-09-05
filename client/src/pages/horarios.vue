<template>
  <q-page padding>
    <q-list bordered separator class="rounded-borders">
      <q-item v-for="job in jobs" :key="job.id" clickable v-ripple @click="editar(job, 'editar')">
        <q-item-section>{{ job.string }}</q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import Axios from 'axios'
import Editar from 'components/editar.vue'
export default {
  name: 'Horarios',
  data () {
    return {
      jobs: []
    }
  },
  created () {
    Axios.get('http://189.50.88.218:85/jobs')
      .then(result => {
        this.jobs = result.data
      })
  },
  methods: {
    editar (job, operacao) {
      this.$q.dialog({
        component: Editar,
        root: this.$root,
        job: job,
        operacao: operacao
      })
    }
  }
}
</script>

<style>
</style>
