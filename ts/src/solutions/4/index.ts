import { loadInput } from '../../loadInput';
import { identity } from '../../identity';

export async function solve(): Promise<void> {
  const input = parseInput(await loadInput(4));
  console.log(`Day 4, part 1: ${solutionA(input)}`);
  console.log(`Day 4, part 2: ${solutionB(input)}`);
}

function parseInput(input: string): string[] {
  return input
    .split('\n')
    .map(line => line.trim())
    .filter(identity);
}

export function solutionA(input: string[]): number {
  const sleepsByGuard: SleepsByGuard = prepareInput(input);
  const guardWithMostSleeps: number = mostSleeps(sleepsByGuard);
  const guardMostAsleep: number = mostAsleepTime(sleepsByGuard.get(guardWithMostSleeps));
  return guardWithMostSleeps * guardMostAsleep;
}

export function solutionB(input: string[]): number {
  const sleepsByGuard: SleepsByGuard = prepareInput(input);
 
  const sleepHeatMapByGuard: Map<number, [number, number]> = new Map();

  for (let [id, sleeps] of sleepsByGuard) {
    let heatMap: number[] = sleeps.reduce((hm: number[], sleep: Sleep): number[] => {
      let newHeatMap = [...hm];
      for (let i = sleep.startMinutes; i < sleep.endMinutes; i++) {
        newHeatMap[i]++;
      }
      return newHeatMap;
    }, Array(60).fill(0));

    let maxAmount: number = Math.max(...heatMap);
    let maxMinute: number = heatMap.indexOf(maxAmount);
    
    sleepHeatMapByGuard.set(id, [maxMinute, maxAmount]);
  }

  let maxId: number = -1;
  let maxMinute: number = -1;
  let maxAmount: number = 0;

  for (let [id, [minute, amount]] of sleepHeatMapByGuard) {
    if (amount > maxAmount) {
      maxAmount = amount;
      maxId = id;
      maxMinute = minute;
    }
  }

  return maxId * maxMinute;
}

function prepareInput(input: string[]): SleepsByGuard {
  const sortedEntries = input
    .map(parseEntry)
    .sort(dateSorter);

  const shifts = inferShifts(sortedEntries);
  return guardSleeps(shifts);
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

export function guardSleeps(shifts: Shift[]): SleepsByGuard {
  let sleepsByGuard = new Map();
  for (let shift of shifts) {
    sleepsByGuard.set(
      shift.guardId,
      [...(sleepsByGuard.get(shift.guardId) || []), ...shift.sleeps]
    );
  }
  return sleepsByGuard;
}

export function mostSleeps(sleepsByGuard: SleepsByGuard): number {
  let guardTotals: Map<number, number> = new Map;
  for (let [id, sleeps] of sleepsByGuard) {
    const totalSleep = sleeps.reduce((total: number, sleep: Sleep): number => {
      return total + sleep.endMinutes - sleep.startMinutes;
    }, 0);
    guardTotals.set(id, totalSleep);
  }

  const totals = Array.from(guardTotals.entries());

  const sorter = ([id1, tot1]: [number, number], [id2, tot2]: [number, number]) => {
    return tot2 - tot1;
  };

  return totals.sort(sorter)[0][0];
}

export function mostAsleepTime(sleeps: Sleep[] = []): number {
  const minutes = Array(60).fill(0);
  for (let sleep of sleeps) {
    for (let i: number = sleep.startMinutes; i < sleep.endMinutes; i++) {
      minutes[i]++;
    }
  }
  return minutes.indexOf(Math.max(...minutes));
}

export class Shift {
  guardId: number;
  date: Date;
  sleeps: Sleep[];

  constructor(guardId: number = 0, date: Date = new Date(), sleeps: Sleep[] = []) {
    this.guardId = guardId;
    this.date = date;
    this.sleeps = sleeps;
  }
}

export class Sleep {
  startMinutes: number;
  endMinutes: number;

  constructor(startMinutes: number = 0, endMinutes: number = 0) {
    this.startMinutes = startMinutes;
    this.endMinutes = endMinutes;
  }
}

type SleepsByGuard = Map<number, Sleep[]>;

type LogEntry = {
  datetime: Date;
  message: string;
}
