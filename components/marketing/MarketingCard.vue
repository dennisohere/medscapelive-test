<template>
  <div class="marketing-card">
    <v-img :src="data.img.src" :alt="data.img.alt" />
    <p class="marketing-card-header">{{ data.header }}</p>
    <p class="marketing-card-body">
      {{ data.body }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'MarketingCard',
  props: {
    data: Object
  }
}
</script>

<style lang="scss">
.marketing-card {
  border-radius: 3px;
  background: #fff;
  box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.1);
  padding: 30px;

  .v-image {
    width: 100px;
    height: 100px;

    border-radius: 50px;
    background-size: contain;
    margin: auto;
  }

  .marketing-card-header {
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-wrap: balance;
    margin: 24px 0;
  }

  .marketing-card-body {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  p {
    margin: 0;
  }
}
</style>
