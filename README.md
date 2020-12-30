# ES5版本 

git config --global credential.helper store
永久记住账号密码


#实时编译
    终端中输入 tsc 进行实时编译。

    [3:30:14 PM] File change detected. Starting incremental compilation...
    [3:30:14 PM] Found 0 errors. Watching for file changes.

    出现这段提示 表示编译成功


#Melon 编译器
    melon u         更新 stage3d 渲染引擎

    melon           编译 index.html 文件 (添加新ts文件的时候 执行一次)

    melon r -mini   编译release版本

    melon p         将release版本发布到远程文件夹 需要在tsconfig中配置 clientremote 信息