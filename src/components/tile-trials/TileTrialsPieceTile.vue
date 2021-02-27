<template>
  <v-btn
    class="tile"
    @click="toggle"
    :color="color"
    :disabled="disabled"
  />
</template>

<script>
export default {
  name: "TileTrialsPieceTile",
  props: {
    value: {
      required: true
    },
    disabled: Boolean
  },
  computed: {
    color() {
      return this.numberToColor(this.number);
    },
    number: {
      get() {
        return this.value;
      },
      set(num) {
        this.$emit("input", num);
      }
    }
  },
  methods: {
    numberToColor(num) {
      switch (num) {
        case 0: return "#333333";
        case 1: return "#aaaaaa";
        default: return "#660000";
      }
    },
    toggle() {
      this.number = this.number === 0 ? 1 : 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.tile {
  display: inline-block;
  width: 24px !important;
  height: 24px !important;
  min-width: unset !important;
  margin: 2px !important;
  padding: 0 !important;
}
</style>
