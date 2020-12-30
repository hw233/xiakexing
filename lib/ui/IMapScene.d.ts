declare module rf{

	interface IMapScene_Map_guide_jiantou{
	
	}

	interface IMapScene_Map_btn_element{
		room_bg:TComponent & IMapScene_Room_type_bg;
		light:TComponent & IMapScene_Element_light;
		current:TComponent & IMapScene_Element_current_da;
		btnName:TextField;
		jiantou:TComponent & IMapScene_Map_guide_jiantou;
	}

	interface IMapScene_Btn_tongyong_2{
		btnName:TextField;
	}

	interface IMapScene_Exit_point{
	
	}

	interface IMapScene_Map_show_comp{
		map:TComponent & IMapScene_Map;
		btn_close:TComponent & IMapScene_Btn_tongyong_1;
		track:TComponent & IMapScene_Track;
		btn_qingbao:TComponent & IMapScene_Map_btn_qingbao;
	}

	interface IMapScene_Map_top_mijing{
		map:TComponent & IMapScene_Map_mijing;
		btn_map:TComponent & IMapScene_Btn_tongyong_1;
		btn_renwu:TComponent & IMapScene_Btn_tongyong_1;
		role:TComponent & IMapScene_Mijing_self_comp;
		btn_zhuangtai:TComponent & IMapScene_Btn_zhuangtai;
		track:TComponent & IMapScene_Track;
		zhuangtai:TComponent & IMapScene_Zhuangtai_bg;
	}

	interface IMapScene_ProgressBar_room{
	
	}

	interface IMapScene_Map_element_item{
		btn_element:TComponent & IMapScene_Btn_element;
		hunmi:TComponent & IMapScene_Hunmi_status;
	}

	interface IMapScene_Track{
	
	}

	interface IMapScene_Touxing_bg{
	
	}

	interface IMapScene_Map{
	
	}

	interface IMapScene_Btn_dingwei{
	
	}

	interface IMapScene_Element_type_bg{
	
	}

	interface IMapScene_Map_status_item{
	
	}

	interface IMapScene_Role_icon{
	
	}

	interface IMapScene_Map_road_h{
	
	}

	interface IMapScene_Element_current_da{
	
	}

	interface IMapScene_Btn_zhuangtai{
		btnName:TextField;
	}

	interface IMapScene_Zhuangtai_bg{
	
	}

	interface IMapScene_Match_bottom{
		tips:TextField;
		txt_tips:TextField;
	}

	interface IMapScene_Map_direction{
	
	}

	interface IMapScene_Select_left{
	
	}

	interface IMapScene_ProgressBar_mp{
		txt_value:TextField;
	}

	interface IMapScene_Map_mijing{
		btn_dingwei:TComponent & IMapScene_Btn_dingwei;
		guide:TComponent & IMapScene_Map_direction;
	}

	interface IMapScene_Mijing_tool_item{
		txt_num:TextField;
	}

	interface IMapScene_ProgressBar_hp{
		txt_value:TextField;
	}

	interface IMapScene_Mijing_self_comp{
		_icon:TComponent & IMapScene_Role_icon;
		btn_liaoshang:TComponent & IMapScene_Btn_tongyong_2;
		bar_vigor:TComponent & IMapScene_ProgressBar_vigor;
		btn_dazuo:TComponent & IMapScene_Btn_tongyong_2;
		bar_hp:TComponent & IMapScene_ProgressBar_hp;
		bar_mp:TComponent & IMapScene_ProgressBar_mp;
		btn_beibao:TComponent & IMapScene_Btn_tongyong_2;
	}

	interface IMapScene_Shuxiang_chang{
		select:TComponent & IMapScene_Select_left;
		btnName:TextField;
	}

	interface IMapScene_Btn_mijing{
		txt_term:TextField;
		txt_name:TextField;
	}

	interface IMapScene_Map_core{
	
	}

	interface IMapScene_Mijing_touxiang{
		btn_gongfa:TComponent & IMapScene_Gongfa_chang;
		bg:TComponent & IMapScene_Touxing_bg;
		btn_shuxiang:TComponent & IMapScene_Shuxiang_chang;
	}

	interface IMapScene_Element_light{
	
	}

	interface IMapScene_Quick_item{
		txt_num:TextField;
	}

	interface IMapScene_Mijing_role_comp{
	
	}

	interface IMapScene_Map_progress_item{
		_icon:TComponent & IMapScene_Room_type_bg;
		bar_room:TComponent & IMapScene_ProgressBar_room;
	}

	interface IMapScene_ProgressBar_vigor{
		txt_value:TextField;
	}

	interface IMapScene_Btn_beibao_close{
	
	}

	interface IMapScene_Mijing_btn_top{
	
	}

	interface IMapScene_Gongfa_chang{
		select:TComponent & IMapScene_Select_right;
		btnName:TextField;
	}

	interface IMapScene_Mijing_btn_core{
		btn_gongfa:TComponent & IMapScene_Btn_tongyong_2;
		btn_shuxing:TComponent & IMapScene_Btn_tongyong_2;
		btn_beibao:TComponent & IMapScene_Btn_tongyong_2;
	}

	interface IMapScene_Hunmi_status{
	
	}

	interface IMapScene_Map_btn_qingbao{
	
	}

	interface IMapScene_Mijing_match_comp{
		txt_time:TextField;
		txt_name:TextField;
		txt_role:TextField;
		btn_return:TComponent & IMapScene_Btn_tongyong_2;
		txt_title:TextField;
		bottom:TComponent & IMapScene_Match_bottom;
		txt_desc:TextField;
	}

	interface IMapScene_Map_road_v{
	
	}

	interface IMapScene_Map_top_city{
		map:TComponent & IMapScene_Map;
		btn_map:TComponent & IMapScene_Btn_tongyong_1;
		btn_renwu:TComponent & IMapScene_Btn_tongyong_1;
		track:TComponent & IMapScene_Track;
		btn_upgrade:TComponent & IMapScene_Btn_tongyong_1;
	}

	interface IMapScene_Mijing_btn_item{
		btn_mijing:TComponent & IMapScene_Btn_mijing;
	}

	interface IMapScene_Mijing_role_item{
	
	}

	interface IMapScene_Btn_select_zhuangtai{
		btnName:TextField;
	}

	interface IMapScene_Mijing_beibao{
		btn_jiantou:TComponent & IMapScene_Btn_beibao_close;
	}

	interface IMapScene_Map_show_element{
		room_bg:TComponent & IMapScene_Room_type_bg;
		light:TComponent & IMapScene_Element_light;
		current:TComponent & IMapScene_Element_current_xiao;
		exit:TComponent & IMapScene_Exit_point;
		btnName:TextField;
	}

	interface IMapScene_Element_current_xiao{
	
	}

	interface IMapScene_Btn_tongyong_1{
		btnName:TextField;
	}

	interface IMapScene_Room_type_bg{
	
	}

	interface IMapScene_Select_right{
	
	}

	interface IMapScene_Btn_element{
		element_flag:TComponent & IMapScene_Element_type_bg;
		btnName:TextField;
	}

}