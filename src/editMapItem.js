import store from '@/store.js';
import * as customModule from '../../js/custom.js';
import UploadFile from '../../js/customLibs/uploadFile.js';
import RequestServer from '/js/customLibs/requestServer.js';

const EditMapItem = function (sessionKey) {
    this.sessionKey = sessionKey;
    this.cameraGroupList = new customModule.default.CameraGroupList(
        this.sessionKey
    );
    this.cameraList = new customModule.default.CameraList(this.sessionKey);
    this.commandList = new customModule.default.CommandList(this.sessionKey);
    this.customViewList = new customModule.default.CustomViewList(
        this.sessionKey
    );
    this.mapList = new customModule.default.MapList(this.sessionKey);
    this.mapImageList = new customModule.default.MapImageList(this.sessionKey);
    this.defaultItemImageList = new customModule.default.DefaultItemImageList(
        this.sessionKey
    );
    this.mapItemImageList = new customModule.default.MapItemImageList(
        this.sessionKey
    );

    this.MapDetailList = [];
    this._MapDetailindex = 0;
    //this._menuUpload  = new UploadFile();
    //this._menuUpload.Init();
    this.CurrentMap = {};
    this.CameraList = [];
    (this.Init = () => {
        this.mapImageList.Request();
        this.defaultItemImageList.Request();
        this.mapItemImageList.Request();
        this.mapList.Request();
        this.defaultItemImageList.Finished(function (su, msg) {
            if (su) {
                //debugger
                this.cameraGroupList.Request();
                this.cameraList.Request();
                this.commandList.Request();
                this.customViewList.Request();
                this.mapList.Request();
                this.cameraList.DefaultImageUrl =
                    this.defaultItemImageList.GetDefaultItemImageByID(
                        1
                    ).mapItemDefaultImageUrl;
                this.commandList.DefaultImageUrl =
                    this.defaultItemImageList.GetDefaultItemImageByID(
                        4
                    ).mapItemDefaultImageUrl;
                this.customViewList.DefaultImageUrl =
                    this.defaultItemImageList.GetDefaultItemImageByID(
                        2
                    ).mapItemDefaultImageUrl;
                this.mapList.DefaultImageUrl =
                    this.defaultItemImageList.GetDefaultItemImageByID(
                        3
                    ).mapItemDefaultImageUrl;
            } else {
                alert(msg);
            }
        });
    }),
        (this.AddMapDetailItem = mapDetailItem => {
            if (mapDetailItem.DetailID == null) {
                mapDetailItem.DetailID = this._MapDetailindex++;
            }
            this.MapDetailList[mapDetailItem.DetailID] = mapDetailItem;
        }),
        (this.RemoveMapDetailItem = mapDetailItem => {
            delete this.MapDetailList[mapDetailItem.DetailID];
        }),
        (this.ClearMapDetailItem = () => {
            this._MapDetailindex = 0;
            this.MapDetailList = [];
        }),
        (this.UploadDetailImage = (jQbtn, FinishedFn) => {
            const pam = { sessionKey: this.sessionKey };
            const methodName = 'SetMapItemImage';
            this._menuUpload.Upload(
                jQbtn,
                methodName,
                pam,
                function (_file, response) {
                    this.mapItemImageList.Request();
                    try {
                        let json = eval('(' + response + ')');
                        // eslint-disable-next-line no-undef
                        log.writeLog(methodName, obj2str(pam), obj2str(json));
                        // eslint-disable-next-line no-undef
                        if (josn.mapItemImageId == null) {
                            FinishedFn(null);
                        } else {
                            FinishedFn(json);
                        }
                    } catch (e) {
                        FinishedFn(null);
                    }
                }
            );
        }),
        (this.UploadImg = (jQbtn, FinishedFn) => {
            let pam = { sessionKey: this.sessionKey };
            const methodName = 'SetMapImage';

            // eslint-disable-next-line no-undef
            imageUpload = new UploadFile();
            // eslint-disable-next-line no-undef
            imageUpload.Init();
            // eslint-disable-next-line no-undef
            imageUpload.Upload(
                jQbtn,
                methodName,
                pam,
                function (_file, response) {
                    try {
                        let josn = eval('(' + response + ')');
                        // eslint-disable-next-line no-undef
                        log.writeLog(methodName, obj2str(pam), obj2str(josn));
                        if (josn.mapImageId == null) {
                            FinishedFn(null);
                        } else {
                            FinishedFn(josn);
                        }
                    } catch (e) {
                        FinishedFn(null);
                    }
                }
            );
            // eslint-disable-next-line no-undef
            return imageUpload;
        }),
        (this.CreateNewMap = json => {
            //debugger
            this.CurrentMap.mapImageId = json.mapImageId;
            this.CurrentMap.mapImageUrl = json.mapImageUrl;
            this.ClearMapDetailItem();
        }),
        (this.ChangeMapImage = json => {
            this.CurrentMap.mapImageId = json.mapImageId;
            this.CurrentMap.mapImageUrl = json.mapImageUrl;
        }),
        (this.OpenMap = mapID => {
            const self = this;
            let detailRequest = new RequestServer();
            detailRequest.prm = { sessionKey: this.sessionKey, mapId: mapID };
            detailRequest.methodName = 'GetMapDetailInfo';
            self.mapList.Finished(() => {
                detailRequest.Request();
                detailRequest.Finished(() => {
                    self.ClearMapDetailItem();
                    const m = self.mapList.GetMapByID(mapID);
                    self.CurrentMap.mapId = m.mapId;
                    self.CurrentMap.mapImageId = m.mapImageId;
                    self.CurrentMap.isRootMap = m.isRootMap;
                    self.CurrentMap.mapName = m.mapName;
                    const list = detailRequest.returnData.mapDetailList;
                    for (let i in list) {
                        let detailItem =
                            new customModule.default.MapDetailItem();
                        detailItem.typeId = list[i].typeId;
                        detailItem.typePrimaryId = list[i].typePrimaryId;
                        detailItem.left = list[i].left;
                        detailItem.top = list[i].top;
                        detailItem.height = list[i].bottom - detailItem.top;
                        detailItem.width = list[i].right - detailItem.left;
                        detailItem.instanceType = list[i].instanceType;
                        detailItem.itemDefaultImageId = list[i].itemImageId; //defaut = itemimage
                        detailItem.itemImageId = list[i].itemImageId;
                        detailItem.itemMouseOverImageId =
                            list[i].itemMouseOverImageId;
                        detailItem.itemMouseDownImageId =
                            list[i].itemMouseDownImageId;
                        detailItem.itemDisableImageId =
                            list[i].itemDisableImageId;
                        detailItem.zIndex = list[i].zIndex;
                        self.AddMapDetailItem(detailItem);
                    }
                    self.SetMapImage(this.CurrentMap.mapImageId);
                });
            });
        }),
        (this.SetMapImage = mapImageId => {
            this.mapImageList.Request();
            this.mapImageList.Finished(() => {
                this.CurrentMap.mapImageUrl =
                    this.mapImageList.GetMapImageByID(mapImageId).mapImageUrl;
                store.commit('setCurrentMap', this.CurrentMap);
                console.log(store.state.CurrentMap);
                this.DefaultItemImageListReady();
            });
        }),
        (this.DefaultItemImageListReady = () => {
            this.defaultItemImageList.Request();
            this.defaultItemImageList.Finished();
            this.mapItemImageList.Request();
            this.mapItemImageList.Finished();
            this.cameraGroupList.Request();
            this.cameraGroupList.Finished();
            this.commandList.Request();
            this.commandList.Finished();
            this.customViewList.Request();
            this.customViewList.Finished(() => {
                this.CameraInfoReady();
            });
        }),
        (this.CameraInfoReady = () => {
            const itemlist = this.MapDetailList;
            let sendCount = 0;
            for (let i in itemlist) {
                switch (parseInt(itemlist[i].typeId)) {
                    case 1:
                        sendCount++;
                        break;
                }
            }
            if (sendCount === 0) {
                this.SetMapItemInfo();
                return;
            } // カメラ無しはスキップ
            for (let j in itemlist) {
                // カメラ情報取得
                switch (parseInt(itemlist[j].typeId)) {
                    case 1:
                        // eslint-disable-next-line no-case-declarations
                        const cameraInfo = new customModule.default.CameraInfo(
                            this.sessionKey,
                            itemlist[j].typePrimaryId
                        );
                        cameraInfo.Request();
                        cameraInfo.Finished(() => {
                            const info = cameraInfo.GetCameraInfo();
                            this.CameraList.push(info);
                            sendCount--;
                            if (sendCount <= 0) {
                                this.SetMapItemInfo();
                            }
                        });
                        break;
                }
            }
        }),
        (this.SetMapItemInfo = () => {
            const self = this;
            const itemlist = this.MapDetailList;
            for (let i in itemlist) {
                let imgInfo = self.mapItemImageList.GetMapItemImageByID(
                    itemlist[i].itemImageId
                );
                itemlist[i].itemImageUrl = imgInfo
                    ? imgInfo.mapItemImageUrl
                    : null;

                imgInfo = self.mapItemImageList.GetMapItemImageByID(
                    itemlist[i].itemMouseOverImageId
                );
                itemlist[i].itemMouseOverImageUrl = imgInfo
                    ? imgInfo.mapItemImageUrl
                    : null;

                imgInfo = self.mapItemImageList.GetMapItemImageByID(
                    itemlist[i].itemMouseDownImageId
                );
                itemlist[i].itemMouseDownImageUrl = imgInfo
                    ? imgInfo.mapItemImageUrl
                    : null;

                imgInfo = self.mapItemImageList.GetMapItemImageByID(
                    itemlist[i].itemDisableImageId
                );
                itemlist[i].itemDisableImageUrl = imgInfo
                    ? imgInfo.mapItemImageUrl
                    : null;
                itemlist[i].itemDefaultImageId =
                    itemlist[i].typeId != 4
                        ? itemlist[i].typeId
                        : itemlist[i].typePrimaryId;

                imgInfo = self.defaultItemImageList.GetDefaultItemImageByID(
                    itemlist[i].itemDefaultImageId
                );
                itemlist[i].itemDefaultImageUrl = imgInfo
                    ? imgInfo.mapItemDefaultImageUrl
                    : null;

                let obj = null;
                switch (parseInt(itemlist[i].typeId)) {
                    case 1:
                        obj = null;
                        for (let index in self.CameraList) {
                            if (
                                self.CameraList[index].cameraId ==
                                itemlist[i].typePrimaryId
                            ) {
                                obj = self.CameraList[i];
                                break;
                            }
                        }

                        if (!obj) {
                            delete itemlist[i];
                        } else {
                            itemlist[i].itemName = obj.cameraName;
                            //Set GroupName
                            let group = self.cameraGroupList.GetGroupByID(
                                obj.cameraGroupId
                            );
                            if (group != null) {
                                itemlist[i].groupName = group.cameraGroupName;
                            }
                        }
                        break;
                    case 2:
                        obj = self.customViewList.GetCustomviewByID(
                            itemlist[i].typePrimaryId
                        );
                        if (obj == null) {
                            delete itemlist[i];
                        } else {
                            itemlist[i].itemName = obj.customViewName;
                        }
                        break;
                    case 3:
                        obj = self.mapList.GetMapByID(
                            itemlist[i].typePrimaryId
                        );
                        if (obj == null) {
                            delete itemlist[i];
                        } else {
                            itemlist[i].itemName = obj.mapName;
                        }
                        break;
                    case 4:
                        obj = self.commandList.GetCommandByID(
                            itemlist[i].typePrimaryId
                        );
                        if (obj == null) {
                            delete itemlist[i];
                        } else {
                            const nameList = {
                                // eslint-disable-next-line no-undef
                                4: Localize.TEXT_COMMAND_PREV,
                                // eslint-disable-next-line no-undef
                                5: Localize.TEXT_COMMAND_NEXT,
                            };
                            itemlist[i].itemName = nameList[obj.commandId];
                        }
                        break;
                    default:
                }
            }
        }),
        (this.SaveMapInfo = FinishedFn => {
            const self = this;
            const MapInfoRequest = new RequestServer();
            MapInfoRequest.methodName = 'SetMapInfo';
            MapInfoRequest.prm = {
                sessionKey: this.sessionKey,
                // eslint-disable-next-line no-undef
                mapInfo: obj2str({
                    mapId: self.CurrentMap.mapId,
                    mapImageId: self.CurrentMap.mapImageId,
                    isRootMap: self.CurrentMap.isRootMap,
                    mapName: self.CurrentMap.mapName,
                }),
            };
            MapInfoRequest.Request();
            MapInfoRequest.Finished((su, msg) => {
                if (su) {
                    self.CurrentMap.mapId = MapInfoRequest.returnData.mapId;
                    self.mapList.Clear();
                    self.mapList.Request();
                    self.mapImageList.Request();
                    if (self._MapDetailindex < 1) {
                        FinishedFn(true);
                        return;
                    }
                    const MapDetailRequest = new RequestServer();
                    MapDetailRequest.methodName = 'SetMapDetailInfo';
                    MapDetailRequest.prm = { sessionKey: self.sessionKey };
                    MapDetailRequest.prm.mapId = self.CurrentMap.mapId;
                    MapDetailRequest.prm.mapDetailInfo = {};

                    let detailInfoList = [];
                    for (let i in self.MapDetailList) {
                        let detailInfo = {};
                        detailInfo.typeId = self.MapDetailList[i].typeId;
                        detailInfo.typePrimaryId =
                            self.MapDetailList[i].typePrimaryId;
                        detailInfo.left = self.MapDetailList[i].left;
                        detailInfo.top = self.MapDetailList[i].top;
                        detailInfo.right =
                            parseInt(self.MapDetailList[i].left) +
                            parseInt(self.MapDetailList[i].width);
                        detailInfo.bottom =
                            parseInt(self.MapDetailList[i].top) +
                            parseInt(self.MapDetailList[i].height);
                        detailInfo.instanceType =
                            self.MapDetailList[i].instanceType;
                        detailInfo.itemImageId =
                            self.MapDetailList[i].itemImageId;
                        detailInfo.itemMouseOverImageId =
                            self.MapDetailList[i].itemMouseOverImageId;
                        detailInfo.itemMouseDownImageId =
                            self.MapDetailList[i].itemMouseDownImageId;
                        detailInfo.itemDisableImageId =
                            self.MapDetailList[i].itemDisableImageId;
                        detailInfo.zIndex = self.MapDetailList[i].zIndex;
                        detailInfoList.push(detailInfo);
                    }
                    MapDetailRequest.prm.mapDetailInfo =
                        // eslint-disable-next-line no-undef
                        obj2str(detailInfoList);
                    MapDetailRequest.Request();
                    MapDetailRequest.Finished(function (detailSuccess, msg) {
                        if (detailSuccess) {
                            FinishedFn(true);
                        } else {
                            FinishedFn(false, msg);
                        }
                    });
                } else {
                    FinishedFn(false, msg);
                }
            });
        }),
        (this.DeleteMapInfo = FinishedFn => {
            if (this.CurrentMap.mapId == 0) {
                this.ClearMapDetailItem();
                this.CurrentMap = null;
                FinishedFn(true);
                return;
            }
            let request = new RequestServer();
            request.prm = {
                sessionKey: this.sessionKey,
                mapId: this.CurrentMap.mapId,
            };
            request.methodName = 'DelMapInfo';
            request.Request();
            request.Finished(function (su) {
                this.ClearMapDetailItem();
                this.CurrentMap = null;
                this.mapList.Request();
                FinishedFn(su);
            });
        }),
        (this.GetMapConfirmUrl = fn => {
            if (this.CurrentMap == null) {
                // eslint-disable-next-line no-undef
                fn(false, Localize.TEXT_DIALOG_NOT_OPENMAP_MSG);
                return;
            }
            if (this.CurrentMap.mapId == null) {
                // eslint-disable-next-line no-undef
                fn(false, Localize.TEXT_DIALOG_NOT_OPENMAP_MSG);
                return;
            }
            if (this.CurrentMap.mapId == 0) {
                // eslint-disable-next-line no-undef
                fn(false, Localize.TEXT_DIALOG_NOT_SAVEMAP_MSG);
                return;
            }

            let request = new RequestServer();
            request.prm = {
                sessionKey: this.sessionKey,
                mapId: this.CurrentMap.mapId,
            };
            request.methodName = 'GetMapConfirmUrl';
            request.Request();
            request.Finished(su => {
                if (su) {
                    fn(su, request.returnData.mapConfirmUrl);
                } else {
                    fn(false, 'err!');
                }
            });
        });
};

export default EditMapItem;
