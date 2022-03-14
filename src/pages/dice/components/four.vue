<template>
  <view class="dice-block">
    <div class="row">
      <view class="dot"></view>
      <view class="dot"></view>
    </div>
    <div class="row">
      <view class="dot"></view>
      <view class="dot"></view>
    </div>
  </view>
</template>

<style scoped lang="scss">
.dice-block {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
  align-items: center;
  padding: 20rpx;
  .row {
    display: flex;
    flex-direction: column;
  }
  .dot {
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    background: #ff5151;
    margin: 40rpx;
  }
}
</style>
