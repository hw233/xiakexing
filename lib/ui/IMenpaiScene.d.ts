declare module rf{

	interface IMenpaiScene_Btn_jiaru{
		btnName:TextField;
	}

	interface IMenpaiScene_Menpai_item{
		txt_name:TextField;
		xuanze:TComponent & IMenpaiScene_Xuanze;
	}

	interface IMenpaiScene_Jiarumenpai{
		btn_jiaru:TComponent & IMenpaiScene_Btn_jiaru;
	}

	interface IMenpaiScene_Xuanze{
	
	}

}