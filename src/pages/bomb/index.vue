<template>
  <view class="app-content">
    <view class="game-option flex flex-ac-jcsb">
      <view class="game-option__item rest-btn drop-shadow" hover-class="inner-shadow" @click="replaceModelGame(3)">3 * 3</view>
      <view class="game-option__item rest-btn drop-shadow" hover-class="inner-shadow" @click="replaceModelGame(4)">4 * 4</view>
      <view class="game-option__item rest-btn drop-shadow" hover-class="inner-shadow" @click="replaceModelGame(5)">5 * 5</view>
      <view class="game-option__item rest-btn drop-shadow" hover-class="inner-shadow" @click="initGame">重 置</view>
    </view>
    <view class=""></view>
    <view class="game-content">
      <view class="game-content__row flex flex-ac-jcsb" v-for="(row, r_idx) in game" :key="r_idx">
        <view
          :class="['game-content__row__col', 'drop-shadow', `col-${currentModel}`, { hide: col.isFlop, disabled: gameOver }]"
          v-for="(col, c_idx) in row"
          hover-class="inner_col"
          :key="c_idx"
          @click="handleTap(col)"
        >
          {{ gameOver && col.isBomb ? '💣' : '😊' }}
        </view>
      </view>
    </view>
    <div class="game-over" v-show="gameOver">
      <button class="game-over-button rest-btn drop-shadow" hover-class="inner-shadow" @click="initGame">不服再来!!!！</button>
    </div>
  </view>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
@Component({ components: {} })
export default class App extends Vue {
  private currentModel = 3;
  private game: BombGameItem[][] = [];
  private gameOver = false;
  private boomSound: any = null;
  private tapSound: any = null;
  created() {
    this.initGame();
  }

  // 初始化游戏
  private initGame() {
    const { currentModel, bomb } = this;
    this.gameOver = false;
    const [x, y] = bomb();
    const pattern: BombGameItem[][] = Array(currentModel)
      .fill(0)
      .map(() => new Array());
    for (let ordinate = 0; ordinate < currentModel; ordinate++) {
      for (let abscissa = 0; abscissa < currentModel; abscissa++) {
        if (abscissa == x && ordinate == y) {
          pattern[ordinate][abscissa] = { isBomb: true, isFlop: false };
        } else {
          pattern[ordinate][abscissa] = { isBomb: false, isFlop: false };
        }
      }
    }
    this.game = pattern;
  }

  private async handleTap(row: BombGameItem) {
    const { boomSound, tapSound } = this;
    if (row.isBomb) {
      this.gameOver = true;
      !this.boomSound ? (this.boomSound = this.SoundEffect('boom')) : this.boomSound.play();
      uni.vibrateLong({});
    } else {
      !this.tapSound ? (this.tapSound = this.SoundEffect('tap')) : this.tapSound.play();
      row.isFlop = true;
    }
  }

  // 更换游戏模式
  private replaceModelGame(model: number) {
    this.currentModel = model;
    this.initGame();
  }

  private bomb() {
    const { currentModel } = this;
    const x = Math.floor(Math.random() * currentModel);
    const y = Math.floor(Math.random() * currentModel);
    return [x, y];
  }

  private SoundEffect(type: 'boom' | 'tap') {
    const SoundDict = { boom: '../../static/Sound/boom.mp3', tap: '../../static/Sound/tap.mp3' };
    const innerAudioContext = uni.createInnerAudioContext();
    innerAudioContext.autoplay = true;
    innerAudioContext.src = SoundDict[type];
    return innerAudioContext;
  }
}
</script>

<style scoped lang="scss">
.game-option {
  padding: 20rpx;
  &__item {
    width: 120rpx;
    padding: 20rpx;
    text-align: center;
    text-shadow: 1rpx 1rpx 0 #ccc;
    color: #818181;
  }
}
.game-content {
  margin-top: 40rpx;
  &__row {
    width: 100%;
    padding: 10rpx;
    box-sizing: border-box;
    &__col {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20rpx;
      box-sizing: border-box;
      border-radius: 30rpx;
    }
    .col-5 {
      width: calc(100% / 6);
      height: 140rpx;
      margin: 10rpx;
    }
    .col-4 {
      width: calc(100% / 4);
      height: 180rpx;
      margin: 10rpx;
    }
    .col-3 {
      width: calc(100% / 3);
      height: 200rpx;
      margin: 10rpx;
    }
  }
}
.hide {
  visibility: hidden;
}
.game-over {
  padding: 20rpx;
  &-button {
    color: #818181;
  }
}
.disabled {
  pointer-events: none;
}
</style>
