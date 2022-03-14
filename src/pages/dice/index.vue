<template>
  <view class="app-content">
    <view class="game-content">
      <view class="dice flex">
        <block v-for="(dice, idx) in dice_array" :key="idx">
          <view class="dice_item dice_6 drop-shadow">
            <one v-if="dice === 1" />
            <two v-if="dice === 2" />
            <three v-if="dice === 3" />
            <four v-if="dice === 4" />
            <five v-if="dice === 5" />
            <six v-if="dice === 6" />
          </view>
        </block>
      </view>
    </view>
    <view class="button-view">
      <button class="rest-btn drop-shadow" @click="starGame">测试</button>
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import one from './components/one.vue';
import two from './components/two.vue';
import three from './components/three.vue';
import four from './components/four.vue';
import five from './components/five.vue';
import six from './components/six.vue';
import { showloading, hideLoading } from '@utils/index';
@Component({ components: { one, two, three, four, five, six } })
export default class App extends Vue {
  private readonly MAX_POINT = 6;
  private dice_array: number[] = [];
  private QUANTITY = 1;

  created() {
    this.init();
  }

  init() {
    const { QUANTITY } = this;
    this.dice_array = Array(QUANTITY).fill(6);
  }

  starGame() {
    showloading('摇骰子');
    const { MAX_POINT, QUANTITY } = this;
    const dice_array: number[] = [];
    for (let i = 0; i < QUANTITY; i++) {
      const point = Math.floor(Math.random() * MAX_POINT);
      dice_array.push(point + 1);
    }
    setTimeout(() => {
      hideLoading(0);
      this.dice_array = dice_array;
    }, 1000);
  }
}
</script>

<style scoped lang="scss">
.dice {
  // flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 800rpx;
  &_item {
    width: 300rpx;
    height: 300rpx;
    margin: 38rpx;

    border-radius: 20rpx;
  }
}
.button-view {
  padding: 50rpx;
}
</style>
