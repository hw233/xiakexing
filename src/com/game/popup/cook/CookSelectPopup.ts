module rf {

    //烹饪
    export class CookSelectItem extends TSourceCompment {

        skin: TSourceCompment & IPopup_Cook_select_item;

        _data: IConbine;

        icon: ItemIcon;

        seleceNum: number;
        maxNum: number = 5;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "cook_select_item");
        }

        bindComponents() {

            this.skin = this as any;

            let { _icon, txt_pro_1, txt_pro_2, select_comp, btn_zhizuo } = this.skin;
            let { btn_left, btn_right, btn_max } = select_comp;

            setText(txt_pro_1, "制作数量:")
            setText(txt_pro_2, "预计时长:");

            let icon = new ItemIcon();
            _icon.addChild(icon);
            this.icon = icon;

            setButtonName(btn_zhizuo, "制作");

            btn_left.on(MouseEventX.CLICK, this.onLeftClickHandler, this);
            btn_right.on(MouseEventX.CLICK, this.onRightClickHandler, this);
            btn_max.on(MouseEventX.CLICK, this.maxClickHandle, this);
            btn_zhizuo.on(MouseEventX.CLICK, this.zhizuoClickHandle, this);

        }

        doData() {

            let { _data, skin, icon } = this;

            if (_data) {
                let { txt_title, txt_count, txt_term } = skin;
                let { name, itemId, conbineCost } = _data;

                let item = gameConfig.item[itemId];
                icon.data = item;

                setText(txt_title, name, Rare[item.rare]);
                setText(txt_count, `${itemModel.getItemCount(itemId)}`);

                let flag = true;

                let str = "";

                let list: number[] = [];
                forarr(getLimitValues(conbineCost), v => {
                    let { name, count, maxCount } = v;

                    maxCount = Math.abs(maxCount);

                    let tempValue = (count / maxCount);
                    list.push(Math.floor(tempValue));

                    let rusult = (tempValue >= 1);

                    if (flag) {
                        flag = rusult;
                    }

                    str += `${name} x${maxCount}    `;

                    return true;
                })

                list.sort((a, b) => {
                    if (a < b) {
                        return -1;
                    }
                });

                this.maxNum = list.shift();

                setText(txt_term, `消耗:${str}`);
            }

            this.seleceNum = 0;
            this.changeSeleceNum();
        }

        changeSeleceNum() {
            let { skin, seleceNum, _data } = this;
            let { select_comp, txt_shuliang, txt_shichang } = skin;

            let { cookTimeSeconds } = _data;

            setText(select_comp.txt_num, `${seleceNum}`);

            setText(txt_shuliang, `${seleceNum}`);

            let { hour, minute } = getTimeToS(cookTimeSeconds * seleceNum);

            setText(txt_shichang, `${hour} 小时${minute} 分钟`);
        }

        onLeftClickHandler() {
            playEffectKeyByAudio("shu_zi_tiao_zheng");

            let { seleceNum } = this;

            if (seleceNum > 0) {
                this.seleceNum--;
                this.changeSeleceNum();
            }
        }

        onRightClickHandler() {
            playEffectKeyByAudio("shu_zi_tiao_zheng");

            let { seleceNum, maxNum } = this;

            if (seleceNum < maxNum) {
                this.seleceNum++;
                this.changeSeleceNum();
            }
        }

        maxClickHandle() {
            playEffectKeyByAudio("shu_zi_tiao_zheng");

            this.seleceNum = this.maxNum;
            this.changeSeleceNum();
        }

        zhizuoClickHandle() {
            let { _data, seleceNum } = this;

            if (seleceNum) {
                facade.simpleDispatch(GameEvent.REFRESH_COOK, [_data.id, seleceNum]);
            } else {
                addPrompt("请选择数量");
            }
        }

    }

    export class CookSelectPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Crop_cook_fuzhou_select_popup;

        _data: IConbine[];

        showEffect = false;

        list: List;

        guid: number;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "crop_cook_fuzhou_select_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { skin, source } = this;

            let list = new List(source, CookSelectItem, 424, 287, 0, 20);
            skin.addChild(list);
            this.list = list;
            list.setPos(28, 41);
            list.setScrollRect(480, 750, 0, 1);
        }

        doData() {
            super.doData();

            let { _data, list } = this;
            list.displayList(_data);
        }

        @EVT(GameEvent.REFRESH_COOK)
        refreshPlant(event: EventX) {
            let [id, num] = event.data as number[];

            foward(CM_CODE.CM_Cook, [id, this.guid, num]);

            this.close();
        }
    }
}