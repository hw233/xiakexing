#! /bin/python

import os
import sys
from ftplib import FTP


def format_path(path):
    if path is None or path == "." or path == "/" or path == "//":
        path = ""

    if path == "":
        return path

    while path.find("\\") >= 0:
        path = path.replace("\\", "/")
    while path.find("//") >= 0:
        path = path.replace("//", "/")

    # print("new path is " + path)
    return path


class FTPClient(object):

    def __init__(self):
        self.ftp = FTP()

    def connect(self,host,port,user,passwd):
        try:
            self.ftp.connect(host=host, port=port, timeout=10)
            self.login(user,passwd)
        except Exception as error:
            raise error

    def login(self,user,passwd):
        self.ftp.user   = user
        self.ftp.passwd = passwd
        self.ftp.login(user=user, passwd=passwd)
        self.remoteOriginPath               = self.ftp.pwd()
        print(self.ftp.getwelcome())

    def _makeRemotePath(self,dir):
        self.ftp.cwd('/')
        dir.strip('/')
        dir_items = dir.split('/')
        for item in dir_items:
            try:
                self.ftp.cwd(item)
            except:
                self.ftp.mkd(item)
                self.ftp.cwd(item)

    def _makeLocalPath(self,dir):
        if not os.path.isdir(dir):
            os.makedirs(dir)

    def is_dir(self,remote_path):
        try:
            self.ftp.cwd(remote_path)
            self.ftp.cwd("..")
            return True
        except:
            return False


    def download_file(self,remote_file,local_dir):
        bufsize = 1024
        file_name = os.path.basename(remote_file)
        try:
            self._makeLocalPath(local_dir)
            fp = open(os.path.join(local_dir,file_name),"wb")
            self.ftp.retrbinary('RETR '+remote_file,fp.write,bufsize)
            fp.close()
            return [1,"download successed: %s "%remote_file]
        except Exception as e:
            return [-1,"download failed: %s reason:%s"%(remote_file,e)]


    def download_dir(self,remote_dir,local_dir):
        result = [1,""]

        remote_path = format_path(os.path.join(self.remoteOriginPath,remote_dir))
        #print("=>remote_path:",remote_path)
        self.ftp.cwd(remote_path)

        cur_remote = self.ftp.pwd()
        remotenames = self.ftp.nlst()
        files = []
        folders = []

        for remote_file in remotenames:
            if self.is_dir(remote_file):
                folders.append(remote_file)
            else:
                files.append(remote_file)

        try:
            for f in files:
                rs = self.download_file(f,local_dir)
                if rs[0] == -1 :
                    result[0] = -1
                result[1] = result[1] + "\n" + rs[1]

            for folder in folders:
                remoteFolderPath = format_path(os.path.join(cur_remote,folder))
                rs = self.download_dir(remoteFolderPath,os.path.join(local_dir,folder))
                if rs[0] == -1 :
                    result[0] = -1
                result[1] = result[1] + "\n" + rs[1]
        except Exception as e:
            result = [-1,"download_dir fail, reason:%s"%e]

        return result

    
    def upload_file(self,local_file,remote_dir):
        bufsize = 262144
        file_name = os.path.basename(local_file)
        try:
            self._makeRemotePath(remote_dir)

            fp = open(local_file, 'rb')
            self.ftp.storbinary('STOR '+file_name, fp,bufsize)
            fp.close()
            return [1,"upload successed: %s "%file_name]
        except Exception as e:
            return [-1,"upload failed: remote:%s reason:%s"%(remote_dir,e)]



    def upload_dir(self,local_dir,remote_dir):
        result = [1,""]

        try:
            self._makeRemotePath(format_path(os.path.join(self.remoteOriginPath,remote_dir)))

            for parent,dirs,files in os.walk(local_dir):
                for filename in files:
                    localAbsPath = os.path.join(parent,filename)
                    remoteAbsPath = format_path(os.path.join(self.remoteOriginPath,remote_dir))
                    print("local:%s remote:%s"%(localAbsPath,remoteAbsPath))
                    rs = self.upload_file(localAbsPath,remoteAbsPath)
                    if rs[0] == -1:
                        result[0]=-1
                    result[1] = result[1] + "\n" + rs[1]


                for dirName in dirs:
                    rrd = format_path(os.path.join(remote_dir,dirName))
                    lad = os.path.join(local_dir,dirName)
                    print("rrd:%s lad:%s"%(rrd,lad))
                    rs = self.upload_dir(lad,rrd)
                    if rs[0] == -1:
                        result[0] = -1
                    result[1] = result[1] + "\n" + rs[1]

                break
        except Exception as e:
            result = [-1,"upload fail, reason:%s"%e]

        return result



if __name__ == '__main__':
    client = FTPClient()
    client.connect("172.30.10.21",21,"duanhongbo.will","Asdf`123")
    rs = client.download_dir("sdk",os.path.join(os.getcwd(),"sdk"))
    #client.upload_file("xxx3.txt","sdk/")
    #rs = client.upload_dir("temp","temp")
    print(rs[1])

