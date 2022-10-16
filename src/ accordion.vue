<template>
  <div class="accordion-area">
    <div id="accordion">
      <div id="accordionCamera">
        <h3>
          <a href="#" />
        </h3>
        <ul>
          <li
            v-for="(item, key) in CameraGroupList"
            :id="`cameraTree${item.cameraGroupId}`"
            :key="key"
          >
            <img src="../assets/img/group.png">
            {{ item.cameraGroupName }}
            <tree :config="config" :nodes="nodes"> </tree>
          </li>
        </ul>
      </div>
      <div id="accordionCustomview">
        <h3>
          <a href="#" />
        </h3>
        <draggable
          :list="CustomviewList"
          item-key="cameraGroupId"
          tag="ul"
          :clone="onclone"
        >
          <template #item="{ element }">
            <li>
              <img src="../assets/img/customview.png">
              {{ element.customViewName }}
            </li>
          </template>
        </draggable>
      </div>
      <div id="accordionMap">
        <h3>
          <a href="#" />
        </h3>
        <draggable
          :list="MapList"
          item-key="id"
          tag="ul"
          :clone="onclone"
        >
          <template #item="{ element }">
            <li>
              <img src="../assets/img/map.png">
              {{ element.mapName }}
            </li>
          </template>
        </draggable>
      </div>
      <div id="accordionOther">
        <h3>
          <a href="#" />
        </h3>
        <draggable
          :list="CommandList"
          item-key="id"
          tag="ul"
          :clone="onclone"
        >
          <template #item="{ element }">
            <li>
              <img src="../assets/img/other.png">
              {{ element.commandId }}
            </li>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import AccordionUI from "../../js/customLibs/ui/accordionUI.js";
import ListItemUI  from "../../js/customLibs/ui/listItemUI.js";
import EditMapItem from "/js/customLibs/editMapItem.js";
import custom      from "/js/custom.js";

const $ = require('jquery');
import draggable from 'vuedraggable';

export default {
    name: 'ItemAccordion',
    components: {
        draggable,
        //treeview
    },
    data: () => {
        return {
            SessionKey: "c8d72e9d304928e34b73120f35cba6a2",
            accordion:      [],
            CameraGroupList:[],
            CameraList:     [],
            CustomviewList: [],
            MapList:        [],
            CommandList:    [],
        };
    },
    mounted () {
        let editMapItem = new EditMapItem(this.SessionKey);
        editMapItem.Init();
        this.accordion = new AccordionUI(document.getElementById("accordion"));
        this.accordion.Init(editMapItem);
        editMapItem.cameraGroupList.Finished(() => {
            this.CameraGroupList = editMapItem.cameraGroupList.GetGroupList();
            let img = new Image();
            for (let i in this.CameraGroupList) {
              const camGroupId = this.CameraGroupList[i].cameraGroupId;
              const cameraNameList = new custom.CameraNameList(this.SessionKey, camGroupId);
              cameraNameList.Request();
              cameraNameList.Finished( (su) => {
                  const groupTree = $("#group_" + camGroupId);
                  if (groupTree.parent().hasClass("expandable")) { groupTree.hide(); }
                  let img = new Image();
                  img.src = editMapItem.cameraList.DefaultImageUrl;
                  const camList = cameraNameList.GetCameraByGroupID();
                  for (let j in camList) {
                      if (!camList[j].cameraId) { continue; }
                      const $cam = $("<li></li>");
                      const itemUI = new ListItemUI(
                          cameraNameList.typeID,
                          camList[j].cameraId,
                          camList[j].cameraName,
                          img
                      );
                        itemUI.Init();
                        itemUI.groupName = camList[j].cameraGroupName;
                        this.accordion.AddItemToArray(itemUI.typeID, itemUI.itemID, itemUI);
                        itemUI.editMapItem = this.editMapItem;
                        itemUI.accordionUI = this.accordion;
                        itemUI.$item.find("img").attr("src", "/assets/img/camera.png");
                        $cam.append(itemUI.$item);
                        $cam.appendTo(groupTree);
                        $(`#cameraTree${camGroupId}`).tree({
                            collapsed: false,
                            add: $cam
                        });
                    }
                    this.accordion.camGetGroupList.push(camGroupId);
                });
            }
        });
        editMapItem.customViewList.Finished(() => {
            let img = new Image();
            this.CustomviewList = editMapItem.customViewList.GetCustomViewList();
            for (let i in this.CustomviewList) {
                const itemUI = new ListItemUI(
                    editMapItem.customViewList.typeID,
                    this.CustomviewList[i].customViewId,
                    this.CustomviewList[i].customViewName,
                    img
                );
                itemUI.Init();
                this.accordion.AddItemToArray(itemUI);
                itemUI.editMapItem = editMapItem;
                itemUI.accordionUI = this.accordion;
            }
            img.src = editMapItem.customViewList.DefaultImageUrl;
        });
        editMapItem.mapList.Finished(() => {
            let img = new Image();
            this.MapList = editMapItem.mapList.GetMapList();
            for (let i in this.MapList) {
                const itemUI = new ListItemUI(
                    editMapItem.mapList.typeID,
                    this.MapList[i].mapId,
                    this.MapList[i].mapName,
                    img
                );
                itemUI.Init();
                this.accordion.AddItemToArray(itemUI);
                itemUI.editMapItem = editMapItem;
                itemUI.accordionUI = this.accordion;
            }
            img.src = editMapItem.mapList.DefaultImageUrl;
        });
        editMapItem.commandList.Finished(() => {
            let img = new Image();
            this.CommandList = editMapItem.commandList.GetCommandList();
            for (let i in this.CommandList) { 
                const nameList = {"4": "back", "5": "next"};
                const itemUI = new ListItemUI(
                    editMapItem.commandList.typeID,
                    this.CommandList[i].commandId,
                    nameList[id],
                    img
                );
                itemUI.Init();
                this.accordion.AddItemToArray(itemUI);
                itemUI.editMapItem = editMapItem;
                itemUI.accordionUI = this.accordion;
            }
            img.src = editMapItem.defaultItemImageList.GetDefaultItemImageByID(parseInt(this.CommandList[i].commandId)).mapItemDefaultImageUrl;
        });
    },
    methods: {
        onclone: () => {
            let editMapItem = new EditMapItem("c8d72e9d304928e34b73120f35cba6a2");
            editMapItem.Init();
            let accordion = new AccordionUI(document.getElementById("accordion"));
            accordion.Init(editMapItem);
            accordion.GetDragHelper();
        }

    },
}