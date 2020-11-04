/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-default-export */
import { NextApiRequest, NextApiResponse } from 'next';

import { getModels } from '../../lib/getModels';
import { getReqAsString } from '../../utils/getReqAsString';

export default async function models(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const make = getReqAsString(req.query.make);
  const models = await getModels(make);
  res.json(models);
}
