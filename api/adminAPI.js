const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json",
    };

    console.log("Method is ", event.httpMethod);

    console.log("Event is ", event);
    try {
        switch (true) {
            // Get All Event
            case event.httpMethod == "GET" && event.resource == "/events":
                body = await dynamo.scan({ TableName: "events" }).promise();
                break;
            // Get Specific Event
            case event.httpMethod == "GET" &&
                event.resource == "/events/{name}":
                console.log("got a name", event.pathParameters.name);
                body = await dynamo
                    .get({
                        TableName: "events",
                        Key: {
                            eventName: event.pathParameters.name,
                        },
                    })
                    .promise();
                break;
            // Create Event
            case event.httpMethod == "POST":
                let requestJSON = JSON.parse(event.body);
                await dynamo
                    .put({
                        TableName: "events",
                        Item: {
                            eventName: requestJSON.eventName,
                            eventDate: requestJSON.eventDate,
                            description: requestJSON.description,
                            users: requestJSON.users,
                        },
                    })
                    .promise();
                body = `Event ${requestJSON.eventName} Added!`;
                break;
            case event.httpMethod == "DELETE" &&
                event.resource == "/events/{name}":
                console.log("got a name", event.pathParameters.name);
                body = await dynamo
                    .delete({
                        TableName: "events",
                        Key: {
                            eventName: event.pathParameters.name,
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
