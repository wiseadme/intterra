import TDate from '@/models/TDate'
import months from '@/schemes/months.dictionary.json'
import dictionary from '@/schemes/dictionary.json'
import { OperationType, Assessment, Culture } from '@/models/Operation'

export function setFormattedDate(date: TDate): string {
  return `${ date.day } ${ months[date.month - 1] } ${ date.year }`
}

export function setFromDictionary(value: number, key: string): string {
  if (value !== null) {
    if (key === 'type') return dictionary[OperationType[value]]
    if (key === 'assessment') return dictionary[Assessment[value]]
    if (key === 'culture') return dictionary[Culture[value]]
  }
  return 'Нет оценки'
}

export function compareDates<T extends TDate>(date1: T, date2: T): number {
  const comp1 = new Date(date1.year, date1.month, date1.day)
  const comp2 = new Date(date2.year, date2.month, date2.day)
  return comp1 > comp2 ? 1 : -1
}
