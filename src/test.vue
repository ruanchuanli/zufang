<template>
  <div>
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :quota="quota"
      :quota-used="quotaUsed"
      :hide-stock="sku.hide_stock"
      :custom-stepper-config="customStepperConfig"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {},
}
</script>

<style scoped></style>
