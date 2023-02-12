<template>
   <div>
      <span class="count">{{ count }}</span>
      <button @click="increment">Increment</button>
    </div>
</template>

<script>
export default ({
  name: 'MyCounter',
  data () {
    return {
      count: 0
    }
  },

  methods: {
    increment () {
      this.count++
    }
  }

})
</script>