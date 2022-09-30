<template>
  <div class="accordion-area">
    <div id="accordion">
      <div id="accordionCamera">
        <h3>
          <a href="#" />
        </h3>
        <ul
          id='cameraTree'
          class='filetree'
        />
      </div>
      <div id="accordionCustomview">
        <h3>
          <a href="#" />
        </h3>
        <ul
          id='customTree'
          class='filetree'
        />
      </div>
      <div id="accordionMap">
        <h3>
          <a href="#" />
        </h3>
        <ul
          id='mapTree'
          class='filetree'
        />
      </div>
      <div id="accordionOther">
        <h3>
          <a href="#" />
        </h3>
        <ul
          id='commandTree'
          class='filetree'
        />
      </div>
    </div>
  </div>
</template>

<script>
import AccordionUI from "../../js/customLibs/ui/accordionUI.js";
import EditMapItem from "/js/customLibs/editMapItem.js";

export default {
  name: 'ItemAccordion',
  mounted () {
      let editMapItem = new EditMapItem("c8d72e9d304928e34b73120f35cba6a2");
      editMapItem.Init();
      const accordionDiv = document.getElementById("accordion");
      let accordion = new AccordionUI(accordionDiv);
      accordion.Init(editMapItem);
  },
  methods () {
    AddCameraList = () => {
      const self = this;
      const $Div = this.$camreaListDiv;
      $Div.find("div").empty();
      let cameraTree = $("<ul id='cameraTree' class='filetree'></ul>");
      cameraTree.appendTo($Div.find("div"));
      /*cameraTree.treeview({
        animated: "fast",
        collapsed: true,
        persist: "location",
        control: "#treecontrol"
      });*/
      this.editMapItem.cameraGroupList.Finished(function (su, msg) {
        if (su) {
          let list = self.editMapItem.cameraGroupList.GetGroupList();
          let img = new Image();
          console.log(img);
          /*img.onload = function () {
            //this.onload = null; // for animation GIF
            for (let i in list) {
              const groupId = list[i].cameraGroupId;
              console.log(groupId);
              let html = "<li class='' groupId='" + groupId + "'><img class='group' src='./img/group.png' />" +
                "<span>" + sanitize(list[i].cameraGroupName) + "</span>";
              html += (list[i].existCamera || list[i].existGroup)
                ? "<ul id='group_" + groupId + "'></ul></li>"
                : "</li>";

              const parentId = list[i].parentId;
              const branches = (parentId == 0)
                ? $(html).appendTo(cameraTree)
                : $(html).appendTo($("#group_" + parentId));

              cameraTree.treeview({
                collapsed: false,
                add: branches
              });
            }
          }*/
          img.src = self.editMapItem.cameraList.DefaultImageUrl;
        }
    });
  };
  AddCustomviewList: () => {
    const self = this;
    self.$customViewListDiv.find('div').empty();
    let customTree = $("<ul id='customTree' class='filetree'></ul>");
    self.$customViewListDiv.find('div').append(customTree);
    customTree.treeview({
      animated: "fast",
      collapsed: false,
      persist: "location",
      control: "#treecontrol"
    });
    this.editMapItem.customViewList.Finished(function (su) {
      if (su) {
        let img = new Image();
        img.onload = function () { //load defaultImage
          this.onload = null; // for animation GIF
          const list = self.editMapItem.customViewList.GetCustomViewList();
          for (let i in list) {
            const $item = $("<li></li>");
            const itemUI = new ListItemUI(self.editMapItem.customViewList.typeID,
              list[i].customViewId,
              sanitize(list[i].customViewName),
              img);
            self.AddItemToArray(itemUI._typeID, itemUI._itemID, itemUI);
            itemUI.editMapItem = self.editMapItem;
            itemUI.accordionUI = self;

            itemUI.$item.find("img").attr("src", "./img/customview.png");
            $item.append(itemUI.$item);
            customTree.append($item);
            customTree.treeview({add: $item});
          }
        }
        img.src = self.editMapItem.customViewList.DefaultImageUrl;
      }
    });
  };
  AddMapList: () => {
    const self = this;
    self.$mapListDiv.find('div').html("");
    let mapTree = $("<ul id='mapTree' class='filetree'></ul>");
    self.$mapListDiv.find('div').append(mapTree);
    mapTree.treeview({
      animated: "fast",
      collapsed: false,
      persist: "location",
      control: "#treecontrol"
    });
    this.editMapItem.mapList.Finished(function (su) {
      if (su) {
        let img = new Image();
        img.onload = function () {
          this.onload = null; // for animation GIF
          const list = self.editMapItem.mapList.GetMapList();
          for (let i in list) {
            const $item = $("<li></li>");
            const itemUI = new ListItemUI(self.editMapItem.mapList.typeID,list[i].mapId, sanitize(list[i].mapName), img);
            self.AddItemToArray(itemUI._typeID, itemUI._itemID, itemUI);
            itemUI.editMapItem = self.editMapItem;
            itemUI.accordionUI = self;
            itemUI.$item.find("img").attr("src", "./img/map.png");
            $item.append(itemUI.$item);
            mapTree.append($item);
            mapTree.treeview({ add: $item });
          }
        };
        img.src = self.editMapItem.mapList.DefaultImageUrl;
      }
    });
};
AddCommandList: () => {
    const self = this;
    self.$commandListDiv.find('div').empty();
    let commandTree = $("<ul id='commandTree' class='filetree'></ul>");
    self.$commandListDiv.find('div').append(commandTree);
    commandTree.treeview({
      animated: "fast",
      collapsed: false,
      persist: "location",
      control: "#treecontrol"
    });
    this.editMapItem.commandList.Finished(function (su) {
        if (su) {
          const list = self.editMapItem.commandList.GetCommandList();
          const func = function (i) {
            let img = new Image();
            img.onload = function (e) {
              this.onload = null; // for animation GIF
              const $item = $("<li></li>");
              const nameList = {"4": Localize.TEXT_COMMAND_PREV, "5": Localize.TEXT_COMMAND_NEXT};
              const id = list[i].commandId;
              const name = nameList[id];
              const itemUI = new ListItemUI(self.editMapItem.commandList.typeID, id, name, img);
              self.AddItemToArray(itemUI._typeID, itemUI._itemID, itemUI);
              itemUI.editMapItem = self.editMapItem;
              itemUI.accordionUI = self;
              itemUI.$item.find("img").attr("src", "./img/other.png");
              $item.append(itemUI.$item);
              commandTree.append($item);
              commandTree.treeview({
                add: $item
              });
            }
            img.src = self.editMapItem.defaultItemImageList.GetDefaultItemImageByID(parseInt(list[i].commandId)).mapItemDefaultImageUrl;
          };
          for (let i in list) { func(i); }
        }
      });
    }
  },
}

</script>