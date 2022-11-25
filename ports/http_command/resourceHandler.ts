import {
  makeErrorResponse,
  makeSuccessResponse
} from '../../infrastructure/http/makeResponse'
import  {resourceCreated} from '../../application/resourceHandler'
export const handler = async (event, context, cb) => {
  const data = await resourceCreated(event,context,cb);
  return data;
}

