declare module rf{

	interface IPopup_Btn_task{
		btnName:TextField;
		xuanze:TComponent & IPopup_Xuanzekuang;
	}

	interface IPopup_Crop_zhaoliao_popup{
		txt_pro_2:TextField;
		txt_pro_4:TextField;
		txt_num:TextField;
		txt_tips_3:TextField;
		btn_zhaoliao:TComponent & IPopup_Btn_tongyong_da_lv;
		txt_tips_1:TextField;
		txt_time_2:TextField;
		txt_tips_2:TextField;
		txt_time_1:TextField;
		txt_pro_1:TextField;
		txt_title:TextField;
		txt_pro_3:TextField;
		txt_name:TextField;
		btn_quxiao:TComponent & IPopup_Btn_tongyong_da_hong;
	}

	interface IPopup_Wenzi_title_select_popup{
		txt_title:TextField;
		btn_queding:TComponent & IPopup_Btn_tongyong_xiao_lv;
		txt_value:TextField;
		btn_quxiao:TComponent & IPopup_Btn_tongyong_xiao_hong;
	}

	interface IPopup_Bar_baoshidu{
	
	}

	interface IPopup_Btn_tongyong_da_lv{
		btnName:TextField;
	}

	interface IPopup_Qingbao_popup{
		txt_title:TextField;
	}

	interface IPopup_Jineng_select{
	
	}

	interface IPopup_Fuzhou_quxiao_popup{
		txt_time:TextField;
		txt_pro_3:TextField;
		txt_name:TextField;
		txt_num:TextField;
		txt_pro_1:TextField;
		txt_title:TextField;
		txt_pro_2:TextField;
		txt_tips:TextField;
		btn_quxiao:TComponent & IPopup_Btn_tongyong_da_lan;
	}

	interface IPopup_Cook_select_item{
		_icon:TComponent & IPopup_Item_icon;
		txt_term:TextField;
		select_comp:TComponent & IPopup_Select_comp;
		txt_shichang:TextField;
		txt_count:TextField;
		txt_title:TextField;
		txt_pro_2:TextField;
		btn_zhizuo:TComponent & IPopup_Btn_tongyong_xiao_lv;
		txt_shuliang:TextField;
		txt_pro_1:TextField;
	}

	interface IPopup_Btn_left{
	
	}

	interface IPopup_Btn_track{
	
	}

	interface IPopup_Btn_gantanhao{
	
	}

	interface IPopup_Item_look_popup{
		_icon:TComponent & IPopup_Item_icon;
		silver:TComponent & IPopup_Item_silver;
		txt_count:TextField;
		txt_name:TextField;
		txt_price:TextField;
		txt_flag:TextField;
		txt_desc:TextField;
	}

	interface IPopup_Bar_skill_level{
	
	}

	interface IPopup_Btn_tongyong_da_hong{
		btnName:TextField;
	}

	interface IPopup_Wenzi_title_btn_popup{
		btn_tongyong:TComponent & IPopup_Btn_tongyong_da_lan;
		txt_title:TextField;
		txt_value:TextField;
	}

	interface IPopup_Killer_info_popup{
		txt_title_1:TextField;
		txt_title_2:TextField;
		zhuangbei:TComponent & IPopup_Role_info;
	}

	interface IPopup_Wenzi_title_popup{
		txt_title:TextField;
		txt_value:TextField;
	}

	interface IPopup_Inquire_popup{
		btn_queding:TComponent & IPopup_Btn_tongyong_xiao_lv;
		txt_value:TextField;
		txt_title:TextField;
		txt_term:TextField;
		btn_gantanhao:TComponent & IPopup_Btn_gantanhao;
		btn_quxiao:TComponent & IPopup_Btn_tongyong_xiao_hong;
	}

	interface IPopup_Jineng_btn_item{
		btnName:TextField;
	}

	interface IPopup_Self_icon{
	
	}

