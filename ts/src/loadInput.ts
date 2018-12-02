import path from 'path';
import fs from 'fs';

export async function loadInput(n: number): Promise<string> {
  const filePath: string = path.resolve('inputs', n.toString());
  return await fs.promises.readFile(filePath, { encoding: 'utf8' });
}
