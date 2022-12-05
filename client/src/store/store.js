import { configureStore } from '@reduxjs/toolkit'
import callSlice from './slices/callSlice'

export default configureStore({
    reducer: {
        call: callSlice
    },
});

//for testing
export function setupStore(preloadedState) {
    return configureStore({
        reducer: {
            call: callSlice
        },
        preloadedState
    })
}