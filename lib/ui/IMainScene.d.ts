declare module rf{

	interface IMainScene_Buff_qianneng{
	
	}

	interface IMainScene_Buff_exp{
	
	}

	interface IMainScene_ProgressBar_mp{
		txt_value:TextField;
	}

	interface IMainScene_Msgcomp{
		btn_close:TComponent & IMainScene_Btn_open;
	}

	interface IMainScene_Btn_setting{
	
	}

	interface IMainScene_ProgressBar_hunger{
		txt_value:TextField;
	}

	interface IMainScene_Gaoliangkuang{
	
	}

	interface IMainScene_Title{
		btn_set:TComponent & IMainScene_Btn_setting;
		time:TComponent & IMainScene_Time;
		btn_return:TComponent & IMainScene_Btn_return;
		txt_statice:TextField;
	}

	interface IMainScene_Btn_tongyong_1{
		btnName:TextField;
	}

	interface IMainScene_Btn_mijing{
		btnName:TextField;
	}

	interface IMainScene_ProgressBar_exp{
		txt_value:TextField;
	}

	interface IMainScene_Top{
	
	}

	interface IMainScene_ProgressBar_hp{
		txt_value:TextField;
	}

	interface IMainScene_Inputcomp{
		btn_status:TComponent & IMainScene_Btn_status;
		btn_fasong:TComponent & IMainScene_Btn_tongyong_1;
		zhuangtai:TComponent & IMainScene_Zhuangtaiselect;
	}

	interface IMainScene_Self_icon{
	
	}

	interface IMainScene_Btn_open{
	
	}

	interface IMainScene_Return_flag{
	
	}

	interface IMainScene_Core{
	
	}

	interface IMainScene_Zhuangtaiselect{
		btn_current:TComponent & IMainScene_Btn_status;
		btn_world:TComponent & IMainScene_Btn_status;
	}

	interface IMainScene_ShieldCheck{
		btn_check4:TComponent & IMainScene_Btn_check;
		btn_check3:TComponent & IMainScene_Btn_check;
		btn_check1:TComponent & IMainScene_Btn_check;
		txt_pro_1:TextField;
		txt_pro_3:TextField;
		btn_check2:TComponent & IMainScene_Btn_check;
		txt_pro_4:TextField;
		txt_pro_2:TextField;
	}

	interface IMainScene_Xuanze{
	
	}

	interface IMainScene_Track{
	
	}

	interface IMainScene_Main_flag{
	
	}

	interface IMainScene_Btn_chengshi{
		btnName:TextField;
	}

	interface IMainScene_Btn_status{
		btnName:TextField;
	}

	interface IMainScene_Btn_renwu{
	
	}

	interface IMainScene_Btn_return{
		main:TComponent & IMainScene_Main_flag;
		return:TComponent & IMainScene_Return_flag;
	}

	interface IMainScene_Btn_beibao{
		btnName:TextField;
	}

	interface IMainScene_Btn_menpai{
		btnName:TextField;
	}

	interface IMainScene_Info_top{
		_icon:TComponent & IMainScene_Self_icon;
		bar_hunger:TComponent & IMainScene_ProgressBar_hunger;
		txt_pro1:TextField;
		txt_age:TextField;
		btn_renwu:TComponent & IMainScene_Btn_tongyong_1;
		btn_gongfa:TComponent & IMainScene_Btn_tongyong_1;
		btn_beibao:TComponent & IMainScene_Btn_beibao;
		txt_potential:TextField;
		txt_pro3:TextField;
		bar_mp:TComponent & IMainScene_ProgressBar_mp;
		btn_liaoshang:TComponent & IMainScene_Btn_tongyong_2;
		track:TComponent & IMainScene_Track;
		btn_store:TComponent & IMainScene_Btn_renwu;
		txt_pro5:TextField;
		btn_dazuo:TComponent & IMainScene_Btn_tongyong_2;
		system:TComponent & IMainScene_System_top_bottom;
		txt_silver:TextField;
		txt_level:TextField;
		bar_vigor:TComponent & IMainScene_ProgressBar_vigor;
		bar_exp:TComponent & IMainScene_ProgressBar_exp;
		txt_pro2:TextField;
		bar_hp:TComponent & IMainScene_ProgressBar_hp;
		txt_pro4:TextField;
		txt_name:TextField;
		btn_shuxing:TComponent & IMainScene_Btn_tongyong_1;
		txt_guild:TextField;
		txt_sex:TextField;
		txt_pro6:TextField;
		txt_master:TextField;
	}

	interface IMainScene_ProgressBar_vigor{
		txt_value:TextField;
	}

	interface IMainScene_Duihao_comp{
	
	}

	interface IMainScene_Main_core_bg{
	
	}

	interface IMainScene_Main_core{
		buff_qianneng:TComponent & IMainScene_Buff_qianneng;
		buff_exp:TComponent & IMainScene_Buff_exp;
		bg:TComponent & IMainScene_Main_core_bg;
		btn_mijing:TComponent & IMainScene_Btn_mijing;
	}

	interface IMainScene_Btn_select{
		xuanze:TComponent & IMainScene_Xuanze;
		btnName:TextField;
	}

	interface IMainScene_Btn_zizhai{
		btnName:TextField;
	}

	interface IMainScene_Btn_tongyong_2{
		btnName:TextField;
	}

	interface IMainScene_MainScene{
		core:TComponent & IMainScene_Core;
		title:TComponent & IMainScene_Title;
		bottom:TComponent & IMainScene_Bottom;
		top:TComponent & IMainScene_Top;
	}

	interface IMainScene_Bottom{
		btn_open:TComponent & IMainScene_Btn_open;
	}

	interface IMainScene_System_top_bottom{
		btn_chengshi:TComponent & IMainScene_Btn_chengshi;
		btn_menpai:TComponent & IMainScene_Btn_menpai;
		btn_zizhai:TComponent & IMainScene_Btn_zizhai;
	}

	interface IMainScene_Time{
		txt_time:TextField;
		txt_title:TextField;
	}

	interface IMainScene_Btn_check{
		xuanze:TComponent & IMainScene_Duihao_comp;
	}

}