import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './Slices/loginSlice'
import CreateApi from '../services/apiService';
import NpoDataSlice from './NpoSlices/NpoDataSlice';
import SearchSlice from './SearchSlice/SearchSlice';

const Store = configureStore({
    reducer: {
        loginSlice: loginSlice,
        NpoDataSlice:NpoDataSlice,
        SearchSlice:SearchSlice,
        [CreateApi.reducerPath]:CreateApi.reducer

    },
    middleware: (defmiddleWare) =>
        defmiddleWare().concat(CreateApi.middleware)
})


export default Store;