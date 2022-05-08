import { createAction, on, createReducer } from "@ngrx/store";

export const userReducer = createReducer(
    { maskUsername: false },
    on(createAction('[User] Mask Username'), state => {
        return {
            ...state,
            maskUsername: !state.maskUsername
        };
    })

)