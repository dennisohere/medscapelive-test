<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Age",
  data(vm) {
      return {
        age: 10
      }
  },
  props: {
    initialValue: {
      type: Number,
      required: true,
      default: 0
    }
  },
  computed: {
    stateAge(){
      return this.$store.state.age;
    }
  },
  methods: {
    changeAge() {
      this.$store.commit('updateAge', this.stateAge + 1);
      // this.age = this.age + 1;
      // this.$emit('ageChanged', {'test': 'testing', age: this.age})
    }
  },
  beforeCreate() {},
  created() {

  },
  beforeMount() {},
  mounted() {

  },
  beforeUpdate() {},
})

</script>

<template>

  <div>
    <div>Age: {{stateAge}}</div>
<!--    <div>-->
<!--      <input type="text" placeholder="Age" v-model="age" />-->
<!--    </div>-->
    <button @click="changeAge">click me</button>
  </div>

</template>

<style scoped lang="scss">

</style>
