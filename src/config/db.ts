export const dbUri =
  // tslint:disable-next-line:max-line-length
  'mongodb://dbuser:JXjfOXNAFDj8mXSy@ng-dash-cluster-shard-00-00-a0jck.gcp.mongodb.net:27017,ng-dash-cluster-shard-00-01-a0jck.gcp.mongodb.net:27017,ng-dash-cluster-shard-00-02-a0jck.gcp.mongodb.net:27017/test?ssl=true&replicaSet=NG-DASH-CLUSTER-shard-0&authSource=admin&retryWrites=true';

export const connectionOptions = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
};
