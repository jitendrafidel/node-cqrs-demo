
import { DynamoDB } from 'aws-sdk'
import * as uuid from "uuid";
const region = process.env.REGION
const dynamoClient = new DynamoDB.DocumentClient({ region })
const organizationsTable = process.env.ORGANIZATIONS_TABLE || 'organizationresources-dev'
import {
    makeErrorResponse,
    makeSuccessResponse
  } from '../../infrastructure/http/makeResponse'
export const deleteDBHandler = async (event, context, cb) => {
    console.log('event in delete sb handler', event);

    if (!event.pathParameters || !event.pathParameters.resourceId) {
        return cb(null, makeErrorResponse(404, 'resourceId not found'))
      }

      const resourceId = event.pathParameters.resourceId;
    

    const pathParameters =  event.pathParameters;

    console.log('pathParameters', pathParameters);
    
    const response = await dynamoClient.delete({
      TableName: organizationsTable,
      Key: {
        resourceId:resourceId
    }
    }).promise();

    return response;
  }