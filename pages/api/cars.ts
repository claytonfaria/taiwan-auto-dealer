/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-default-export */
import { NextApiRequest, NextApiResponse } from 'next';

import { getPaginatedCars } from '../../lib/getPaginatedCars';
import { getReqAsString } from '../../utils/getReqAsString';

export default async function Cars(req: NextApiRequest, res: NextApiResponse) {
  const searchResults = await getPaginatedCars(req.query);
  res.json(searchResults);
}
