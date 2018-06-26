export const select_time = (state) => state.time

const initial_state = {
    speed: null,
    warped_time: null,
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