	interface IPopup_Room_upgrade_popup{
		txt_value_2:TextField;
		txt_pro_1:TextField;
		txt_time:TextField;
		txt_title:TextField;
		txt_pro_2:TextField;
		txt_value_1:TextField;
		btn_upgrade:TComponent & IPopup_Btn_tongyong_da_huang;
	}

	interface IPopup_Crop_cook_fuzhou_select_popup{
	
	}

	interface IPopup_Fuzhou_select_item{
		_icon:TComponent & IPopup_Item_icon;
		txt_title:TextField;
		txt_pro_2:TextField;
		txt_shichang:TextField;
		txt_xiaohao:TextField;
		txt_shuliang:TextField;
		txt_count:TextField;
		txt_pro_1:TextField;
		txt_yaoqiu:TextField;
		txt_pro_3:TextField;
		btn_zhizuo:TComponent & IPopup_Btn_tongyong_xiao_lv;
		select_comp:TComponent & IPopup_Select_comp;
	}

	interface IPopup_Xuanshang_item{
		wancheng:TComponent & IPopup_Wancheng;
		txt_nandu:TextField;
		txt_name:TextField;
		jiequ:TComponent & IPopup_Xuanze;
		txt_jiequ:TextField;
	}

	interface IPopup_Xinshou_yanyi_popup{
		txt_title:TextField;
		bar_hunger:TComponent & IPopup_Bar_baoshidu;
	}

	interface IPopup_Bar_huang{
	
	}

	interface IPopup_Task_item{
		xuanze:TComponent & IPopup_Xuanze;
		txt_zhuizong:TextField;
		txt_renwujiangli:TextField;
		txt_name:TextField;
		btn_track:TComponent & IPopup_Btn_track;
		txt_desc:TextField;
	}

	interface IPopup_Xuanshang_top{
		btn_wancheng:TComponent & IPopup_Btn_tongyong_xiao_lv;
		btn_fangqi:TComponent & IPopup_Btn_tongyong_xiao_hong;
		btn_jiequ:TComponent & IPopup_Btn_tongyong_xiao_lv;
		txt_name:TextField;
		txt_jiangli:TextField;
		txt_desc:TextField;
		btn_shuaxin:TComponent & IPopup_Btn_tongyong_xiao_huang;
	}

	interface IPopup_Xuanze{
	
	}

	interface IPopup_Btn_zhuangtai_tongyong{
		select:TComponent & IPopup_Jineng_select;
		btnName:TextField;
	}

	interface IPopup_Liangong_yuji_popup{
		txt_t2:TextField;
		txt_t31:TextField;
		txt_t21:TextField;
		bar_vigor:TComponent & IPopup_Bar_huang;
		bar_level:TComponent & IPopup_Bar_skill_level;
		txt_t1:TextField;
		txt_title:TextField;
		txt_t3:TextField;
		btn_left:TComponent & IPopup_Btn_tongyong_da_lan;
		btn_right:TComponent & IPopup_Btn_zhuangtai_tongyong;
	}

	interface IPopup_Jineng_xiangqing_default{
		txt_desc:TextField;
		txt_xiangqing:TextField;
		txt_title:TextField;
		txt_term:TextField;
		txt_tiaojian:TextField;
		txt_mubiao:TextField;
	}

	interface IPopup_Setting_popup{
		btn_bgm:TComponent & IPopup_Btn_setting_audio;
		txt_title:TextField;
		btn_effect:TComponent & IPopup_Btn_setting_audio;
		btn_exit:TComponent & IPopup_Btn_setting_audio;
	}

	interface IPopup_Btn_right{
	
	}

	interface IPopup_Crop_select_item{
		_icon:TComponent & IPopup_Item_icon;
		txt_time:TextField;
		txt_pro_3:TextField;
		txt_num:TextField;
		txt_pro_1:TextField;
		txt_count:TextField;
		txt_title:TextField;
		txt_pro_2:TextField;
		txt_name:TextField;
		btn_zhongzhi:TComponent & IPopup_Btn_tongyong_xiao_lv;
	}

	interface IPopup_Btn_max{
	
	}

