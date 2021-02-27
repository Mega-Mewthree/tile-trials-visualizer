<template>
  <div class="container">
    <div class="row" v-for="(row, i) of boardState" :key="`row-${i}`">
      <TileTrialsBoardTile
        v-for="(col, j) of row"
        :key="`row-${i}-col-${j}`"
        v-model.number="boardState[i][j]"
        :disabled="disabled"
      />
    </div>
  </div>
</template>

<script>
import TileTrialsBoardTile from "./TileTrialsBoardTile.vue";

export default {
  name: "TileTrialsBoard",
  components: {
    TileTrialsBoardTile
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    disabled: Boolean
  },
  computed: {
    boardState: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  watch: {
    boardState: {
      handler(val) {
        this.$emit("input", val);
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  background: var(--v-secondary-base);
  display: block;
  height: fit-content;
  width: fit-content;
  padding: 28px 28px;
  border-radius: 20px;
}
.row {
  width: fit-content;
}
</style>
