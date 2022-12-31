<template>
 <div>
  <div
   v-if="error"
   class="error"
  >
   <p class="display">予期しないエラーが発生しました。アプリケーション制作者に以下の情報と共にお問い合わせください。</p>
   <hr>
   <p class="message">エラーメッセージ: {{ error.message }}</p>
   <p class="info">エラー情報: {{ info  }}</p>
   <p class="stack">エラー詳細: {{ error.stack  }}</p>
  </div>
  <template v-else>
   <slot/>
  </template>
 </div>
</template>

<script>
export default {
 name: 'errorBoundary',

 data() {
  return {
   error: null,
   info: null
  }
 },

 errorCaptured (err, vm,info) {
  this.error = err
  this.info = info
 }
}
</script>
