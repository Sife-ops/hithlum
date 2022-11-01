export * as Dynamo from "./dynamo";
import { EntityConfiguration } from "electrodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const { STAGE, TABLE } = process.env;

export const Client = new DynamoDBClient(
  STAGE === "local"
    ? {
        region: "us-east-1",
        endpoint: "http://localhost:8000",
      }
    : {}
);

export const Configuration: EntityConfiguration = {
  table: TABLE,
  client: Client,
};
