import FieldService from './FieldService'
import Operation from '@/models/Operation'

const api = new FieldService()

export const getOperations = () => api.getOperations()
export const getOperation = () => api.getOperation()
export const saveOperation = (operation: Operation) => api.saveOperation(operation)
export const getFilteredOperations = filter => api.getFilteredOperations(filter)
