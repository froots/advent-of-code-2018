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
  // const shifts = inferShifts(sortedEntries);
  return 0;
}

export function parseEntry(entry: string): LogEntry {
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

export function inferShifts(entries: LogEntry[]): Shift[] {
  let currentShift: Shift = new Shift();
  let currentSleep: Sleep = new Sleep();
  let shifts: Shift[] = []; 

  for (let entry of entries) {
    switch (entry.message) {
      case 'falls asleep':
        currentSleep.startMinutes = entry.datetime.getMinutes();
        break;
      case 'wakes up':
        currentSleep.endMinutes = entry.datetime.getMinutes();
        currentShift.sleeps = [...currentShift.sleeps, currentSleep];
        currentSleep = new Sleep();
        break;
      default:
        const guardIdMatches: RegExpMatchArray | null = entry.message.match(/Guard #(\d+) begins shift/);
        if (!guardIdMatches) {
          throw new Error('Can not parse shift');
        }
        if (currentShift.guardId !== 0) {
          shifts = [...shifts, currentShift];
        }
        currentShift = new Shift();
        currentShift.guardId = Number(guardIdMatches[1]);
        currentShift.date = new Date(entry.datetime.getTime())
        if (currentShift.date.getHours() >= 12) {
          currentShift.date.setDate(currentShift.date.getDate() + 1);
        }
        currentShift.date.setHours(0);
        currentShift.date.setMinutes(0);
        break;
    }
  }

  if (currentShift.guardId !== 0) {
    shifts = [...shifts, currentShift];
  }

  return shifts;
}

class Shift {
  guardId: number;
  date: Date;
  sleeps: Sleep[];

  constructor() {
    this.guardId = 0;
    this.date = new Date();
    this.sleeps = [];
  }
}

class Sleep {
  startMinutes: number;
  endMinutes: number;

  constructor() {
    this.startMinutes = 0;
    this.endMinutes = 0;
  }
}

type LogEntry = {
  datetime: Date;
  message: string;
}
