import deepFreeze from 'deep-freeze'
import feedbackReducer from './feedbackReducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    // const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = feedbackReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = feedbackReducer(state, action)

    expect(newState).toEqual({ ...initialState, good: 1})
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = feedbackReducer(state, action)

    expect(newState).toEqual({ ...initialState, ok: 1})
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = feedbackReducer(state, action)

    expect(newState).toEqual({ ...initialState, bad: 1})
  })

  test('reset state', () => {
    const action = {
      type: 'ZERO'
    }
    const state = initialState

    deepFreeze(state)
    const newState = feedbackReducer(state, action)

    expect(newState).toEqual(initialState)
  })




})