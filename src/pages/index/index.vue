<template>
  <view class="app-content">
    <view class="game">
      <block v-for="(game, index) in gameList" :key="index">
        <button class="game-item rest-btn drop-shadow" hover-class="inner-shadow" @click="handleNext(game.path)">{{ game.label }}</button>
      </block>
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({ components: {} })
export default class App extends Vue {
  private readonly gameList: GameList[] = [
    { label: '💣', path: '/pages/bomb/index' },
    // { label: '🪙', path: '/pages/coin/index' },
    { label: '🎲', path: '/pages/dice/index' },
  ];

  private handleNext(path: string) {
    this.$nextPage(path);
  }
}
</script>

<style scoped lang="scss">
.game {
  padding: 20px;
  &-item {
    margin: 30rpx 0;
  }
}
</style>
