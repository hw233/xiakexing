#! /bin/python

import os
import sys
import traceback
from ftp_client import FTPClient

def main():
    from optparse import OptionParser
    parser = OptionParser("usage: %prog [options] {remote} {local} ...",description="download file or folder from ftp")
    parser.add_option("--host", dest="host",help="host")
    parser.add_option("--port", default=21, dest="port",help="port")
    parser.add_option("--username", dest="username",help="username")
    parser.add_option("--password", dest="password",help="password")


    (opts, args) = parser.parse_args()

    if len(args) < 2:
        parser.error('invalid number of arguments')

    host = opts.host
    port = opts.port
    username = opts.username
    password = opts.password

    remote = args[0]
    local = args[1]

    print("host",host)
    print("port",port)
    print("remote",remote)
    print("local",local)

    ftpClient = FTPClient()
    ftpClient.connect(host,port,username,password)


    
    if ftpClient.is_dir(remote):
        rs = ftpClient.download_dir(remote,os.path.abspath(local))
        print("download result:%s %s"%(rs[0],rs[1]))
    else:
        rs = ftpClient.download_file(remote,os.path.abspath(local))
        print("download result:%s %s"%(rs[0],rs[1]))


if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        traceback.print_exc()
        sys.exit(1)
