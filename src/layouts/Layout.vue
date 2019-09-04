<template>
  <q-layout view="lhh lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Ar Condicionados</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer>
      <div class="row">
        <q-btn flat class="col">Aparelhos</q-btn>
        <q-btn flat class="col">Horários</q-btn>
        <q-btn flat class="col">Config</q-btn>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  methods: {
    openURL
  }
}
</script>

<style>
</style>
