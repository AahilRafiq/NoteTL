import { createClient } from '@libsql/client';
import { getAppPath } from '../main.js';
import path from 'path';
import { isDev } from '../main.js';

const db = createClient({ url: `file:${path.join(isDev() ? '.' : getAppPath(),'database.db')}`});

export default db;