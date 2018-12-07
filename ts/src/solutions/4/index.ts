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
  const sleeps = [...input]
    .sort(dateSorter)
    .map(parseEvent)
    .reduce(eventReducer, []);

  const [idWithMostSleep] = [...totalsById(sleeps).entries()]
    .reduce(maxValueReducer, [0, 0]);

  const [minuteWithMostSleep] = sleeps
    .filter(sleep => sleep.id === idWithMostSleep)
    .reduce(sleepsByMinuteReducer, Array(60).fill(0))
    .reduce(maxMinuteCountReducer, [-1, 0]);

  return idWithMostSleep * minuteWithMostSleep;
}

export function solutionB(input: string[]): number {
  const sleeps = [...input]
    .sort(dateSorter)
    .map(parseEvent)
    .reduce(eventReducer, []);

  const sm = sleepMap(sleeps);
  
  const [id, minute, maxValue] = [...sm.entries()]
    .map(summariseSleepMap)
    .reduce(mostSleptMinute);

  return id * minute;
}

function mostSleptMinute(
  [maxId, maxMinute, maxValue]: [number, number, number],
  [currentId, currentMinute, currentValue]: [number, number, number]
): [number, number, number] {
  if (currentValue > maxValue) {
    return [currentId, currentMinute, currentValue];
  }
  return [maxId, maxMinute, maxValue];
}

function summariseSleepMap([id, minuteCounts]: [number, number[]]): [number, number, number] {
  const max = Math.max(...minuteCounts);
  const minute = minuteCounts.indexOf(max);
  return [id, minute, max];
}

function sleepMap(sleeps: Sleep[]): Map<number, number[]> {
  let hm: Map<number, number[]> = new Map();
  for (let sleep of sleeps) {
    let { id, start, end } = sleep;
    let newCounts = [...(hm.get(id) || Array(60).fill(0))];
    for (let minute = start || 0; minute < (end || 0); minute++) {
      newCounts[minute]++;
    }
    hm.set(id, newCounts);
  }
  return hm;
}

function maxMinuteCountReducer(
  [maxMinute, maxCount]: [number, number],
  count: number,
  minute: number
): [number, number] {
  if (count > maxCount) {
    return [minute, count];
  }
  return [maxMinute, maxCount];
}

function sleepsByMinuteReducer(
  minuteCounts: number[],
  sleep: Sleep
): number[] {
  for (let i = sleep.start || 0; i < (sleep.end || 0); i++) {
    minuteCounts[i]++;
  }
  return minuteCounts;
}

function maxValueReducer(
  [maxId, maxVal]: [number, number],
  [currentId, currentVal]: [number, number]
): [number, number] {
  if (currentVal > maxVal) {
    return [currentId, currentVal];
  }
  return [maxId, maxVal];
}

export function totalsById(sleeps: Sleep[]): Map<number, number> {
  let totals: Map<number, number> = new Map();
  for (let sleep of sleeps) {
    let total = 
      (totals.get(sleep.id) || 0) +
      (sleep.end || 0) -
      (sleep.start || 0);
    totals.set(sleep.id, total);
  }
  return totals;
}

export function eventReducer(sleeps: Sleep[], event: Event): Sleep[] {
  let sleep: Sleep | undefined;
  switch (event.type) {
    case EventType.BEGINS_SHIFT:
      sleep = {
        id: event.payload
      };
      return [...sleeps, sleep];

    case EventType.FALLS_ASLEEP:
      sleep = sleeps.pop();
      if (!sleep) {
        return sleeps;
      }
      if (sleep.end && sleep.end > 0) {
        return [
          ...sleeps,
          sleep,
          { 
            id: sleep.id,
            start: event.payload
          }
        ];
      }
      sleep.start = event.payload;
      return [...sleeps, sleep];

    case EventType.WAKES_UP:
      sleep = sleeps.pop();
      if (!sleep) {
        return sleeps;
      }
      sleep.end = event.payload;
      return [...sleeps, sleep];

    default:
      return [...sleeps];
  }
}

export function parseEvent(entry: string): Event {
  if (entry.includes('begins shift')) {
    let idMatch = entry.match(/#\d+/);
    if (!idMatch) {
      throw new Error('Can not parse');
    }
    return {
      type: EventType.BEGINS_SHIFT,
      payload: Number(idMatch[0].slice(1))
    }
  }
  if (entry.includes('falls asleep')) {
    return {
      type: EventType.FALLS_ASLEEP,
      payload: Number(entry.slice(15, 17))
    };
  }
  if (entry.includes('wakes up')) {
    return {
      type: EventType.WAKES_UP,
      payload: Number(entry.slice(15, 17))
    };
  }
  throw new Error('Unknown event type');
}

export function dateSorter(a: string, b: string): number {
  const dateA = a.substring(1, 17);
  const dateB = b.substring(1, 17);
  if (dateA < dateB) {
    return -1;
  }
  if (dateA > dateB) {
    return 1;
  }
  return 0;
}

type Event = {
  type: EventType;
  payload: number;
}

enum EventType {
  BEGINS_SHIFT,
  FALLS_ASLEEP,
  WAKES_UP
}

type Sleep = {
  id: number;
  start?: number;
  end?: number;
}