	interface IPopup_Fail_comp_popup{
		txt_time:TextField;
		_icon:TComponent & IPopup_Self_icon;
		btn_info:TComponent & IPopup_Btn_tongyong_xiao_lv;
		txt_title:TextField;
		txt_name:TextField;
		jiesuan:TComponent & IPopup_Jiesuancomp;
	}

	interface IPopup_Jineng_auto_popup{
		txt_auto:TextField;
		txt_title:TextField;
		txt_current:TextField;
		txt_desc:TextField;
	}

	interface IPopup_Tongyong_yuji_popup{
		txt_t4_1:TextField;
		txt_t6_2:TextField;
		txt_t1_2:TextField;
		txt_t3_1:TextField;
		txt_t5_2:TextField;
		txt_t4_2:TextField;
		txt_t6_1:TextField;
		txt_t2_1:TextField;
		txt_t2_2:TextField;
		txt_t3_2:TextField;
		txt_t1_1:TextField;
		txt_title:TextField;
		txt_tips:TextField;
		txt_t5_1:TextField;
		_btn:TComponent & IPopup_Btn_zhuangtai_tongyong;
	}

	interface IPopup_Setting_audio_select{
	
	}

	interface IPopup_Gongfa_jineng_popup{
		txt_zuhe:TextField;
		txt_zhudong:TextField;
		txt_xiangqing:TextField;
		txt_title:TextField;
		txt_beidong:TextField;
		txt_desc:TextField;
	}

	interface IPopup_Reward{
	
	}

	interface IPopup_Dushu_yuji_popup{
		txt_t2:TextField;
		txt_t31:TextField;
		txt_t21:TextField;
		bar_vigor:TComponent & IPopup_Bar_huang;
		bar_level:TComponent & IPopup_Bar_skill_level;
		txt_t1:TextField;
		txt_title:TextField;
		txt_t3:TextField;
		btn_left:TComponent & IPopup_Btn_tongyong_da_lan;
		btn_right:TComponent & IPopup_Btn_zhuangtai_tongyong;
	}

	interface IPopup_Reward_daoju_item{
		_icon:TComponent & IPopup_Item_icon;
		txt_count:TextField;
		txt_name:TextField;
	}

	interface IPopup_Delete_item_select_popup{
		_icon:TComponent & IPopup_Item_icon;
		txt_name:TextField;
		txt_count:TextField;
		txt_title:TextField;
		btn_queding:TComponent & IPopup_Btn_tongyong_xiao_lv;
		txt_tips:TextField;
		btn_quxiao:TComponent & IPopup_Btn_tongyong_xiao_hong;
	}

	interface IPopup_Task_popup{
	
	}

	interface IPopup_Jiesuancomp{
		txt_potential:TextField;
		txt_title:TextField;
		btn_queding:TComponent & IPopup_Btn_tongyong_da_lv;
		txt_exp:TextField;
		txt_devote:TextField;
	}

	interface IPopup_Wancheng{
	
	}

	interface IPopup_Btn_event_item{
		btnName:TextField;
	}

	interface IPopup_Bar_hong{
	
	}

	interface IPopup_Btn_tongyong_xiao_lv{
		btnName:TextField;
	}

	interface IPopup_Success_comp_popup{
		txt_time:TextField;
		jiesuan:TComponent & IPopup_Jiesuancomp;
	}

	interface IPopup_Btn_setting_audio{
		select:TComponent & IPopup_Setting_audio_select;
	}

	interface IPopup_Jineng_xiangqing_btn{
		txt_xiangqing:TextField;
		txt_title:TextField;
		_btn:TComponent & IPopup_Btn_tongyong_da_lan;
		txt_mubiao:TextField;
		txt_desc:TextField;
	}

	interface IPopup_Xuanzekuang{
	
	}

	interface IPopup_Event_selece_popup{
		txt_title:TextField;
		txt_value:TextField;
		txt_level:TextField;
	}

