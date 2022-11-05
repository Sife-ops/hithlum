const tableParams = require("@hithlum/backend/serverless/table-properties.js");
import _ from "lodash";
import AWS from "aws-sdk";
import { mockData } from "./mock-data";

const config = {
  region: "us-east-1",
  endpoint: "http://localhost:8000",
};

const dynamodb = new AWS.DynamoDB(config);
const documentClient = new AWS.DynamoDB.DocumentClient(config);

const TableName = "hithlum-local-table";

(async () => {
  await dynamodb
    .createTable({
      ...tableParams(),
      TableName,
    })
    .promise();

  for (const chunk of _.chunk(mockData, 10)) {
    await documentClient
      .batchWrite({
        RequestItems: {
          // [TableName]: mockData.slice(0, 10),
          [TableName]: chunk.map((Item: any) => ({
            PutRequest: {
              Item,
            },
          })),
        },
      })
      .promise();
  }
})();
