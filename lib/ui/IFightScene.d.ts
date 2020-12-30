declare module rf{

	interface IFightScene_Zhandouguochang{
		xijile:TComponent & IFightScene_Xijile;
	}

	interface IFightScene_Title{
		rizhi:TComponent & IFightScene_Rizhi;
	}

	interface IFightScene_Call_comp{
		_icon:TComponent & IFightScene_Call_icon;
		bar_hp:TComponent & IFightScene_ProgressBar_hp_call;
	}

	interface IFightScene_Role_right_comp{
		_icon:TComponent & IFightScene_Role_icon;
		bar_mp:TComponent & IFightScene_ProgressBar_mp;
		_buff:TComponent & IFightScene_Buffcomp;
		bar_hp:TComponent & IFightScene_ProgressBar_hp;
		call_1:TComponent & IFightScene_Call_comp;
		call_2:TComponent & IFightScene_Call_comp;
		_name:TextField;
	}

	interface IFightScene_Btn_auto{
		select:TComponent & IFightScene_Auto_select;
		btnName:TextField;
	}

	interface IFightScene_Role_bottom_comp{
		_icon:TComponent & IFightScene_Role_icon;
		bar_mp:TComponent & IFightScene_ProgressBar_mp;
		_buff:TComponent & IFightScene_Buffcomp;
		bar_hp:TComponent & IFightScene_ProgressBar_hp;
		call_1:TComponent & IFightScene_Call_comp;
		call_2:TComponent & IFightScene_Call_comp;
	}

	interface IFightScene_ProgressBar_hp{
		txt_value:TextField;
	}

	interface IFightScene_Touxaingkuang{
		txt_name:TextField;
	}

	interface IFightScene_ProgressBar_hp_call{
	
	}

	interface IFightScene_FightScene{
		bottom:TComponent & IFightScene_Bottom;
		message:TComponent & IFightScene_Title;
		top:TComponent & IFightScene_Top;
	}

	interface IFightScene_Role_icon{
		select:TComponent & IFightScene_Role_select;
	}

	interface IFightScene_Call_icon{
	
	}

	interface IFightScene_Auto_select{
	
	}

	interface IFightScene_Xijile{
	
	}

	interface IFightScene_Fight_skill_item{
		btnName:TextField;
		btn_skill:TComponent & IFightScene_Btn_skill;
		term:TComponent & IFightScene_Skill_term;
	}

	interface IFightScene_Buffcomp{
	
	}

	interface IFightScene_Btn_skill{
	
	}

	interface IFightScene_Role_left_comp{
		_icon:TComponent & IFightScene_Role_icon;
		bar_mp:TComponent & IFightScene_ProgressBar_mp;
		_buff:TComponent & IFightScene_Buffcomp;
		bar_hp:TComponent & IFightScene_ProgressBar_hp;
		call_1:TComponent & IFightScene_Call_comp;
		call_2:TComponent & IFightScene_Call_comp;
		_name:TextField;
	}

	interface IFightScene_Role_top_comp{
		_icon:TComponent & IFightScene_Role_icon;
		bar_mp:TComponent & IFightScene_ProgressBar_mp;
		_buff:TComponent & IFightScene_Buffcomp;
		bar_hp:TComponent & IFightScene_ProgressBar_hp;
		call_1:TComponent & IFightScene_Call_comp;
		call_2:TComponent & IFightScene_Call_comp;
		_name:TextField;
	}

	interface IFightScene_ProgressBar_mp{
		txt_value:TextField;
	}

	interface IFightScene_Btn_back{
		btnName:TextField;
	}

	interface IFightScene_Rizhi{
	
	}

	interface IFightScene_Btn_liaoshang{
		btnName:TextField;
	}

	interface IFightScene_Top{
		quickcomp:TComponent & IFightScene_Core;
		btn_regain:TComponent & IFightScene_Btn_liaoshang;
		right:TComponent & IFightScene_Role_right_comp;
		btn_auto:TComponent & IFightScene_Btn_auto;
		btn_exit:TComponent & IFightScene_Btn_exit;
		bottom:TComponent & IFightScene_Role_bottom_comp;
		left:TComponent & IFightScene_Role_left_comp;
		top:TComponent & IFightScene_Role_top_comp;
		btn_back:TComponent & IFightScene_Btn_back;
	}

	interface IFightScene_Role_select{
	
	}

	interface IFightScene_Btn_exit{
		btnName:TextField;
	}

	interface IFightScene_Bottom{
	
	}

	interface IFightScene_Skill_term{
	
	}

	interface IFightScene_Core{
	
	}

}