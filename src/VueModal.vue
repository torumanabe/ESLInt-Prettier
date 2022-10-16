<template>
  <transition
    name="modal"
    appear
  >
    <div
      class="modal modal-overlay"
      @click.self="closeModal()"
    >
      <div class="modal-window">
        <header>
          マップリスト
        </header>
        <div class="modal-content">
          <ul>
            <li
              v-for="column in list"
              :key="column.item"
            >
              <button
                @mousedown="mouseDown(column.mapId)"
              >
                {{ column.mapName }}
              </button>
            </li>
          </ul>
        </div>
        <footer class="modal-footer">
          <button @click="mapOpen(mapid)">開く</button>
          <button @click="closeModal()">閉じる</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import RequestServer from "../../js/customLibs/requestServer.js";
import EditMapItem from "/js/customLibs/editMapItem.js";
import * as customModule from "../../js/custom.js";
export default {
  name: 'VueModal',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data: () => {
    return {
      mapid: null,
      SessionKey: "",
    };
  },
  methods: {
    mouseDown(mapId) { this.mapid = mapId; },
    mapOpen() {
      const editMapItem = new EditMapItem();
      editMapItem.Init();
      editMapItem.OpenMap(this.mapid);
      this.closeModal();
    },
    closeModal() { this.$emit("my-click", false); }
  }
}
</script>