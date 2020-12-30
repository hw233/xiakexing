declare module rf{

	interface ICreatePlayer_Face_select_item{
		select:TComponent & ICreatePlayer_Face_sp_select_item;
	}

	interface ICreatePlayer_Create3{
		_icon:TComponent & ICreatePlayer_Icon;
		btn_random:TComponent & ICreatePlayer_Btn_random;
		btn_chuangjian:TComponent & ICreatePlayer_Btn_xuanze;
		btn_shangyibu:TComponent & ICreatePlayer_Btn_shangyibu;
		shurukuang:TComponent & ICreatePlayer_Shurukuang;
		txt_tips:TextField;
	}

	interface ICreatePlayer_Face_btn_item{
		select:TComponent & ICreatePlayer_Face_select;
		btnName:TextField;
	}

	interface ICreatePlayer_Icon{
	
	}

	interface ICreatePlayer_Create2{
		txt_str_s:TextField;
		txt_dex:TextField;
		btn_shangyibu:TComponent & ICreatePlayer_Btn_shangyibu;
		txt_luck_s:TextField;
		txt_ler_s:TextField;
		txt_luck:TextField;
		txt_per:TextField;
		txt_jianjie:TextField;
		txt_dex_s:TextField;
		txt_desc:TextField;
		txt_age:TextField;
		txt_con_s:TextField;
		txt_per_s:TextField;
		txt_str:TextField;
		txt_con:TextField;
		txt_ler:TextField;
		btn_chuangjian:TComponent & ICreatePlayer_Btn_xuanze;
	}

	interface ICreatePlayer_Create1{
		_icon:TComponent & ICreatePlayer_Icon;
		btn_nv:TComponent & ICreatePlayer_Btn_select_item;
		btn_xuanze:TComponent & ICreatePlayer_Btn_xuanze;
		select:TComponent & ICreatePlayer_Touxiang_select;
		btn_nan:TComponent & ICreatePlayer_Btn_select_item;
	}

	interface ICreatePlayer_Face_select{
	
	}

	interface ICreatePlayer_Btn_shangyibu{
		btnName:TextField;
	}

	interface ICreatePlayer_Shurukuang{
	
	}

	interface ICreatePlayer_Btn_select_item{
		select:TComponent & ICreatePlayer_Xuanze;
		btnName:TextField;
	}

	interface ICreatePlayer_Face_pro_item{
		txt_pro:TextField;
		txt_title:TextField;
	}

	interface ICreatePlayer_Btn_random{
	
	}

	interface ICreatePlayer_Touxiang_select{
	
	}

	interface ICreatePlayer_Face_sp_select_item{
	
	}

	interface ICreatePlayer_Btn_xuanze{
		btnName:TextField;
	}

	interface ICreatePlayer_CreateScene{
	
	}

	interface ICreatePlayer_Xuanze{
	
	}

}