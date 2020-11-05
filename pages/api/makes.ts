/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-default-export */
import { NextApiRequest, NextApiResponse } from 'next';

import { getMakes } from '../../lib/getMakes';

export default async function makes(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const makes = await getMakes();
  res.json(makes);
}
