
import { DynamoDB } from 'aws-sdk'
import * as uuid from "uuid";
const region = process.env.REGION
const dynamoClient = new DynamoDB.DocumentClient({ region })
const organizationsTable = process.env.ORGANIZATIONS_TABLE || 'organizationresources-dev'
import {
    makeErrorResponse,
    makeSuccessResponse
  } from '../../infrastructure/http/makeResponse'
  

export const saveDBHandler = async (event, context, cb) => {
    console.log('event in save sb handler', event);


    if (!event.body) {
        return cb(null, makeErrorResponse(404, 'request body not found'))
      }

    const { title, description, active} = JSON.parse(event.body);

    if(!title || !description || !active)
    {
        return cb(null, makeErrorResponse(404, 'either title or description or active field is missing.'))
    }

    const resourceId: string = uuid.v4();
    const response = await dynamoClient.put({
      TableName: organizationsTable,
      Item: {
        resourceId:resourceId,
        title:title,
        description:description,
        active: active,
        createdAt: new Date().toISOString(),
        updateAt: new Date().toISOString(),
      }
    }).promise();
    return response;
  }