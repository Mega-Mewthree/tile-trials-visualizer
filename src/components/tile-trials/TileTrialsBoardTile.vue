<template>
  <v-text-field
    ref="input"
    v-model.number="number"
    @click="selectTile"
    class="tile centered-input"
    :background-color="color"
    :disabled="disabled"
    outlined
  />
</template>

<script>
export default {
  name: "TileTrialsBoardTile",
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
        case 0: return "#6ba856";
        case 1: return "#9c9c99";
        case 2: return "#fe144d";
        case 3: return "#7cb0e5";
        default: return "#333333";
      }
    },
    selectTile() {
      this.$refs.input.$el.querySelector("input").select();
    }
  }
};
</script>

<style lang="scss" scoped>
.tile {
  display: inline-block;
  width: 56px;
  height: 56px;
  margin: 2px !important;
}
.centered-input ::v-deep input {
  text-align: center
}
</style>
