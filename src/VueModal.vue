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
      SessionKey: "c8d72e9d304928e34b73120f35cba6a2",
    };
  },
  methods: {
    mouseDown(mapId) { this.mapid = mapId; },
    mapOpen(mapID) {
      let request = new RequestServer();
      request.prm = { sessionKey: this.SessionKey, mapId: this.mapid };
      request.methodName = "GetMapDetailInfo";
      const mapList = new customModule.default.MapList(this.SessionKey);
      const mapImageList = new customModule.default.MapImageList(this.SessionKey);
      const editMapItem = new EditMapItem(this.SessionKey);
      mapList.Request();
      mapList.Finished((su, msg) => {
        request.Request();
        request.Finished(function (detailSuccess, msg) {
          if (detailSuccess) {
            editMapItem.ClearMapDetailItem();
            let CurrentMap = new customModule.default.MapInfo();
            const mapInfo = mapList.GetMapByID(mapID);
            CurrentMap.mapId = mapInfo.mapId;
            CurrentMap.mapImageId = mapInfo.mapImageId;
            CurrentMap.isRootMap = mapInfo.isRootMap;
            CurrentMap.mapName = mapInfo.mapName;
            const dList = request.returnData.mapDetailList;
            for (let i in dList) {
              let detailItem = new customModule.default.MapDetailItem();
              detailItem.typeId               = dList[i].typeId;
              detailItem.typePrimaryId        = dList[i].typePrimaryId;
              detailItem.left                 = dList[i].left;
              detailItem.top                  = dList[i].top;
              detailItem.height               = dList[i].bottom - detailItem.top;
              detailItem.width                = dList[i].right - detailItem.left;
              detailItem.instanceType         = dList[i].instanceType;
              detailItem.itemDefaultImageId   = dList[i].itemImageId; //defaut:itemimage
              detailItem.itemImageId          = dList[i].itemImageId;
              detailItem.itemMouseOverImageId = dList[i].itemMouseOverImageId;
              detailItem.itemMouseDownImageId = dList[i].itemMouseDownImageId;
              detailItem.itemDisableImageId   = dList[i].itemDisableImageId;
              detailItem.zIndex               = dList[i].zIndex;
              editMapItem.AddMapDetailItem(detailItem);
            }
            mapImageList.Request();
            mapImageList.Finished(function (su, msg) {
              if (su) {
                CurrentMap.mapImageUrl = mapImageList.GetMapImageByID(CurrentMap.mapImageId).mapImageUrl;
                console.log(CurrentMap.mapImageUrl);
                self.DefaultItemImageListReady(FinishedFn);
                console.log("detailItem");
              } else { FinishedFn(false, msg); }
            });
          } else { FinishedFn(false, msg); }
        });
      });
      this.closeModal();
    },
    closeModal() { this.$emit("my-click", false); }
  }
}
</script>