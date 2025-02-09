import { on, createReducer } from "@ngrx/store";
import { Product } from "../product";
import { ProductApiActions, ProductPageActions } from "./actions";


export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
}

const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: ''
}

// Reducer
export const productReducer = createReducer<ProductState>(
    initialState,
    on(ProductPageActions.toggleProductCode, (state): ProductState => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        };
    }),
    on(ProductPageActions.setCurrentProduct, (state, action): ProductState => {
        return {
            ...state,
            currentProductId: action.currentProductId
        }
    }),
    on(ProductPageActions.clearCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: null
        }
    }),
    on(ProductPageActions.initialiseCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: 0
        }
    }),
    on(ProductApiActions.loadProductsSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: action.products,
            error: ''
        }
    }),
    on(ProductApiActions.loadProductsFailure, (state, action): ProductState => {
        return {
            ...state,
            products: [],
            error: action.error
        }
    }),
    on(ProductApiActions.updateProductSuccess, (state, action): ProductState => {
        const updatedProducts = state.products.map(
            item => action.product.id === item.id ? action.product : item
        );
        return {
            ...state,
            products: updatedProducts,
            currentProductId: action.product.id,
            error: ''
        }
    }),
    on(ProductApiActions.updateProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        }
    }),
    on(ProductApiActions.createProductSuccess, (state, action): ProductState => {
        const updatedProducts = [...state.products];
        updatedProducts.push(action.product);
        return {
            ...state,
            products: updatedProducts,
            currentProductId: action.product.id,
            error: ''
        }
    }),
    on(ProductApiActions.createProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        }
    }),
    on(ProductApiActions.deleteProductSuccess, (state, action): ProductState =>{
        const updatedProducts = state.products.filter(product => product.id !== action.id)
        return {
            ...state,
            products: updatedProducts,
            currentProductId: null,
            error: ''
        }
    }),
    on(ProductApiActions.deleteProductFailure, (state, action): ProductState => {
      return {
        ...state,
        error: action.error
      };
    })
)