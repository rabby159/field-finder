export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type TQuarterName = 'AQuarter' | 'BQuarter' | 'CQuarter'
export type TQuarterCode = '01' | '02' | '03'

export type TQuarter = {
  name: TQuarterName
  year: string
  code: TQuarterCode
  startMonth: TMonths
  endMonth: TMonths
};

export type TQuarterYearNameCodeMapper = {
  [key: string]: string
}