	interface IPopup_Deal_select_1_popup{
		_icon:TComponent & IPopup_Item_icon;
		txt_base:TextField;
		txt_price:TextField;
		txt_level:TextField;
		txt_desc:TextField;
		txt_count:TextField;
		silver:TComponent & IPopup_Item_silver;
		txt_naijiu:TextField;
		txt_shuxing:TextField;
		btn_queding:TComponent & IPopup_Btn_tongyong_da_lan;
		txt_name:TextField;
		txt_flag:TextField;
		txt_effect:TextField;
	}

	interface IPopup_Open_popup{
		txt_title:TextField;
		bar:TComponent & IPopup_Bar_hong;
		txt_tips:TextField;
		btn_do:TComponent & IPopup_Btn_tongyong_da_lv;
		txt_value:TextField;
	}

	interface IPopup_Event_desc_popup{
		txt_title:TextField;
		txt_value:TextField;
		txt_level:TextField;
	}

	interface IPopup_Select_jineng_item{
		btnName:TextField;
	}

	interface IPopup_Equipage_slot{
	
	}

	interface IPopup_Bar_book{
	
	}

	interface IPopup_Shuijiao_popup{
		txt_vigor:TextField;
		txt_vigor_desc:TextField;
		bar_vigor:TComponent & IPopup_Bar_hong;
		txt_title:TextField;
		txt_tips:TextField;
		_btn:TComponent & IPopup_Btn_zhuangtai_tongyong;
	}

	interface IPopup_Btn_tongyong_da_huang{
		btnName:TextField;
	}

	interface IPopup_Xuexi_jineng_popup{
		txt_zuhe:TextField;
		txt_left:TextField;
		btn_right:TComponent & IPopup_Btn_tongyong_da_lv;
		txt_zhudong:TextField;
		txt_xiangqing:TextField;
		txt_title:TextField;
		txt_right:TextField;
		txt_qianneng:TextField;
		txt_beidong:TextField;
		btn_left:TComponent & IPopup_Btn_tongyong_da_lan;
		txt_desc:TextField;
	}

	interface IPopup_Skill_xiangqing_popup{
		txt_zuhe:TextField;
		txt_status:TextField;
		txt_zhudong:TextField;
		txt_xiangqing:TextField;
		txt_title:TextField;
		txt_beidong:TextField;
		txt_desc:TextField;
		_btn:TComponent & IPopup_Btn_zhuangtai_tongyong;
	}

	interface IPopup_Wakuang_popup{
		txt_times:TextField;
		txt_title:TextField;
		bar:TComponent & IPopup_Bar_hong;
		btn_do:TComponent & IPopup_Btn_tongyong_da_lv;
		txt_value:TextField;
	}

	interface IPopup_Timeout_comp_popup{
		txt_time:TextField;
		txt_title:TextField;
		txt_tips:TextField;
		jiesuan:TComponent & IPopup_Jiesuancomp;
	}

	interface IPopup_Btn_tongyong_da_lan{
		btnName:TextField;
	}

	interface IPopup_Btn_close{
	
	}

	interface IPopup_Task_lingjiang_popup{
		txt_reward:TextField;
		txt_title:TextField;
		reward:TComponent & IPopup_Reward;
		txt_name:TextField;
	}

	interface IPopup_Role_info{
		100:TComponent & IPopup_Equipage_slot;
		101:TComponent & IPopup_Equipage_slot;
		102:TComponent & IPopup_Equipage_slot;
		103:TComponent & IPopup_Equipage_slot;
		104:TComponent & IPopup_Equipage_slot;
		105:TComponent & IPopup_Equipage_slot;
		106:TComponent & IPopup_Equipage_slot;
		107:TComponent & IPopup_Equipage_slot;
		108:TComponent & IPopup_Equipage_slot;
		109:TComponent & IPopup_Equipage_slot;
	}

	interface IPopup_Xuanzeshuliang_max_popup{
		btn_tongyong:TComponent & IPopup_Btn_tongyong_xiao_lv;
		txt_title:TextField;
		select_comp:TComponent & IPopup_Select_comp;
	}

