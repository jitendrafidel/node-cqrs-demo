
import {
  makeErrorResponse,
  makeSuccessResponse
} from '../../infrastructure/http/makeResponse'

import { DynamoDB } from 'aws-sdk'
const region = process.env.REGION
const dynamoClient = new DynamoDB.DocumentClient({ region })
const organizationsTable = process.env.ORGANIZATIONS_TABLE || 'organizationresources-dev'
export const handler = async (event, context, cb) => {

const response = await dynamoClient.scan({
    TableName: organizationsTable,
}).promise()
.then(data => {
  if (!data) {
    return cb(null, makeErrorResponse(404, 'Resource not found'))
  } else {
    return cb(null, makeSuccessResponse(data.Items))
  }
})
.catch(err => {
  cb(null, makeErrorResponse(err))
});
return response;

}

