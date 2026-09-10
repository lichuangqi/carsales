import { rm } from 'node:fs/promises';
import { beforeEach } from 'vitest';

beforeEach(async () => {
  await Promise.all([
    rm('test.sqlite', { force: true }),
    rm('test.sqlite-shm', { force: true }),
    rm('test.sqlite-wal', { force: true }),
  ]);
});
