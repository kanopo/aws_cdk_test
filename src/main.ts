import { App, Stack } from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as dotenv from "dotenv";

dotenv.config()

const {
    VPC_CIDR_RANGE,
    // AVAILABLE_AZS_01,
    // AVAILABLE_AZS_02,
    PUBLIC_SUBNET_01_CIDR_RANGE,
    PUBLIC_SUBNET_02_CIDR_RANGE,
    PRIVATE_SUBNET_01_CIDR_RANGE,
    PRIVATE_SUBNET_02_CIDR_RANGE,
} = process.env;







const app = new App();
const stack = new Stack(app, "BaseVpc");

const AVAILABLE_AZS_01 = stack.availabilityZones[0];
const AVAILABLE_AZS_02 = stack.availabilityZones[1];

// TODO: CDK template for base vpc env


// VPC CONFIGURATION
const vpc = new ec2.Vpc(stack, "VPC", {
    vpcName: "dmitri-vpc",
    ipAddresses: ec2.IpAddresses.cidr(VPC_CIDR_RANGE!),
    maxAzs: 2, // USE THIS INSTEAD OF HARD CODING AZS
    // enableDnsHostnames: false,
    // enableDnsSupport: true,
    // createInternetGateway: true,
    // TODO: select which one to use
    // natGatewayProvider: ec2.NatProvider.instance({
    //     instanceType: new ec2.InstanceType("t3.micro"),
    // }),
    // natGatewayProvider: ec2.NatProvider.gateway(),
    // natGatewaySubnets: {
    //     subnetGroupName: "Public",
    // },
    // natGateways: 1,
});


// const privateSubnet01 = new ec2.Subnet(stack, "PrivateSubnet01", {
//     availabilityZone: AVAILABLE_AZS_01!,
//     cidrBlock: PRIVATE_SUBNET_01_CIDR_RANGE!,
//     vpcId: vpc.vpcId,
//     // mapPublicIpOnLaunch: false,
// });

// const privateSubnet02 = new ec2.Subnet(stack, "PrivateSubnet02", {
//     availabilityZone: AVAILABLE_AZS_02!,
//     cidrBlock: PRIVATE_SUBNET_02_CIDR_RANGE!,
//     vpcId: vpc.vpcId,
//     // mapPublicIpOnLaunch: false,
// });

// const publicSubnet01 = new ec2.Subnet(stack, "PublicSubnet01", {
//     availabilityZone: AVAILABLE_AZS_01!,
//     cidrBlock: PUBLIC_SUBNET_01_CIDR_RANGE!,
//     vpcId: vpc.vpcId,
//     mapPublicIpOnLaunch: true,
// });

// const publicSubnet02 = new ec2.Subnet(stack, "PublicSubnet02", {
//     availabilityZone: AVAILABLE_AZS_02!,
//     cidrBlock: PUBLIC_SUBNET_02_CIDR_RANGE!,
//     vpcId: vpc.vpcId,
//     mapPublicIpOnLaunch: true,
// });
