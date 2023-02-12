<template>
 <div>
   <table>
     <tr>
     <td><input type="text" class="form" v-model.number="inputNumber1" v-bind:class="selectBorder"></td>
     <td></td>
     <td><input type="text" class="form" v-model.number="inputNumber2" v-bind:class="selectBorder"></td>
     <td></td>
     <td><button type="button" class="btn btn-primary" v-on:click="clearInputs()">clear</button></td>
     </tr>
     <tr>
       <td class="">{{ inputNumber1 }}</td><td>+</td><td class="">{{ inputNumber2 }}</td><td>=</td><td class="result">{{ add }}</td>
     </tr>
     <tr>
       <td class="">{{ inputNumber1 }}</td><td>-</td><td class="">{{ inputNumber2 }}</td><td>=</td><td class="result">{{ min }}</td>
     </tr>
     <tr>
       <td class="">{{ inputNumber1 }}</td><td>×</td><td class="">{{ inputNumber2 }}</td><td>=</td><td class="result">{{ multi }}</td>
     </tr>
     <tr>
       <td class="">{{ inputNumber1 }}</td><td>÷</td><td class="">{{ inputNumber2 }}</td><td>=</td><td class="result">{{ divi }}</td>
     </tr>
   </table>
   <p class="col-sm12"  style="color: red;">{{ inputError }}</p>
 </div>
</template>

<script>
export default {
 name: 'calcVue',
 data: function () {
     return {
       inputNumber1: 0,
       inputNumber2: 0,
       isInvalidInput: false,
       isNotNumber: false,
     }
   },
   computed: {
     add  (){
       if (this.inputNumber1 === "" || this.inputNumber2 === "") { return "NaN"
       }else{ return this.inputNumber1 + this.inputNumber2; }
     },
     min  (){
       if (this.inputNumber1 === "" || this.inputNumber2 === "") { return "NaN"
       }else{ return this.inputNumber1 - this.inputNumber2; }
     },
     multi (){
       if (this.inputNumber1 === "" || this.inputNumber2 === "") {return "NaN"
       }else{ return this.inputNumber1 * this.inputNumber2; }
     },
     divi (){
       if (this.inputNumber1 === "" || this.inputNumber2 === "") { return "NaN"
       }else{ return this.inputNumber1 / this.inputNumber2; }
     },
     inputError (){
      let error = "";
       if(this.isNotNumber){ error = "不正な値です";
       } else if(this.inputNumber1 === "" || this.inputNumber2 === ""){ error = "値を入力してください"; }
       return error;
     },
     selectBorder (){
       if( isNaN(this.inputNumber1) || isNaN(this.inputNumber2) ){
         return "redBorder";
       } else if( this.inputNumber1 === "" || this.inputNumber2 === "" ){
         return "orangeBorder";
       } else {
         return "defalutBorder";
       }
     },
     checkInput (){
       if(this.inputNumber1 === "" || this.inputNumber2 === ""){ this.changeTrue();
       }else{ this.changefalse();}
       return this.isInvalidInput;
     },
     checkNotNumber(){
       if(isNaN(this.inputNumber1) || isNaN(this.inputNumber2)){this.changeNotNumberTrue();
       } else {this.changeNotNumberFalse();}
       return this.isNotNumber;
     },

   },
   methods: {
     clearInputs (){
       this.inputNumber1 = 0;
       this.inputNumber2 = 0;
     },
     changefalse() {
     this.isInvalidInput = false;
     },
     changeTrue() {
     this.isInvalidInput = true;
     },
     changeNotNumberfalse() {
     this.isNotNumber = false;
     },
     changeNotNumberTrue() {
     this.this.isNotNumber = true;
     },
   }
}
</script>