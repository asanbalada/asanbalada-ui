<template lang="pug">
.header
  .nav
    .container
      .nav-left
        router-link.nav-item.is-brand(to="/")
          strong ASANBALADA
        router-link.nav-item(:to="{ name: 'eragileak' }") eragileak
        router-link.nav-item(:to="{ name: 'asanbladak' }") asanbladak
        router-link.nav-item(:to="{ name: 'lantaldeak' }") lantaldeak
        router-link.nav-item(:to="{ name: 'postazerrendak' }") postazerrendak
        router-link.nav-item(:to="{ name: 'baliabideak' }") baliabideak
</template>

<script>
export default {}
</script>

<style>
</style>
