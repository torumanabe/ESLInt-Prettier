import Vue from 'vue';

Vue.config.productionTip = false;

const testsContext = require.context('./specs', true, /\.spec.js);
testsContext.keys().forEach(testsContext);

const srcContext = require.context('../../src', true, /^\. \/
(?!.*(?:main|router)).*(\.js)?$/)
srcContext.keys().forEach(srcContext);

<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.14/vue.min.js"></script>