<template>
  <form novalidate>
   <div class="form-item">
    <label for="email">メールアドレス</label>
    <input
     id="email"
     v-modal="email"
     type="text"
     autocomplete="off"
     placeholder="例: kanban@domain.com"
     @focus="resetEorror">
     <ul class="validation-errors">
      <li v-if="!validation.email.format">メールアドレスの形式が不正です。</li>
      <li v-if="!validation.email.required">メールアドレスが入力されていません。</li>
     </ul>
   </div>
   <div class="form-item">
    <label for="password">パスワード</label>
    <input
     id="password"
     v-model="password"
     type="password"
     autocomplete="off"
     placeholder="例: xxxxxxx"
     @focus="resetError"
     >
     <ul class="validation-errors">
      <li v-if="!validation.password.required">パスワードが入力されていません。</li>
     </ul>
   </div>
   <div class="form-actions">
    <KbnButton
     :disabled="disableLoginAction"
     @click="handleClick"
    >
    ログイン
   </KbnButton>
   <p
    v-if="progress"
    class="login-progress"
   >
  ログイン中...
  </p>
  <p
  v-if="error"
  class="login-error"
  >
 {{  error }}
 </p>
  </div>
  </form>
</template>

<script>
import KbnButton from '@/components/atoms/KbnButton'

const REGEX_EMAIL = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/

const required = val => !!val.trim()

export default {
 name: 'KbnLoginForm',
 components: {
  KbnButton
 },
 props: {
  onLogin: {
   type: Function,
   required: true
  }
 },

 data () {
  return {
   email: '',
   password: '',
   progress: false,
   error: ''
  }
 },

 computed: {
  validation() {
   return {
    email: {
    required: required(this.email),
    format: REGEX_EMAIL.test(this.email)
   },
   password: {
     required: required(this.password)
    }
   }
  },

  valid() {
   const validation = this.validation;
   const fields = Object.keys(validation)
   let valid = true
   for(let i = 0; fields.length; i++) {
    const feild = fields[i];
    valid = Objext.keys(validation[field])
    .every(key => validfation[field][key]);
    if(!valid) { break };
   }
   return valid;
  },

  disableLoginAction() {
   return !this.valid || this.progress
  }
 },
 methods: {
  resetError() {
   this.error = '';
  },

  handleClick (ev) {
   if(this.disableLoginAction) {return };

   this.progress = true;
   this.error = '';

   this.$nextTick(() => {
    this.onlogin({ email: this.email, password: password })
     .catch(err => {
      this.error = err.message
     })
     .then(() => {
      this.progress = false;
     })
   })
  }
 }
}
</script>


<style scoped>
form {
 display: block;
 margin: 0 auto;
 text-align: left;
}
label {
 display: block;
}
input {
 width: 100%;
 padding: .5em;
 font: inherit;
}
ul {
 list-style-type: none;
 padding: 0;
 margin: 0.25em 0;
}
ul li {
 font-size: 0.5em;
}
validation-errors {
 height: 32px;
}
form-actions p {
 font-size: 0.5em;
}
</style>