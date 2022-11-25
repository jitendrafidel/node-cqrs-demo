

import { Kinesis, Snowball } from 'aws-sdk';
import {
  KinesisStreamHandler,
  KinesisStreamRecordPayload,
} from 'aws-lambda';

import { saveDBHandler } from '../../dbHandlers/saveDBHandler';
import { updateDBHandler } from '../../dbHandlers/updateDBHandler';
import { deleteDBHandler } from '../../dbHandlers/deleteDBHandler';

const kinesis = new Kinesis({
  apiVersion: '2013-12-02',
});

export const resourceCreatedEventHandler: KinesisStreamHandler = async (event, context, cb) => {
  console.log('payloadData', event);
  try {
    for (const record of event.Records) {
      const payload: KinesisStreamRecordPayload = record.kinesis;
      console.log('payload======>', payload);
      const message: string = Buffer.from(payload.data, 'base64').toString();
      console.log('message=======>', message);
      console.log(
        `Kinesis Message:
            partition key: ${payload.partitionKey}
            sequence number: ${payload.sequenceNumber}
            kinesis schema version: ${payload.kinesisSchemaVersion}
            data: ${message}
          `);
          
        const data =  await eventHandler(message,context,cb);
         console.log('data saved in db', data)
    }


  } catch (error) {
    console.log(error);
  }
};


async function eventHandler(message,context,cb ){
  const body = JSON.parse(message);
  const httpMethod = JSON.parse(message).httpMethod;
  console.log('httpMethod', httpMethod);
 
  switch (httpMethod) {
    case 'POST':
        return await saveDBHandler(body,context,cb);
      case 'PUT':
        return await updateDBHandler(body,context,cb);
        case 'DELETE':
          return await deleteDBHandler(body,context,cb);
    default:
      break;
  }

}