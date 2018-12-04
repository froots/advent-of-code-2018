import { loadInput } from '../../loadInput';
import { identity } from '../../identity';

export async function solve(): Promise<void> {
  const input = parseInput(await loadInput(4));
  console.log(`Day 4, part 1: ${solutionA(input)}`);
}

function parseInput(input: string): string[] {
  return input
    .split('\n')
    .map(line => line.trim())
    .filter(identity);
}

export function solutionA(input: string[]): number {
  // const parsedEntries = input.map(parseEntry);
  // const sortedEntries = parsedEntries.sort(dateSorter)
  return 0;
}

export function parseEntry(entry: string): LogEntry {
  // [1518-04-11 00:00] Guard #2207 begins shift
  const matcher = /\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\] (.+)/;
  const matches: RegExpMatchArray | null = entry.match(matcher);
  if (!matches) {
    throw new Error('Could not parse entry');
  }
  const datetime = new Date(
    Number(matches[1]) + 500, // Avoiding historical date corrections
    Number(matches[2]) - 1,
    Number(matches[3]),
    Number(matches[4]),
    Number(matches[5])
  );
  const message = matches[6] || '';
  return { datetime, message };
}

export function dateSorter(a: LogEntry, b: LogEntry): number {
  return a.datetime.getTime() - b.datetime.getTime();
}

type LogEntry = {
  datetime: Date;
  message: string;
}
