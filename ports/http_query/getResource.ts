
import { DynamoDB } from 'aws-sdk'

import {
    makeErrorResponse,
    makeSuccessResponse
  } from '../../infrastructure/http/makeResponse'
  
const region = process.env.REGION
const dynamoClient = new DynamoDB.DocumentClient({ region })
const organizationsTable = process.env.ORGANIZATIONS_TABLE || 'organizationresorces-dev'
export const handler = async (event, context, cb) => {
   
    if (!event.pathParameters || !event.pathParameters.resourceId) {
        return cb(null, makeErrorResponse(404, 'resource not found'))
      }
      const resourceId = event.pathParameters.resourceId;

      
    const response = await dynamoClient.get({
      TableName: organizationsTable,
      Key: {
        resourceId:resourceId
      }
    }).promise().then(data => {
        if (!data) {
          return cb(null, makeErrorResponse(404, 'Resource not found'))
        } else {
          return cb(null, makeSuccessResponse(data.Item))
        }
      })
      .catch(err => {
        cb(null, makeErrorResponse(err))
      });;


return response;
}