	interface IPopup_Deal_select_2_popup{
		_icon:TComponent & IPopup_Item_icon;
		silver:TComponent & IPopup_Item_silver;
		txt_naijiu:TextField;
		txt_desc:TextField;
		select_comp:TComponent & IPopup_Select_comp;
		txt_count:TextField;
		btn_queding:TComponent & IPopup_Btn_tongyong_da_lan;
		txt_name:TextField;
		txt_price:TextField;
		txt_flag:TextField;
		txt_effect:TextField;
	}

	interface IPopup_Cook_quxiao_popup{
		txt_time:TextField;
		txt_pro_3:TextField;
		txt_name:TextField;
		txt_num:TextField;
		txt_pro_1:TextField;
		txt_title:TextField;
		txt_pro_2:TextField;
		txt_tips:TextField;
		btn_quxiao:TComponent & IPopup_Btn_tongyong_da_lan;
	}

	interface IPopup_Auto_jieng_select{
	
	}

	interface IPopup_Term_item{
		txt_value:TextField;
	}

	interface IPopup_Book_item_select{
	
	}

	interface IPopup_Btn_tongyong_xiao_huang{
		btnName:TextField;
	}

	interface IPopup_Task_jieshou_popup{
		txt_reward:TextField;
		txt_title:TextField;
		reward:TComponent & IPopup_Reward;
		txt_name:TextField;
		txt_desc:TextField;
	}

	interface IPopup_Qingbao_item{
		txt_name:TextField;
		btn_track:TComponent & IPopup_Btn_track;
		xuanze:TComponent & IPopup_Xuanze;
		txt_desc:TextField;
	}

	interface IPopup_Item_silver{
	
	}

	interface IPopup_Gongfa_item{
		txt_shulian:TextField;
		txt_name:TextField;
		txt_dengji:TextField;
	}

	interface IPopup_Zhuangbei_xiangqing_popup{
		_icon:TComponent & IPopup_Item_icon;
		btn_right:TComponent & IPopup_Btn_tongyong_da_lan;
		txt_base:TextField;
		txt_price:TextField;
		txt_level:TextField;
		txt_desc:TextField;
		txt_count:TextField;
		silver:TComponent & IPopup_Item_silver;
		btn_left:TComponent & IPopup_Btn_tongyong_da_lv;
		txt_naijiu:TextField;
		txt_shuxing:TextField;
		txt_name:TextField;
		txt_flag:TextField;
		txt_effect:TextField;
	}

	interface IPopup_Deal_select_3_popup{
		_icon:TComponent & IPopup_Item_icon;
		silver:TComponent & IPopup_Item_silver;
		select_comp:TComponent & IPopup_Select_comp;
		txt_count:TextField;
		btn_queding:TComponent & IPopup_Btn_tongyong_da_lan;
		txt_name:TextField;
		txt_price:TextField;
		txt_flag:TextField;
		txt_desc:TextField;
	}

	interface IPopup_Item_icon{
	
	}

	interface IPopup_Jineng_xiangqing_zuhe{
		txt_xiangqing:TextField;
		txt_title:TextField;
		txt_tiaojian:TextField;
		txt_mubiao:TextField;
		txt_desc:TextField;
	}

	interface IPopup_Book_select_item{
		_icon:TComponent & IPopup_Item_icon;
		bar_bg:TComponent & IPopup_Bar_book;
		txt_naijiu:TextField;
		xuanze:TComponent & IPopup_Book_item_select;
		txt_name:TextField;
		txt_desc:TextField;
	}

	interface IPopup_Showitem_popup{
		txt_title:TextField;
		reward:TComponent & IPopup_Reward;
	}

	interface IPopup_Btn_tongyong_xiao_hong{
		btnName:TextField;
	}

	interface IPopup_Select_comp{
		btn_left:TComponent & IPopup_Btn_left;
		txt_num:TextField;
		btn_right:TComponent & IPopup_Btn_right;
		btn_max:TComponent & IPopup_Btn_max;
	}

	interface IPopup_Auto_jieng_item{
		select:TComponent & IPopup_Auto_jieng_select;
		btnName:TextField;
	}

}