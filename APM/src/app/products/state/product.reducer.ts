import { createAction, on, createReducer } from "@ngrx/store";
import { Product } from "../product";
import * as AppState from '../../state/app.state'


export interface State extends AppState.State {
    products: ProductState;
}

export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
}

export const productReducer = createReducer(
    { showProductCode: true },
    on(createAction('[Product] Toggle Product Code'), state => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        };
    })
)