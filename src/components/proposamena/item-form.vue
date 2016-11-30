<template lang="pug">
.proposamena-item-form
  .card.is-fullwidth.proposamena-item-form
    header.card-header
      p.card-header-title(v-on:click="toggle()", style="cursor:pointer;")
        span.tag(v-if="item.uuid", style="margin-right: 10px;") {{ item.uuid }}
        | {{ title }}
      span.card-header-icon(style="width:110px", v-on:click="send()")
        span.button.is-small.is-outlined(v-bind:class="{ 'is-success': item.sended }")
          | {{ item.sended ? 'bidalita' : 'bidali' }}
    .card-content(v-if="show")
      .content
        p.control
          label.label proposamena
          input.input(v-on:input="update()", type="text", v-model="item.title")
        .columns
          .column.is-half
            .columns
              .column.is-half
                p.control
                  label.label mota
                  span.select.is-fullwidth
                    select(v-on:input="update()", type="text", v-model="item.type")
                      option(v-bind:value="null") -- mota --
                      option(v-for="mota in motak") {{ mota }}
              .column.is-half
                p.control
                  label.label egoera
                  span.select.is-fullwidth
                    select(v-on:input="update()", type="text", v-model="item.status")
                      option(v-bind:value="null") -- egoera --
                      option(v-for="egoera in egoerak") {{ egoera }}
          .column.is-half
            p.control
              label.label baliabideak
              multiselect(
                v-model="item.baliabideak",
                :options="baliabideak",
                :close-on-select="true",
                :clear-on-select="false",
                placeholder="Select one",
                label="title",
                track-by="id",
                :multiple="true",
                v-on:input="update()"
              )
        .columns
          .column.is-half
            p.control
              label.label hasi
              pikaday(:options="dateTimeSelectOptions", v-model="item.start")
          .column.is-half
            p.control
              label.label bukatu
              pikaday(:options="dateTimeSelectOptions", v-model="item.end")
        .columns
          .column.is-one.third
            p.control
              label.label antolatzaileak
              multiselect(
                v-model="item.antolatzaileak",
                :options="eragileak",
                :close-on-select="true",
                :clear-on-select="false",
                placeholder="Select one",
                label="fullName",
                track-by="id",
                :multiple="true",
                v-on:input="update()"
              )
          .column.is-one.third
            p.control
              label.label lagunak
              multiselect(
                v-model="item.lagunak",
                :options="eragileak",
                :close-on-select="true",
                :clear-on-select="false",
                placeholder="Select one",
                label="fullName",
                track-by="id",
                :multiple="true",
                v-on:input="update()"
              )
          .column.is-one.third
            p.control
              label.label lantaldeak
              multiselect(
                v-model="item.lantaldeak",
                :options="lantaldeak",
                :close-on-select="true",
                :clear-on-select="false",
                placeholder="Select one",
                label="title",
                track-by="id",
                :multiple="true",
                v-on:input="update()"
              )

        p.control
          label.label edukia
          textarea.textarea(v-on:input="update()", v-model="item.content")

          p.control
            label.label ref
            multiselect(
              v-model="item.refs",
              :options="proposamenak",
              :close-on-select="true",
              :clear-on-select="false",
              placeholder="Select one",
              label="title",
              track-by="id",
              :multiple="true",
              v-on:input="update()"
            )
    footer.card-footer(v-if="show")
      a.card-footer-item.is-danger(v-on:click="remove()") ezabatu
</template>

<script>
import Multiselect from 'vue-multiselect'
import Pikaday from '../widgets/Pikaday'
// import _ from 'lodash'

export default {
  name: 'proposamena-item-form',
  props: ['proposamena', 'eragileak', 'proposamenak', 'baliabideak', 'lantaldeak', 'collapse'],
  components: { Multiselect, Pikaday },
  data () {
    return {
      item: {},
      title: '',
      show: true,
      start: null,
      end: null,
      motak: process.env.PROPOSAMEN_MOTAK,
      egoerak: process.env.PROPOSAMEN_EGOERAK,
      dateTimeSelectOptions: {
        firstDay: 1,
        timepicker: true
      }
    }
  },
  watch: {
    proposamena: function (newVal) {
      this.item = newVal
      this.title = this.item.title
      if (this.item.id) this.show = false
      if (this.collapse) {
        this.show = false
      } else if (typeof this.collapse !== 'undefined' && !this.collapse) {
        this.show = true
      }
    },
    collapse: function (newVal) {
      this.show = !newVal
    }
  },
  created: function () {
    this.item = this.proposamena
    this.title = this.proposamena.title
    if (this.item.id) this.show = false
    if (this.collapse) {
      this.show = false
    } else if (typeof this.collapse !== 'undefined' && !this.collapse) {
      this.show = true
    }
  },
  methods: {
    toggle: function () {
      this.show = !this.show
    },
    remove: function () {
      this.$emit('delete')
    },
    update: function () {
      this.title = this.item.title
      this.$emit('input', this.item)
    },
    send: function () {
      this.$emit('send', this.item)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
