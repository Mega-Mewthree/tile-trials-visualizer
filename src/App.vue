<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
@import "@/styles/variables.scss";

html {
  --white-text-color: $white-text-color;
}

.v-application {
  background-color: var(--v-background-base) !important;
}
.v-btn {
  text-transform:none !important;
  a#{&} {
    color: $white-text-color;
    text-decoration: none;
  }
}
.v-text-field.v-input--is-focused > .v-input__control > .v-input__slot:after {
  background: currentColor;
  height: 2px;
}
</style>
