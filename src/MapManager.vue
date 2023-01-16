<template>
  <div>
    <ul class="title">
      <li>
        <h2>ArobaView MapEditor</h2>
      </li>
      <li class="right">
        <router-link to="/login">
          logout
        </router-link>
      </li>
    </ul>
    <ul class="managemap">
      <li>
        <input
          ref="input"
          accept=".jpg,.jpeg,.png,.gif"
          style="display: none"
          type="file"
          @change="selectedFile()"
        >
        <button @click="createNewMap()">
          Create Map
        </button>
      </li>
      <li>
        <button @click="openMap()">
          Open Map
        </button>
        <VueModal
          v-if="modal_open"
          :list="map_list"
          @my-click="modal_open=$event"
        />
      </li>
      <li>
        <button @click="saveMap()">
          Save Map
        </button>
      </li>
      <li>
        <button @click="confirmMap()">
          Check Map
        </button>
      </li>
      <li>
        <button @click="deleteMap()">
          Delete Map
        </button>
      </li>
      <li>
        <span id="zoom">zoom</span>
        <select id="zoomCombo">
          <option value="8">
            50%
          </option>
          <option value="12">
            75%
          </option>
          <option value="16">
            100%
          </option>
          <option value="24">
            150%
          </option>
          <option value="32">
            200%
          </option>
        </select>
        <br>
        <span id="TEXT_SLELETGRID">grid</span>
        <select id="SelectGride">
          <option value="0">
            0px
          </option>
          <option value="1">
            10px
          </option>
          <option value="2">
            20px
          </option>
          <option value="3">
            50px
          </option>
          <option value="4">
            100px
          </option>
        </select>
      </li>
    </ul>
  </div>
</template>

<script>
import * as customModule from "/js/custom.js";
import ToolBarUI from "/js/customLibs/ui/toolBarUI.js";
import editMapItem from "/js/customLibs/editMapItem.js";
import VueModal from "./VueModal.vue";
import store from '../store.js';

const $ = require('jquery');
const axios = require('axios');

export default {
  name: 'MapManager',
  components: { VueModal },
  data: () => {
    return {
      modal_open: false,
      map_list: [] 
    };
  },
  methods: {
    createNewMap() {
      this.$refs.input.click();
    },
    async selectedFile() { 
      const file = this.$refs.input.files[0];
      if (!file) { return; }
      const formData = new FormData();
      formData.append('name', "userfile");
      formData.append('data', {
                "func": "SetMapImage",
                "sessionKey": "sessionKey"
            });
      const config = { headers: {'content-type': 'multipart/form-data'} };
      axios
      .post('/rs/mapeditor/php/mapeditor.php', formData, config) 
      .then(function(response) {
        console.log(response);
        let json = eval("(" + response + ")");
        console.log(json);
        if (json.mapImageId == null) { FinishedFn(null);
        } else { return json; }
      })
      .catch(function(error) {
        console.log(error);
      });
      //editMapItem.prototype.CreateNewMap
    },
    openMap() {
      const MapList = new customModule.default.MapList(store.getters.getSessionKey);
      MapList.Request();
      MapList.Finished( () => { this.map_list = MapList.GetMapList(); });
      this.modal_open = true;
    },
    saveMap() {
      alert("このマップを保存しますか？");
      ToolBarUI.checkMapNameToSave();
    },
    confirmMap() {
      alert("confirm yor maps in arobaview Client");
    },
    deleteMap() {
      if (self.editMapItem.CurrentMap == null) {
          ShowDialog(Localize.TEXT_DIALOG_NOTMAP_MSG, Localize.TEXT_DIALOG_TITLE_WARNING);
          return;
      }
      ShowDialogYesNo(Localize.TEXT_DIALOG_DELETEMAP_MSG, Localize.TEXT_DIALOG_TITLE_CONFIRM, (b)=>{
        if (b) {
          const EditMapItem = new editMapItem();
          EditMapItem.DeleteMapInfo((su, msg)=>{
            if (su) {
              self._$toolbar.find("#mapIdtxt").text("");
              self._$toolbar.find("#mapNametxt").val("");
              self.accordionUI.AddMapList();
              self.MapAreaUi.ClearMapArea();
              self.changeImgObj.Disable(true); //change map image  Disable
            } else { /*delete err*/ ShowDialog(msg, Localize.TEXT_DIALOG_TITLE_ERROR); }
          });
        }
      });
    },  
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  text-align: left;
}
li {
  display: inline-block;
  margin: 0;
}
h2{
  margin: 2px;
}
button {
  margin: 5px;
  padding:  5px;
  font-size: 15px;
  background: #222;
  color: aliceblue;
  border-radius: 10%;
}
p {
  margin: 0;
}
.title {
  height: 45px;
  text-align: left;
  background-color: black;
  color: aliceblue;
}
.managemap {
  height: 50px;
  background: gray;
}
.right{
  margin: rignt;
}
</style>
