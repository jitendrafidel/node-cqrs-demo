
import { DynamoDB } from 'aws-sdk'
import * as uuid from "uuid";
import {
    makeErrorResponse,
    makeSuccessResponse
  } from '../../infrastructure/http/makeResponse'
  
const region = process.env.REGION
const dynamoClient = new DynamoDB.DocumentClient({ region })
const organizationsTable = process.env.ORGANIZATIONS_TABLE || 'organizationresources-dev'

export const updateDBHandler = async (event, context, cb) => {

    console.log('event in update sb handler', event);

    if (!event.pathParameters || !event.pathParameters.resourceId) {
        return cb(null, makeErrorResponse(404, 'resourceId not found'))
      }

      const resourceId = event.pathParameters.resourceId;
  
      if (!event.body) {
        return cb(null, makeErrorResponse(404, 'request body not found'))
      }

    const { title, description, active} = JSON.parse(event.body);

    const response = await dynamoClient.put({
      TableName: organizationsTable,
      Item: {
        resourceId:resourceId,
        title:title,
        description:description,
        active: active,
        updateAt: new Date().toISOString(),
      }
    }).promise();
    return response;
  }