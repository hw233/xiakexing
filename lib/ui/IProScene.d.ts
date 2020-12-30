declare module rf{

	interface IProScene_Self_icon{
	
	}

	interface IProScene_Btn_shuxing{
	
	}

	interface IProScene_Pro_comp{
		_icon:TComponent & IProScene_Self_icon;
		btn_con:TComponent & IProScene_Btn_shuxing;
		txt_hp:TextField;
		txt_dex:TextField;
		txt_luck:TextField;
		btn_dex:TComponent & IProScene_Btn_shuxing;
		txt_mp:TextField;
		btn_agl:TComponent & IProScene_Btn_shuxing;
		btn_hit:TComponent & IProScene_Btn_shuxing;
		txt_agl:TextField;
		btn_att:TComponent & IProScene_Btn_shuxing;
		txt_artnumber:TextField;
		txt_master:TextField;
		txt_guild:TextField;
		txt_level:TextField;
		txt_age:TextField;
		btn_prot:TComponent & IProScene_Btn_shuxing;
		btn_luck:TComponent & IProScene_Btn_shuxing;
		txt_hunger:TextField;
		txt_escape:TextField;
		txt_prot:TextField;
		btn_str:TComponent & IProScene_Btn_shuxing;
		txt_killnumber:TextField;
		btn_vigor:TComponent & IProScene_Btn_shuxing;
		txt_triple:TextField;
		btn_per:TComponent & IProScene_Btn_shuxing;
		btn_hp:TComponent & IProScene_Btn_shuxing;
		btn_def:TComponent & IProScene_Btn_shuxing;
		txt_vigor:TextField;
		txt_time:TextField;
		txt_potential:TextField;
		txt_move:TextField;
		btn_mp:TComponent & IProScene_Btn_shuxing;
		btn_hurt:TComponent & IProScene_Btn_shuxing;
		txt_sex:TextField;
		btn_ler:TComponent & IProScene_Btn_shuxing;
		btn_spd:TComponent & IProScene_Btn_shuxing;
		txt_spd:TextField;
		txt_str:TextField;
		txt_att:TextField;
		txt_def:TextField;
		txt_hit:TextField;
		txt_con:TextField;
		txt_ler:TextField;
		txt_per:TextField;
		txt_hurt:TextField;
		txt_dazzle:TextField;
	}

	interface IProScene_Pro_buff{
		txt_title:TextField;
	}

	interface IProScene_Mijing_pro_comp{
		txt_hp:TextField;
		txt_vigor:TextField;
		txt_potential:TextField;
		txt_hunger:TextField;
		txt_agl:TextField;
		txt_mp:TextField;
		txt_level:TextField;
		txt_att:TextField;
		txt_hurt:TextField;
		txt_hit:TextField;
		txt_prot:TextField;
		txt_def:TextField;
		txt_spd:TextField;
	}

}