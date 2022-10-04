<template>
  <div class="accordion-area">
    <div id="accordion">
      <div id="accordionCamera">
        <h3>
          <a href="#" />
        </h3>
        <ul>
          <li
            v-for="camera in CameraList"
            :key="camera"
          >
            <img src="../assets/img/group.png">
            {{ camera.cameraGroupName }}
          </li>
        </ul>
      </div>
      <div id="accordionCustomview">
        <h3>
          <a href="#" />
        </h3>
        <ul>
          <li
            v-for="customview in CustomviewList"
            :key="customview"
          >
            <img src="../assets/img/customview.png">
            {{ customview.customViewName }}
          </li>
        </ul>
      </div>
      <div id="accordionMap">
        <h3> 
          <a href="#" />
        </h3>
        <ul>
          <li 
            v-for="mapview in MapList"
            :key="mapview"
          >
            <img src="../assets/img/map.png">
            {{ mapview.mapName }}
          </li>
        </ul>
      </div>
      <div id="accordionOther">
        <h3>
          <a href="#" />
        </h3>
        <ul>
          <li
            v-for="command in CommandList"
            :key="command"
          >
            <img src="../assets/img/other.png">
            {{ command.CommandName }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import AccordionUI from "../../js/customLibs/ui/accordionUI.js";
import ListItemUI from "../../js/customLibs/ui/listItemUI.js";
import EditMapItem from "/js/customLibs/editMapItem.js";

const $ = require('jquery');

export default {
    name: 'ItemAccordion',
    data: () => {
        return {
            SessionKey: "c8d72e9d304928e34b73120f35cba6a2",
            CameraList:     [],
            CustomviewList: [],
            MapList:        [],
            CommandList:    [],
        };
    },
    mounted () {
        let editMapItem = new EditMapItem(this.SessionKey);
        editMapItem.Init();
        let accordion = new AccordionUI(document.getElementById("accordion"));
        accordion.Init(editMapItem);
        accordion.BindCameraGroup();
        editMapItem.cameraGroupList.Finished(() => {
            this.CameraList = editMapItem.cameraGroupList.GetGroupList();
            let img = new Image();
            img.src = editMapItem.cameraList.DefaultImageUrl;
            for (let i in this.CameraList) {
                const groupId = this.CameraList[i].cameraGroupId;
                let html = "<li groupId='" + groupId + "'><span>" + this.CameraList[i].cameraGroupName + "</span>";
                html += (this.CameraList[i].existCamera || this.CameraList[i].existGroup)
                    ? "<ul id='group_" + groupId + "'></ul></li>"
                    : "</li>";
                const parentId = this.CameraList[i].parentId;
                /*const branches = (parentId == 0)
                    ? $(html).appendTo(cameraTree)
                    : $(html).appendTo($("#group_" + parentId));

                cameraTree.tree({
                    collapsed: false,
                    add: branches
                });*/
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
                accordion.AddItemToArray(itemUI);
                itemUI.editMapItem = editMapItem;
                itemUI.accordionUI = accordion;
                //customTree.append($item);
                //customTree.treeview({add: $item}); //DRAGDROP使えるようにツリービューは必須か。
            }
            img.src = editMapItem.customViewList.DefaultImageUrl;
        });
        editMapItem.mapList.Finished(() => {
            let img = new Image();
            this.MapList = editMapItem.mapList.GetMapList();
            for (let i in this.MapList) {
                const itemUI = new ListItemUI(editMapItem.mapList.typeID,
                    this.MapList[i].mapId, 
                    this.MapList[i].mapName,
                    img
                );
                accordion.AddItemToArray(itemUI);
                itemUI.editMapItem = editMapItem;
                itemUI.accordionUI = accordion;
                //mapTree.append($item);
                //SmapTree.treeview({ add: $item });
            }
            img.src = editMapItem.mapList.DefaultImageUrl;
        });
        editMapItem.commandList.Finished(() => {
            let img = new Image();
            this.CommandList = editMapItem.commandList.GetCommandList();
            const func = (i) => {
                const nameList = {"4": Localize.TEXT_COMMAND_PREV, "5": Localize.TEXT_COMMAND_NEXT};
                const id = this.CommandList[i].commandId;
                const name = nameList.id;
                console.log(name);
                const itemUI = new ListItemUI(
                    editMapItem.commandList.typeID,
                    id,
                    name,
                    img
                );
                accordion.AddItemToArray(itemUI);
                itemUI.editMapItem = editMapItem;
                itemUI.accordionUI = accordion;
                //commandTree.append($item);
                //commandTree.treeview({ add: $item });
            }
            img.src = editMapItem.defaultItemImageList.GetDefaultItemImageByID(parseInt(list[i].commandId)).mapItemDefaultImageUrl;
            for (let i in list) { func(i); }
        });
    },
    methods: {
    },
}

</script>