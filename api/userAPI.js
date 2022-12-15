const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    let body;
    let params;
    let requestJSON;
    let statusCode = 200;
    const tableName = "events";
    const headers = {
        "Content-Type": "application/json",
    };

    console.log("Method is ", event.httpMethod);
    console.log("Event is ", event);

    try {
        switch (true) {
            // Update User Status (Parse new user list)
            case event.httpMethod == "PATCH" &&
                event.resource == "/checkIn/{eventName}":
                console.log("Event: ", event.pathParameters.name);
                requestJSON = JSON.parse(event.body);
                params = {
                    TableName: tableName,
                    Key: {
                        eventName: event.pathParameters.eventName,
                    },
                    UpdateExpression: `set users = :value`,
                    ExpressionAttributeValues: {
                        ":value": requestJSON.updatedUsers,
                    },
                    returnValues: "UPDATE_NEW",
                };
                await dynamo.update(params).promise();
                body = "User CheckedIn";
                break;
            // Get Eent Details
            case event.httpMethod == "GET" &&
                event.resource == "/checkIn/{eventName}":
                body = await dynamo
                    .get({
                        TableName: tableName,
                        Key: {
                            eventName: event.pathParameters.eventName,
                        },
                    })
                    .promise();
                break;
            default:
                throw new Error(`Oops! something went wrong`);
        }
    } catch (err) {
        statusCode = 400;
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
};
