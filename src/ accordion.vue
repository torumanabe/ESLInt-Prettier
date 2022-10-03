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
            {{ command.CommandName }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import AccordionUI from "../../js/customLibs/ui/accordionUI.js";
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
        editMapItem.cameraGroupList.Finished( (su, msg) => {
            if (su) {
                this.CameraList = editMapItem.cameraGroupList.GetGroupList();
                let img = new Image();
                for (let i in this.CameraList) {
                    const groupId = list[i].cameraGroupId;
                    let html = "<li class='' groupId='" + groupId + "'><img class='group' src='./img/group.png' />" +
                        "<span>" + list[i].cameraGroupName + "</span>";
                    html += (list[i].existCamera || list[i].existGroup)
                        ? "<ul id='group_" + groupId + "'></ul></li>"
                        : "</li>";
                    const parentId = list[i].parentId;
                    const branches = (parentId == 0)
                        ? $(html).appendTo(cameraTree)
                        : $(html).appendTo($("#group_" + parentId));

                }
                img.src = self.editMapItem.cameraList.DefaultImageUrl;
            }
        });
        editMapItem.customViewList.Finished( (su) => {
            if (su) {
                let img = new Image();
                this.CustomviewList = editMapItem.customViewList.GetCustomViewList();
                console.log(CustomviewList);
                for (let i in CustomviewList) {
                    const itemUI = new ListItemUI(
                        self.editMapItem.customViewList.typeID,
                        list[i].customViewId,
                        sanitize(list[i].customViewName),
                        img
                    );
                    self.AddItemToArray(itemUI._typeID, itemUI._itemID, itemUI);
                    itemUI.editMapItem = self.editMapItem;
                    itemUI.accordionUI = self;
                    itemUI.$item.find("img").attr("src", "./img/customview.png");
                    $item.append(itemUI.$item);
                    customTree.append($item);
                    customTree.treeview({add: $item});
                }
                img.src = self.editMapItem.customViewList.DefaultImageUrl;
            }
        });
        editMapItem.mapList.Finished( (su) => {
            if (su) {
                let img = new Image();
                this.MapList = editMapItem.mapList.GetMapList();
                for (let i in MapList) {
                    const itemUI = new ListItemUI(
                        self.editMapItem.mapList.typeID,
                        list[i].mapId,
                        list[i].mapName,
                        img
                    );
                    self.AddItemToArray(itemUI._typeID, itemUI._itemID, itemUI);
                    itemUI.editMapItem = self.editMapItem;
                    itemUI.accordionUI = self;
                    itemUI.$item.find("img").attr("src", "./img/map.png");
                    $item.append(itemUI.$item);
                    mapTree.append($item);
                    mapTree.treeview({ add: $item });
                }
                img.src = self.editMapItem.mapList.DefaultImageUrl;
            }
        });
        editMapItem.commandList.Finished( (su) => {
            if (su) {
                this.CommandList = editMapItem.commandList.GetCommandList();
                const func = (i) => {
                    let img = new Image();
                    img.onload = (e) => {
                        this.onload = null; // for animation GIF
                        const nameList = {"4": Localize.TEXT_COMMAND_PREV, "5": Localize.TEXT_COMMAND_NEXT};
                        const id = list[i].commandId;
                        const name = nameList[id];
                        const itemUI = new ListItemUI(
                            self.editMapItem.commandList.typeID,
                            id,
                            name,
                            img
                        );
                        self.AddItemToArray(itemUI._typeID, itemUI._itemID, itemUI);
                        itemUI.editMapItem = self.editMapItem;
                        itemUI.accordionUI = self;
                        itemUI.$item.find("img").attr("src", "./img/other.png");
                        $item.append(itemUI.$item);
                        commandTree.append($item);
                        commandTree.treeview({ add: $item });
                    }
                    img.src = self.editMapItem.defaultItemImageList.GetDefaultItemImageByID(parseInt(list[i].commandId)).mapItemDefaultImageUrl;
                };
                for (let i in list) { func(i); }
            }
        });
    },
    methods: {
    },
}

</script>