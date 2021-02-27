<template>
  <v-container>
    <v-row
      class="text-h2"
      justify="center"
    >
      Tile Trials
    </v-row>
    <v-row>
      <v-col align="center">
        <div class="text-h4 mb-2">Initial State</div>
        <TileTrialsBoard
          v-model="inputBoard"
        />
        <div class="text-caption mt-2">
          Type in tiles to set colors.
          (0 = green, 1 = gray, 2 = red, 3 = blue)
        </div>
      </v-col>
      <v-col align="center" class="d-flex">
        <div class="transformation-string-container">
          <span class="transformation-string mr-4">Transformation: {{transformationString || "[no pieces]"}}</span>
          <v-btn
            @click="copyTransformationString"
            :disabled="!transformationString"
            color="secondary lighten-1"
          >
            Copy
          </v-btn>
        </div>
      </v-col>
      <v-col align="center">
        <div class="text-h4 mb-2">Final State</div>
        <TileTrialsBoard
          :value="outputBoard"
          disabled
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(piece, i) of pieces"
        :key="`piece-${i}`"
        align="center"
      >
        <TileTrialsPiece
          v-model="pieces[i]"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {copyText} from "@/util/tools.js";

import TileTrialsBoard from "@/components/tile-trials/TileTrialsBoard.vue";
import TileTrialsPiece from "@/components/tile-trials/TileTrialsPiece.vue";

export default {
  name: "TileTrials",
  components: {
    TileTrialsBoard,
    TileTrialsPiece
  },
  data() {
    return {
      inputBoard: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      pieces: [
        {
          piece: [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
          ],
          active: true
        },
        {
          piece: [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
          ],
          active: true
        },
        {
          piece: [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
          ],
          active: true
        },
        {
          piece: [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
          ],
          active: true
        },
        {
          piece: [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
          ],
          active: true
        }
      ]
    };
  },
  computed: {
    outputBoard() {
      const board = this.cloneBoard(this.inputBoard);
      for (const pieceData of this.pieces) {
        if (pieceData.active) {
          this.applyPiece(board, pieceData.piece);
        }
      }
      return board;
    },
    transformationString() {
      let solutionString = "";
      for (const pieceData of this.pieces) {
        if (pieceData.active && !this.isEmpty(pieceData.piece)) {
          solutionString += this.getPosition(pieceData.piece);
        }
      }
      return solutionString;
    }
  },
  methods: {
    cloneBoard(board) {
      const retBoard = [];
      for (let i = 0; i < board.length; i++) {
        retBoard.push([]);
        const rowInput = board[i];
        const rowOutput = retBoard[i];
        for (let j = 0; j < rowInput.length; j++) {
          rowOutput.push(rowInput[j]);
        }
      }
      return retBoard;
    },
    applyPiece(board, piece) {
      for (let i = 0; i < board.length; i++) {
        const boardRow = board[i];
        const pieceRow = piece[i];
        for (let j = 0; j < boardRow.length; j++) {
          if (typeof boardRow[j] === "number") {
            if (pieceRow[j]) {
              boardRow[j] = Math.abs(boardRow[j] - 1);
            }
          } else {
            boardRow[j] = "?";
          }
        }
      }
      return board;
    },
    isEmpty(piece) {
      const rowSize = piece[0].length;
      for (let i = 0; i < piece.length; i++) {
        for (let j = 0; j < rowSize; j++) {
          if (piece[i][j]) {
            return false;
          }
        }
      }
      return true;
    },
    indexToLetter(num) {
      if (num > 25) return "?";
      return String.fromCharCode("A".charCodeAt(0) + num);
    },
    getPosition(piece) {
      return `${this.getPieceLeftPosition(piece) + this.getPieceTopPosition(piece)}`;
    },
    getPieceLeftPosition(piece) {
      const rowSize = piece[0].length;
      for (let j = 0; j < rowSize; j++) {
        for (let i = 0; i < piece.length; i++) {
          if (piece[i][j]) {
            return this.indexToLetter(j);
          }
        }
      }
    },
    getPieceTopPosition(piece) {
      const rowSize = piece[0].length;
      for (let i = 0; i < piece.length; i++) {
        for (let j = 0; j < rowSize; j++) {
          if (piece[i][j]) {
            return i + 1;
          }
        }
      }
    },
    copyTransformationString() {
      copyText(this.transformationString, success => {
        if (!success) {
          // eslint-disable-next-line no-alert
          alert("Failed to copy to clipboard.");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.transformation-string-container {
  background: var(--v-secondary-darken2);
  display: block;
  margin: auto;
  width: fit-content;
  height: fit-content;
  padding: 20px;
  border-radius: 20px;
}
.transformation-string {
  font-size: 16px;
}
</style>
