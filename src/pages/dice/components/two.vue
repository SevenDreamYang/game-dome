<template>
  <view class="dice-block">
    <view class="dot"></view>
    <view class="dot"></view>
  </view>
</template>

<style scoped lang="scss">
.dice-block {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  padding: 60rpx;
  box-sizing: border-box;
  align-items: center;
  .dot {
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    background: #163785;
  }
}
</style>
