declare module rf{

	interface IBeibaoScene_Select_btn{
	
	}

	interface IBeibaoScene_Beibao_bottom{
		chetcomp:TComponent & IBeibaoScene_Chetcomp;
		housecomp:TComponent & IBeibaoScene_Housecomp;
	}

	interface IBeibaoScene_Auto_select{
	
	}

	interface IBeibaoScene_Npc_deal_item{
		_icon:TComponent & IBeibaoScene_Deal_icon;
		txt_status:TextField;
		txt_num:TextField;
		txt_price:TextField;
		txt_name:TextField;
	}

	interface IBeibaoScene_Bottom_store{
		txt_gold:TextField;
	}

	interface IBeibaoScene_Beibaocomp{
		beibao_bottom:TComponent & IBeibaoScene_Beibao_bottom;
		btn_delete:TComponent & IBeibaoScene_Btn_auto;
		btn_split:TComponent & IBeibaoScene_Btn_auto;
	}

	interface IBeibaoScene_Role_info{
		100:TComponent & IBeibaoScene_Equipage_slot;
		101:TComponent & IBeibaoScene_Equipage_slot;
		102:TComponent & IBeibaoScene_Equipage_slot;
		103:TComponent & IBeibaoScene_Equipage_slot;
		104:TComponent & IBeibaoScene_Equipage_slot;
		105:TComponent & IBeibaoScene_Equipage_slot;
		106:TComponent & IBeibaoScene_Equipage_slot;
		107:TComponent & IBeibaoScene_Equipage_slot;
		108:TComponent & IBeibaoScene_Equipage_slot;
		109:TComponent & IBeibaoScene_Equipage_slot;
	}

	interface IBeibaoScene_Btn_auto{
		select:TComponent & IBeibaoScene_Auto_select;
		btnName:TextField;
	}

	interface IBeibaoScene_Storecomp{
		btn_daoju:TComponent & IBeibaoScene_Btn_store;
		btn_chongzhi:TComponent & IBeibaoScene_Btn_store;
		title_1:TComponent & IBeibaoScene_Store_title_1;
		title_2:TComponent & IBeibaoScene_Store_title_2;
		goldcomp:TComponent & IBeibaoScene_Bottom_store;
	}

	interface IBeibaoScene_Npc_deal_comp{
		bottom:TComponent & IBeibaoScene_Deal_bottom;
	}

	interface IBeibaoScene_Store_title_2{
	
	}

	interface IBeibaoScene_Deal_text_btn{
		select:TComponent & IBeibaoScene_Select_btn;
		btnName:TextField;
	}

	interface IBeibaoScene_Cangku_item{
		select:TComponent & IBeibaoScene_Cangku_select;
		btnName:TextField;
	}

	interface IBeibaoScene_Btn_store{
		xuanze:TComponent & IBeibaoScene_Xuanzekuang;
		btnName:TextField;
	}

	interface IBeibaoScene_Store_item_1{
		txt_desc:TextField;
		txt_num:TextField;
		btn_buy:TComponent & IBeibaoScene_Btn_shop_1;
		txt_name:TextField;
	}

	interface IBeibaoScene_Btn_shop_2{
		btnName:TextField;
	}

	interface IBeibaoScene_Xuanzekuang{
	
	}

	interface IBeibaoScene_Deal_bottom{
		btn_deal:TComponent & IBeibaoScene_Deal_text_btn;
		btn_repair:TComponent & IBeibaoScene_Deal_text_btn;
	}

	interface IBeibaoScene_Housecomp{
	
	}

	interface IBeibaoScene_Store_title_1{
	
	}

	interface IBeibaoScene_Chetcomp{
		btn_shiqu:TComponent & IBeibaoScene_Btn_shiqu;
		title:TComponent & IBeibaoScene_Beibao_text_bg;
	}

	interface IBeibaoScene_Beibao_text_bg{
		txt_desc:TextField;
	}

	interface IBeibaoScene_Store_item_2{
		txt_desc:TextField;
		btn_buy:TComponent & IBeibaoScene_Btn_shop_2;
		txt_name:TextField;
	}

	interface IBeibaoScene_Equipage_slot{
	
	}

	interface IBeibaoScene_Btn_shiqu{
		btnName:TextField;
	}

	interface IBeibaoScene_Btn_shop_1{
		btnName:TextField;
	}

	interface IBeibaoScene_Cangku_select{
	
	}

	interface IBeibaoScene_Deal_icon{
	
	}

}