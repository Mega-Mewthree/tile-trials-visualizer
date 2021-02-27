<template>
  <div class="container">
    <div class="piece-container">
      <div class="row" v-for="(row, i) of data.piece" :key="`row-${i}`">
        <TileTrialsPieceTile
          v-for="(col, j) of row"
          :key="`row-${i}-col-${j}`"
          v-model.number="data.piece[i][j]"
          :disabled="disabled"
        />
      </div>
    </div>
    <div>
      <v-switch
        v-model="data.active"
        label="Enable"
        inset
      />
    </div>
    <div>
      <div>
        <span class="button-placeholder"></span>
        <v-btn
          class="offset-button"
          @click="shiftUp"
          color="primary"
          :disabled="disabled || !topEdgeEmpty"
        >
          <v-icon class="offset-button-icon">mdi-arrow-up</v-icon>
        </v-btn>
        <span class="button-placeholder"></span>
      </div>
      <div>
        <v-btn
          class="offset-button"
          @click="shiftLeft"
          color="primary"
          :disabled="disabled || !leftEdgeEmpty"
        >
          <v-icon class="offset-button-icon">mdi-arrow-left</v-icon>
        </v-btn>
        <span class="button-placeholder"></span>
        <v-btn
          class="offset-button"
          @click="shiftRight"
          color="primary"
          :disabled="disabled || !rightEdgeEmpty"
        >
          <v-icon class="offset-button-icon">mdi-arrow-right</v-icon>
        </v-btn>
      </div>
      <div>
        <span class="button-placeholder"></span>
        <v-btn
          class="offset-button"
          @click="shiftDown"
          color="primary"
          :disabled="disabled || !bottomEdgeEmpty"
        >
          <v-icon class="offset-button-icon">mdi-arrow-down</v-icon>
        </v-btn>
        <span class="button-placeholder"></span>
      </div>
    </div>
  </div>
</template>

<script>
import TileTrialsPieceTile from "./TileTrialsPieceTile.vue";

export default {
  name: "TileTrialsPiece",
  components: {
    TileTrialsPieceTile
  },
  props: {
    value: {
      type: Object,
      required: true
    },
    disabled: Boolean
  },
  computed: {
    data: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    },
    topEdgeEmpty() {
      let empty = true;
      const edge = this.data.piece[0];
      for (let i = 0; i < edge.length; i++) {
        if (edge[i]) {
          empty = false;
          break;
        }
      }
      return empty;
    },
    bottomEdgeEmpty() {
      let empty = true;
      const edge = this.data.piece[this.data.piece.length - 1];
      for (let i = 0; i < edge.length; i++) {
        if (edge[i]) {
          empty = false;
          break;
        }
      }
      return empty;
    },
    leftEdgeEmpty() {
      let empty = true;
      const piece = this.data.piece;
      for (let i = 0; i < piece.length; i++) {
        if (piece[i][0]) {
          empty = false;
          break;
        }
      }
      return empty;
    },
    rightEdgeEmpty() {
      let empty = true;
      const piece = this.data.piece;
      for (let i = 0; i < piece.length; i++) {
        const rowSize = piece[i].length;
        if (piece[i][rowSize - 1]) {
          empty = false;
          break;
        }
      }
      return empty;
    }
  },
  methods: {
    shiftUp() {
      if (!this.topEdgeEmpty) return;
      const piece = this.data.piece;
      const rowSize = piece[0].length;
      for (let i = 0; i < piece.length - 1; i++) {
        for (let j = 0; j < rowSize; j++) {
          this.$set(piece[i], j, piece[i + 1][j]);
        }
      }
      for (let j = 0; j < rowSize; j++) {
        this.$set(piece[piece.length - 1], j, 0);
      }
      return piece;
    },
    shiftDown() {
      if (!this.bottomEdgeEmpty) return;
      const piece = this.data.piece;
      const rowSize = piece[0].length;
      for (let i = piece.length - 1; i > 0; i--) {
        for (let j = 0; j < rowSize; j++) {
          this.$set(piece[i], j, piece[i - 1][j]);
        }
      }
      for (let j = 0; j < rowSize; j++) {
        this.$set(piece[0], j, 0);
      }
      return piece;
    },
    shiftLeft() {
      if (!this.leftEdgeEmpty) return;
      const piece = this.data.piece;
      const rowSize = piece[0].length;
      for (let i = 0; i < piece.length; i++) {
        for (let j = 0; j < rowSize - 1; j++) {
          this.$set(piece[i], j, piece[i][j + 1]);
        }
      }
      for (let i = 0; i < piece.length; i++) {
        this.$set(piece[i], rowSize - 1, 0);
      }
      return piece;
    },
    shiftRight() {
      if (!this.rightEdgeEmpty) return;
      const piece = this.data.piece;
      const rowSize = piece[0].length;
      for (let i = 0; i < piece.length; i++) {
        for (let j = rowSize - 1; j > 0; j--) {
          this.$set(piece[i], j, piece[i][j - 1]);
        }
      }
      for (let i = 0; i < piece.length; i++) {
        this.$set(piece[i], 0, 0);
      }
      return piece;
    }
  },
  watch: {
    data: {
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
  background: var(--v-secondary-darken1);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  width: fit-content;
  border-radius: 20px;
}
.piece-container {
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
.offset-button, .button-placeholder {
  display: inline-block;
  width: 24px;
  height: 24px;
  min-width: unset !important;
  margin: 2px;
}
.button-placeholder {
  padding-left: 22px;
  padding-right: 22px;
}
</style>
