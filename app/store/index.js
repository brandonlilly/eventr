import { formatEvent } from '../utils/format'

export default function rootReducer(state = {}, action) {
  switch (action.type) {
    case 'SET_STYLING':
      return { ...state, styling: action.response }
    case 'SET_TEMPLATE':
      return { ...state, template: action.response }
    case 'SET_EVENT':
      return { ...state, event: formatEvent(action.response) }
    default:
      return state
  }
}

export const getCurrentEvent = state => state.event
export const getTemplate = state => state.template
export const getStyling = state => state.styling

export const setStyling = (styling) => ({
  type: 'SET_STYLING',
  response: styling,
})
export const setTemplate = (template) => ({
  type: 'SET_TEMPLATE',
  response: template,
})
export const setCurrentEvent = (event) => ({
  type: 'SET_EVENT',
  response: event,
})
