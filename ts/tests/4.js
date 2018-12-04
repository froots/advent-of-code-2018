const test = require('tape');
const {
  solutionA,
  parseEntry,
  dateSorter,
  inferShifts,
  Shift,
  Sleep,
  guardSleeps,
  mostAsleepTime
} = require('../dist/solutions/4');

test('Day 4 part 1', t => {
  t.plan(1);
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
  const solution = solutionA(input);
  t.comment(solution);
  t.equal(solutionA(input), 240);
});

test('Day 4 parse entry', t => {
  t.plan(4);
  const entry1 = '[1518-11-01 23:58] Guard #99 begins shift';
  const entry2 = '[1518-11-03 00:24] falls asleep';

  const parsedEntry1 = parseEntry(entry1);
  const parsedEntry2 = parseEntry(entry2);

  t.equal(parsedEntry1.datetime.toISOString(), '2018-11-01T23:58:00.000Z'); // shifting by 500 years to avoid nastiness with corrected times
  t.equal(parsedEntry1.message, 'Guard #99 begins shift');
  t.equal(parsedEntry2.datetime.toISOString(), '2018-11-03T00:24:00.000Z');
  t.equal(parsedEntry2.message, 'falls asleep');
});

test('Day 4 date sorter', t => {
  t.plan(3);

  const date1 = new Date(2018, 1, 22, 23, 5);
  const date2 = new Date(2018, 1, 22, 22, 4);
  const date3 = new Date(2018, 1, 22, 22, 31);
  const entries = [
    { datetime: date1 },
    { datetime: date2 },
    { datetime: date3 }
  ];

  const sorted = entries.sort(dateSorter);

  t.equal(sorted[0].datetime, date2);
  t.equal(sorted[1].datetime, date3);
  t.equal(sorted[2].datetime, date1);
});

test('Day 4 #inferShifts', t => {
  t.plan(10);

  const entries = [
    {
      datetime: new Date(2018, 10, 1, 0, 3),
      message: 'Guard #10 begins shift'
    },
    {
      datetime: new Date(2018, 10, 1, 0, 5),
      message: 'falls asleep'
    },
    {
      datetime: new Date(2018, 10, 1, 0, 25),
      message: 'wakes up'
    },
    {
      datetime: new Date(2018, 10, 1, 0, 30),
      message: 'falls asleep'
    },
    {
      datetime: new Date(2018, 10, 1, 0, 55),
      message: 'wakes up'
    },
    {
      datetime: new Date(2018, 10, 1, 23, 58),
      message: 'Guard #99 begins shift'
    },
    {
      datetime: new Date(2018, 10, 2, 0, 40),
      message: 'falls asleep'
    },
    {
      datetime: new Date(2018, 10, 2, 0, 50),
      message: 'wakes up'
    }
  ];
  const shifts = inferShifts(entries);

  t.equal(shifts.length, 2);

  t.equal(shifts[0].guardId, 10);
  t.equal(shifts[0].date.getTime(), new Date(2018, 10, 1).getTime());
  t.equal(shifts[0].sleeps.length, 2);
  t.deepEqual(shifts[0].sleeps[0], { startMinutes: 5, endMinutes: 25 });
  t.deepEqual(shifts[0].sleeps[1], { startMinutes: 30, endMinutes: 55 });

  t.equal(shifts[1].guardId, 99);
  t.equal(shifts[1].date.getTime(), new Date(2018, 10, 2).getTime());
  t.equal(shifts[1].sleeps.length, 1);
  t.deepEqual(shifts[1].sleeps[0], { startMinutes: 40, endMinutes: 50 });
});

test('Day 4 #guardSleeps', t => {
  t.plan(4);

  const s1 = new Shift(10, new Date(2018, 10, 1), [
    new Sleep(5, 25),
    new Sleep(30, 55)
  ]);
  const s2 = new Shift(99, new Date(2018, 10, 2), [new Sleep(40, 50)]);
  const s3 = new Shift(10, new Date(2018, 10, 3), [new Sleep(24, 29)]);
  const s4 = new Shift(99, new Date(2018, 10, 4), [new Sleep(36, 46)]);
  const s5 = new Shift(99, new Date(2018, 10, 5), [new Sleep(45, 55)]);
  const shifts = [s1, s2, s3, s4, s5];
  const sleepsByGuard = guardSleeps(shifts);

  t.equal(sleepsByGuard.size, 2);
  t.equal(sleepsByGuard.get(10).length, 3);
  t.equal(sleepsByGuard.get(10)[0].startMinutes, 5);
  t.equal(sleepsByGuard.get(10)[0].endMinutes, 25);
});

test('Day 4 most asleep time', t => {
  t.plan(1);
  const sleeps = [new Sleep(5, 25), new Sleep(30, 55), new Sleep(24, 29)];
  t.equal(mostAsleepTime(sleeps), 24);
});
