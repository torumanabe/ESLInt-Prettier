<template>
 <div>
     <p v-if="inputvalue">{{ inputValue }}</p>
     <p v-if="clicks">{{ clicks }}</p>
 </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
 scomputed: mapGetters([
     'clicks',
     'inputValue'
 ])
}
</script>