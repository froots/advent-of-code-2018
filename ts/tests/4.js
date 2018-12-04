const test = require('tape');
const { solutionA, parseEntry, dateSorter } = require('../dist/solutions/4');

test.skip('Day 4 part 1', t => {
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
