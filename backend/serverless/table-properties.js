module.exports = (serverless) => {
  // console.log(serverless); // todo: research this
  return {
    BillingMode: "PAY_PER_REQUEST",
    TableName: "${self:service}-${opt:stage}-table",
    AttributeDefinitions: [
      {
        AttributeName: "pk",
        AttributeType: "S",
      },
      {
        AttributeName: "sk",
        AttributeType: "S",
      },
      {
        AttributeName: "gsi1pk",
        AttributeType: "S",
      },
      {
        AttributeName: "gsi1sk",
        AttributeType: "S",
      },
      {
        AttributeName: "gsi2pk",
        AttributeType: "S",
      },
      {
        AttributeName: "gsi2sk",
        AttributeType: "S",
      },
      {
        AttributeName: "gsi3pk",
        AttributeType: "S",
      },
      {
        AttributeName: "gsi3sk",
        AttributeType: "S",
      },
      {
        AttributeName: "gsi4pk",
        AttributeType: "S",
      },
      {
        AttributeName: "gsi4sk",
        AttributeType: "S",
      },
      {
        AttributeName: "gsi5pk",
        AttributeType: "S",
      },
      {
        AttributeName: "gsi5sk",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "pk",
        KeyType: "HASH",
      },
      {
        AttributeName: "sk",
        KeyType: "RANGE",
      },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: "gsi1",
        KeySchema: [
          {
            AttributeName: "gsi1pk",
            KeyType: "HASH",
          },
          {
            AttributeName: "gsi1sk",
            KeyType: "RANGE",
          },
        ],
        Projection: {
          ProjectionType: "ALL",
        },
      },
      {
        IndexName: "gsi2",
        KeySchema: [
          {
            AttributeName: "gsi2pk",
            KeyType: "HASH",
          },
          {
            AttributeName: "gsi2sk",
            KeyType: "RANGE",
          },
        ],
        Projection: {
          ProjectionType: "ALL",
        },
      },
      {
        IndexName: "gsi3",
        KeySchema: [
          {
            AttributeName: "gsi3pk",
            KeyType: "HASH",
          },
          {
            AttributeName: "gsi3sk",
            KeyType: "RANGE",
          },
        ],
        Projection: {
          ProjectionType: "ALL",
        },
      },
      {
        IndexName: "gsi4",
        KeySchema: [
          {
            AttributeName: "gsi4pk",
            KeyType: "HASH",
          },
          {
            AttributeName: "gsi4sk",
            KeyType: "RANGE",
          },
        ],
        Projection: {
          ProjectionType: "ALL",
        },
      },
      {
        IndexName: "gsi5",
        KeySchema: [
          {
            AttributeName: "gsi5pk",
            KeyType: "HASH",
          },
          {
            AttributeName: "gsi5sk",
            KeyType: "RANGE",
          },
        ],
        Projection: {
          ProjectionType: "ALL",
        },
      },
    ],
  };
};
