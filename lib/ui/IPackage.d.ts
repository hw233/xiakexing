declare module rf{

	interface IPackage_Bar_load{
	
	}

	interface IPackage_LoadingPanel{
		loadpanel:TComponent & IPackage_LoadPanel;
	}

	interface IPackage_LoadPanel{
		tips:TextField;
		bar_load:TComponent & IPackage_Bar_load;
		txt_tips:TextField;
	}

	interface IPackage_Btn_next{
	
	}

	interface IPackage_Btn_tiaoguo{
		btnName:TextField;
	}

	interface IPackage_Xinshoucomp{
		txt_value:TextField;
		btn_tiaoguo:TComponent & IPackage_Btn_tiaoguo;
	}

	interface IPackage_LoginPanel{
		denglucomp:TComponent & IPackage_DengluPanel;
	}

	interface IPackage_Left_name{
		txt_left:TextField;
	}

	interface IPackage_Talk{
		txt_value:TextField;
		left:TComponent & IPackage_Left_name;
		right:TComponent & IPackage_Right_name;
	}

	interface IPackage_Talkcomp{
		btn_next:TComponent & IPackage_Btn_next;
		talk:TComponent & IPackage_Talk;
	}

	interface IPackage_Gundong{
		txt_title:TextField;
	}

	interface IPackage_Guidecomp{
		txt_value:TextField;
	}

	interface IPackage_Current_task{
		txt_title:TextField;
	}

	interface IPackage_Xinshou_daojishi{
		txt_title:TextField;
		txt_time:TextField;
	}

	interface IPackage_Inputbg{
	
	}

	interface IPackage_Prompt_item{
		txt_value:TextField;
	}

	interface IPackage_Denglubtn_denglu{
	
	}

	interface IPackage_Role_assets{
		txt_devote:TextField;
		txt_gold:TextField;
	}

	interface IPackage_Buanch_item{
		txt_value:TextField;
	}

	interface IPackage_DengluPanel{
		denglu:TComponent & IPackage_Denglubtn_denglu;
		txt_version:TextField;
		input_2:TComponent & IPackage_Inputbg;
		zhuce:TComponent & IPackage_Denglubtn_zhuce;
		input_1:TComponent & IPackage_Inputbg;
	}

	interface IPackage_Buff_item{
	
	}

	interface IPackage_Right_name{
		txt_right:TextField;
	}

	interface IPackage_Denglubtn_zhuce{
	
	}

}