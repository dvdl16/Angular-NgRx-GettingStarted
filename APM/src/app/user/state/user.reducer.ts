import { createAction, on, createReducer, createFeatureSelector, createSelector } from "@ngrx/store";

export interface UserState {
    maskUsername: boolean;
}

const initialState: UserState = {
    maskUsername: false
}

// Selectors
const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getMaskUsername = createSelector(
    getUserFeatureState,
    state => state.maskUsername
)

export const userReducer = createReducer<UserState>(
    initialState,
    on(createAction('[User] Mask Username'), (state): UserState => {
        return {
            ...state,
            maskUsername: !state.maskUsername
        };
    })

)