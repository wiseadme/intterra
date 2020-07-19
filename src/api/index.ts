import FieldService from './FieldService'

const api = new FieldService()

export const getOperations = () => api.getOperations()
export const getFilteredOperations = filter => api.getFilteredOperations(filter)
