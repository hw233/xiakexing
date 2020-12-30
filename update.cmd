svn update ../dev/
svn update ../conf/
svn update ../com/
svn update ../res/

xcopy ..\dev\lib\es5\* lib\es5\ /s /e /h /r /k /y /d
xcopy ..\dev\lib\ui\* lib\ui\ /s /e /h /r /k /y /d

xcopy ..\dev\lib\client2Server.d.ts lib\ /s /e /h /r /k /y /d
xcopy ..\dev\lib\Server2Client.d.ts lib\ /s /e /h /r /k /y /d
xcopy ..\dev\lib\serverClientProtocol.d.ts lib\ /s /e /h /r /k /y /d
xcopy ..\dev\lib\res.d.ts lib\ /s /e /h /r /k /y /d
xcopy ..\dev\lib\global.d.ts lib\ /s /e /h /r /k /y /d
@REM melon u