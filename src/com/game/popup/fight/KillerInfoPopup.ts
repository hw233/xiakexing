module rf {

    export class KillerDele extends TEventInteresterDele {

        _data: IItemRuntimeData;

        bg: TSpriteUI;
        icon: TSpriteUI;

        bindComponents() {

            let { skin } = this;
            let bg = new TSpriteUI();
            skin.addChildAt(bg, 0);
            bg.setPos(-8, -14);
            this.bg = bg;

            let icon = new TSpriteUI();
            skin.addChild(icon);
            this.icon = icon;

            skin.on(MouseEventX.CLICK, this.onClickHandle, this);
        }

        doData() {
            let { _data, bg, icon } = this;

            if (_data) {
                let { rare, icon: res } = _data.model;

                bg.changeSprite(`item_zhuangbei_${rare}`);

                let [url, key] = res;
                icon.changeSprite(key, url);
            } else {
                bg.clear();
                icon.clear();
            }

        }

        onClickHandle() {
            let { _data } = this;

            if (_data) {
                singleton(ZhuangbeiPopup).open(_data, this);
            }
        }
    }

    export class KillerInfoComp extends TEventInteresterDele {

        skin: TSourceCompment & IBeibaoScene_Role_info;

        _data: { [key: number]: IItemRuntimeData };

        slots: { [key: string]: KillerDele };

        bindComponents() {

            let { skin, slots } = this;
            let config = getTypeDefines(TYPE_CONFIG.ZHUANGBEI);

            this.slots = slots = {};

            foreach(config, (v, k) => {
                let item = skin[`${v.type}`];
                if (item) {
                    let slot = new KillerDele(item);
                    slots[v.type] = slot;
                }

                return true;
            });
        }

        doData() {

            let { _data, slots } = this;
            if (_data) {

                foreach(slots, v => {
                    v.data = undefined;
                    return true;
                });

                foreach(_data, (v, k) => {

                    if (slots[k]) {
                        v.model = gameConfig.item[v.id];
                        slots[k].data = v;
                    }

                    return true;
                });

            }
        }
    }

    export class KillerInfoPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Killer_info_popup;

        skillList: List;

        zhuangbei: KillerInfoComp;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "killer_info_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { skin } = this;

            let { source, zhuangbei, txt_title_1, txt_title_2 } = skin;

            setText(txt_title_1, "装备");
            setText(txt_title_2, "功法");

            this.zhuangbei = new KillerInfoComp(zhuangbei);

            let skillList = new List(source, GongfaItem, 424, 40, 0, 5, true, 1);
            skin.addChild(skillList);
            this.skillList = skillList;
            skillList.setPos(28, 646);
            skillList.setScrollRect(480, 150, 0, 1);
        }

        doData() {
            super.doData();

            let { zhuangbei, skillList } = this;
            let { item, skill } = battleModel.Killer;

            zhuangbei.data = item["slots"];

            let list = [];
            foreach(skill.id, (v: ISkillIDRuntime, k) => {
                if (v.level) {
                    list.push(v);
                }
                return true;
            });

            skillList.displayList(list);
        }
    }
}