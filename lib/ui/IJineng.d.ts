declare module rf{

	interface IJineng_Bar_jingyan{
	
	}

	interface IJineng_Gongfa_item_select{
	
	}

	interface IJineng__status{
		jingshenTxt:TextField;
		baoshidu_jindu:TextField;
		jingshen_jindu:TextField;
		bar_jingshen:TComponent & IJineng_Bar_jingshen;
		baoshiduTxt:TextField;
		bar_baoshidu:TComponent & IJineng_Bar_baoshidu;
	}

	interface IJineng_Dushu_top{
		_status:TComponent & IJineng__status;
	}

	interface IJineng_Liangong_top{
		_status:TComponent & IJineng__status;
	}

	interface IJineng_Dushu_item{
		_icon:TComponent & IJineng_Dushu_icon;
		xuanze:TComponent & IJineng_Xuanze2;
		_btn:TComponent & IJineng_Btn_gongfa;
		bar_dengji:TComponent & IJineng_Bar_dengji;
		txt_dengji:TextField;
		txt_name:TextField;
	}

	interface IJineng_Btn_jiali{
	
	}

	interface IJineng_Xuanze2{
	
	}

	interface IJineng_Gongfa_icon{
	
	}

	interface IJineng_Dushu_icon{
	
	}

	interface IJineng_Liangong_item{
		_icon:TComponent & IJineng_Gongfa_icon;
		xuanze:TComponent & IJineng_Gongfa_item_select;
		_btn:TComponent & IJineng_Btn_gongfa;
		bar_dengji:TComponent & IJineng_Bar_jingyan;
		txt_dengji:TextField;
		txt_jindu:TextField;
		txt_name:TextField;
	}

	interface IJineng_Btn_auto{
	
	}

	interface IJineng_Gongfabtn_select{
	
	}

	interface IJineng_Xuanze{
	
	}

	interface IJineng_Shifu_top{
		txt_qianneng:TextField;
		txt_shifu:TextField;
	}

	interface IJineng_Btn_gongfa{
		select:TComponent & IJineng_Gongfabtn_select;
		btnName:TextField;
	}

	interface IJineng_Btn_jineng{
		xuanze:TComponent & IJineng_Xuanze;
		btnName:TextField;
	}

	interface IJineng_Gongfa_top{
	
	}

	interface IJineng_Gongfa_core{
		btn_auto:TComponent & IJineng_Btn_auto;
		btn_jiali:TComponent & IJineng_Btn_jiali;
	}

	interface IJineng_Bar_jingshen{
	
	}

	interface IJineng_Gongfa_item{
		_icon:TComponent & IJineng_Gongfa_icon;
		txt_name:TextField;
		select:TComponent & IJineng_Gongfa_item_select;
		txt_dengji:TextField;
		txt_shulian:TextField;
	}

	interface IJineng_Bar_dengji{
		txt_value:TextField;
	}

	interface IJineng_Bar_baoshidu{
	
	}

}