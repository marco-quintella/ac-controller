<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-form ref="form" @submit.prevent="submit">
        <q-card-section>
          <q-input v-model="day.day" label="String de Controle" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" label="OK" @click="onOKClick" />
          <q-btn color="primary" label="Cancel" @click="onCancelClick" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
// import Axios from 'axios'

export default {
  name: 'Editar',
  props: {
    job: Object,
    operacao: String,
    day: Object
  },
  data () {
    return {
      dayEditado: {
        day: '',
        hours: []
      }
    }
  },
  methods: {
    submit () {
    },

    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
      this.$destroy()
    },

    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick () {
      // we just need to hide dialog
      this.hide()
    }
  },
  watch: {
    day: {
      handler (newDay) {
        this.dayEditado = newDay
      },
      immediate: true
    }
  }
}
</script>

<style>
</style>
