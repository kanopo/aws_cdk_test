import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';


const app = new cdk.App();
const stack = new cdk.Stack(app, 'my-stack', {
    env: {
        region: process.env.REGION,
    },
    description: 'My CDK Stack',
});

const stackOutput = new cdk.CfnOutput(stack, 'my-stack-output', {
    value: 'Hello, CDK! You deployed me using the AWS CDK CLI!',
    description: 'My CDK Stack Output',
});

const conditionalValue = new cdk.CfnCondition(stack, 'my-stack-conditional', {
    expression: cdk.Fn.conditionEquals('true', 'true'),
    
});

const dbport = new cdk.CfnParameter(stack, 'dbport', {
    type: 'Number',
    default: 3306,
    minValue: 1024,
    maxValue: 65535,
    description: 'The port number of the database',
    allowedValues: ['3306', '5432', '1433'],
});



const availabilityZones = stack.availabilityZones;

console.log(availabilityZones);

app.synth();