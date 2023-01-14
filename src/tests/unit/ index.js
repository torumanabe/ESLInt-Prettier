import Vue from 'vue';

Vue.config.productionTip = false;

const testsContext = require.context('./specs', true, /\.spec.js);
testsContext.keys().forEach(testsContext);

const srcContext = require.context('../../src', true, /^\. \/
(?!.*(?:main|router)).*(\.js)?$/)
srcContext.keys().forEach(srcContext);
