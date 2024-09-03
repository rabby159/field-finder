import {
  TMonths,
  TQuarterCode,
  TQuarterName,
  TQuarterYearNameCodeMapper,
} from './quarterYear.interface'

export const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const QuarterName: TQuarterName[] = ['AQuarter', 'BQuarter', 'CQuarter']

export const QuarterCode: TQuarterCode[] = ['01', '02', '03']

//checking semester name and code are matching or not
export const quarterYearNameCodeMapper: TQuarterYearNameCodeMapper = {
  AQuarter: '01',
  BQuarter: '02',
  CQuarter: '03',
}
