def branch=env.GitBranch
def jobNode = env.jobNode
def creatorBin=env.CreatorBin
def needCleanup = env.NeedCleanup


node(jobNode) {

    stage('Cleanup') { 
        dir('dest'){
            deleteDir()
        }
        dir('temp'){
            deleteDir()
        }
    }
    
   stage('Preparation') { // for display purposes
   
        def extensions=[[
                    $class:'SubmoduleOption',
                    disableSubmodules: false,
                    parentCredentials: true,
                    recursiveSubmodules: true,
                    reference: ''
                ],
                [$class: 'LocalBranch', localBranch:branch]
                ]
                
        if(needCleanup=='true'){
            extensions[2]=[$class:'CleanBeforeCheckout']
        }
   
        checkout([
            $class:'GitSCM',
            userRemoteConfigs:[
                [url:'git@yfgitlab.corp.sdo.com:melon/fishing/fishing_client.git',credentialsId:'b1e613f1-3678-4c67-b4ee-3c9e5d3279c0']
            ],
            branches:[[name:branch]],
            extensions:extensions
        ])

   }
   

    stage('Publish'){
        
//bat script: "docker run -v ${env.WORKSPACE}:/project -w /project mingc/android-build-box:creator bash -c \"npm install typescript -g --registry https://maven.corp.sdo.com/repository/npm-group/\" && tsc"

        //bat script:"tsc --watch false"
        // bat script:"melon u"
        bat script:"melon -r -mini"

        zip dir: 'bin-release', glob: '', zipFile: "temp/${env.JOB_BASE_NAME}-${env.BUILD_NUMBER}.zip"

    }
        

    stage('Results') {
        echo 'Results stage'
        withCredentials([usernamePassword(credentialsId: '460faae3-08e3-489b-b66f-48ddb2a18a7d', passwordVariable: 'ftp_password', usernameVariable: 'ftp_user')]) {
            def localPath="temp/${env.JOB_BASE_NAME}-${env.BUILD_NUMBER}.zip"
            def remotePath = "archero3d-server/${env.JOB_BASE_NAME}-${env.BUILD_NUMBER}"
            bat "python Jenkins/ftp/ftp_upload.py --host=ftp.corp.sdo.com --username=${ftp_user} --password=${ftp_password} ${localPath} ${remotePath}"
        }
   }
}
