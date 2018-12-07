import tape from 'tape';
import {
  solutionA,
  dateSorter,
  solutionB,
  parseEvent,
  eventReducer,
  totalsById
} from './';

let input = [
  '[1518-11-01 00:05] falls asleep',
  '[1518-11-01 00:00] Guard #10 begins shift',
  '[1518-11-01 00:30] falls asleep',
  '[1518-11-01 00:55] wakes up',
  '[1518-11-01 00:25] wakes up',
  '[1518-11-02 00:40] falls asleep',
  '[1518-11-05 00:55] wakes up',
  '[1518-11-02 00:50] wakes up',
  '[1518-11-04 00:46] wakes up',
  '[1518-11-05 00:45] falls asleep',
  '[1518-11-03 00:05] Guard #10 begins shift',
  '[1518-11-01 23:58] Guard #99 begins shift',
  '[1518-11-03 00:29] wakes up',
  '[1518-11-04 00:02] Guard #99 begins shift',
  '[1518-11-04 00:36] falls asleep',
  '[1518-11-03 00:24] falls asleep',
  '[1518-11-05 00:03] Guard #99 begins shift'
];

tape('Day 4 part 1', t => {
  t.plan(1);
  const solution = solutionA(input);
  t.comment(JSON.stringify(solution));
  t.equal(solutionA(input), 240);
});

tape('Day 4 date sorter', t => {
  t.plan(2);
  const sorted = [...input].sort(dateSorter);
  t.equal(sorted[0], input[1]);
  t.equal(sorted[1], input[0]);
});

tape('Day 4 parse event', t => {
  t.plan(6);
  const shiftStart = parseEvent(input[1]);
  const fallsAsleep = parseEvent(input[0]);
  const wakesUp = parseEvent(input[4]);

  t.equal(shiftStart.type, 0); // Should be using TS for these test I guess
  t.equal(shiftStart.payload, 10);
  t.equal(fallsAsleep.type, 1);
  t.equal(fallsAsleep.payload, 5);
  t.equal(wakesUp.type, 2);
  t.equal(wakesUp.payload, 25);
});

tape('Day 4 #eventReducer shift start', t => {
  t.plan(1);
  const shiftStart = eventReducer([], { type: 0, payload: 10 });
  const expected = [{ id: 10 }];
  t.deepEqual(
    shiftStart,
    expected,
    'Starting a shift creates the first sleep entry'
  );
});

tape('Day 4 #eventReducer shift start with previous sleep', t => {
  t.plan(1);
  const sleep1 = { id: 99, start: 30, end: 40 };
  const shiftStart = eventReducer([sleep1], { type: 0, payload: 10 });
  const expected = [sleep1, { id: 10 }];
  t.deepEqual(
    shiftStart,
    expected,
    'Starting a shift creates a new sleep entry'
  );
});

tape('Day 4 #eventReducer falls asleep', t => {
  t.plan(1);
  const fallsAsleep = eventReducer([{ id: 10 }], { type: 1, payload: 5 });
  const expected = [{ id: 10, start: 5 }];
  t.deepEqual(
    fallsAsleep,
    expected,
    'Falling asleep sets the start time on the current sleep'
  );
});

tape('Day 4 #eventReducer falls asleep again', t => {
  t.plan(1);
  const sleep1 = { id: 10, start: 5, end: 25 };
  const fallsAsleep2 = eventReducer([sleep1], { type: 1, payload: 30 });
  const expected = [sleep1, { id: 10, start: 30 }];
  t.deepEqual(
    fallsAsleep2,
    expected,
    'Falling asleep again creates a new sleep entry with the same id and a start time'
  );
});

tape('Day 4 #eventReducer wakes up', t => {
  t.plan(1);
  const wakesUp = eventReducer([{ id: 10, start: 5 }], {
    type: 2,
    payload: 25
  });
  const expected = [{ id: 10, start: 5, end: 25 }];
  t.deepEqual(
    wakesUp,
    expected,
    'Waking up sets the end time on the current sleep'
  );
});

tape('Day 4 #totalsById', t => {
  t.plan(3);
  const sleeps = [
    { id: 1, start: 5, end: 10 },
    { id: 1, start: 25, end: 50 },
    { id: 2, start: 30, end: 40 },
    { id: 3, start: 50, end: 55 }
  ];
  const actual = totalsById(sleeps);
  t.equal(actual.get(1), 30);
  t.equal(actual.get(2), 10);
  t.equal(actual.get(3), 5);
});

tape('Day 4 part 2', t => {
  t.plan(1);
  t.equal(solutionB(input), 4455);
});
