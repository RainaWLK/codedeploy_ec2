let AWS = require('aws-sdk');
var codedeploy = new AWS.CodeDeploy({
  region: 'us-west-1'
});


function getDeploymentGroup(appName, deploymentGroupName){
  let params = {
    applicationName: appName,
    deploymentGroupName: deploymentGroupName
  };

  return codedeploy.getDeploymentGroup(params).promise();
};

async function runDeploy(appName, deploymentGroupName, targetRevision){

  let params = {
    applicationName: appName,
    deploymentGroupName: deploymentGroupName,
    revision: targetRevision,
    updateOutdatedInstancesOnly: true
  }

  try {
    let result = await codedeploy.createDeployment(params).promise();
    console.log(result);
  }
  catch(err) {
    console.error(err);
  }

}

async function main(){
  let deployInfo = await getDeploymentGroup('ThingsPro_CS', 'dev');
  console.log(deployInfo);

  console.log(deployInfo.deploymentGroupInfo.targetRevision);
  let target = deployInfo.deploymentGroupInfo.targetRevision;
  console.log(target);

  await runDeploy('ThingsPro_CS', 'dev', target);
}



main();
