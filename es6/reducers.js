export const select = (state) => state.time

const initial_state = {
    speed: 1,
    warped_time: Date.now(),
}

export const time = (state=initial_state, action) => {
    switch (action.type) {
        case 'SET_SPEED':
            return {...state, speed: action.speed}
        case 'SET_WARPED_TIME':
            return {...state, warped_time: action.warped_time}
        default:
            return state
    }
}
