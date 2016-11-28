<template lang="pug">
.columns
  .column
    p.control
      input.pikaday.input(type="text", v-model="dateString")
  .column(v-if="options.timepicker")
    .columns
      .column
        p.control
          input.input(v-model="hours", v-on:input="update()")
      .column
        p.control
          input.input(v-model="minutes", v-on:input="update()")
</template>

<script>
import Pikaday from 'pikaday'
import moment from 'moment'

export default {
  props: ['options', 'value'],
  data () {
    return {
      picker: null,
      cloned: null,
      hours: null,
      minutes: null,
      changed: false
    }
  },
  computed: {
    dateString: function () {
      return this.cloned && moment(this.cloned).format(this.options.displayFormat || 'YYYY-MM-DD') || ''
    }
  },
  watch: {
    value: function (newVal) {
      this.changed = true
      this.picker.setDate(newVal)
      this.cloned = newVal
      this.hours = moment(newVal).hours()
      this.minutes = moment(newVal).minutes()
    }
  },
  methods: {
    update: function () {
      let vm = this
      vm.cloned = moment(vm.picker.getDate()).hours(vm.hours).minutes(vm.minutes).toDate()
      vm.$emit('input', vm.cloned)
    }
  },
  mounted () {
    let vm = this
    let options = this.options
    options.onSelect = function () {
      if (!vm.changed) {
        if (vm.hours === null) vm.hours = 0
        if (vm.minutes === null) vm.minutes = 0
        vm.cloned = moment(vm.picker.getDate()).hours(parseInt(vm.hours)).minutes(parseInt(vm.minutes)).toDate()
        vm.$emit('input', vm.cloned)
      } else {
        vm.changed = false
      }
    }
    options.field = this.$el.getElementsByClassName('pikaday')[0]
    this.picker = new Pikaday(options)
    this.cloned = this.value
    if (this.value) {
      vm.hours = moment(this.value).hours()
      vm.minutes = moment(this.value).minutes()
      vm.changed = true
      this.picker.setDate(this.value)
    }
  }
}
</script>
