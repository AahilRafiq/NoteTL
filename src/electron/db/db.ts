import { createClient } from '@libsql/client';
import { getAppPath } from '../main.js';
import path from 'path';

const db = createClient({ url: `file:${path.join(getAppPath(),'database.db')}`});

export default db;