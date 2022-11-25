
import { Kinesis } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import {
  makeErrorResponse,
  makeSuccessResponse
} from '../infrastructure/http/makeResponse'

import {resourceCreatedEventHandler} from '../infrastructure/eventHandlers/lambda/lambdaToEventHandlers'
const kinesis = new Kinesis({
  apiVersion: '2013-12-02',
});

export const resourceCreated = async (event, context, cb) => {
  console.log('event in resourceCreated==>', event)

  const streamName: string = 'eventStream';
  let statusCode: number = 200;
  let message: string;

  try {
  const kinesisData =   await kinesis.putRecord({
      StreamName: streamName,
      PartitionKey: uuidv4(),
      Data: JSON.stringify(event),
    }).promise();

    message = 'Message placed in the Event Stream!';
    console.log('kinesisData', kinesisData);
  } catch (error) {
    console.log(error);
    message = error;
    statusCode = 500;
  }
 
  return {
    statusCode,
    body: JSON.stringify({
      message,
    }),
  };

};