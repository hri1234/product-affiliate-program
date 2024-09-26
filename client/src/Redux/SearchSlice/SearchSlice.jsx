import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchQuery: '',
  dashboardQuery:''
}

const SearchSlice = createSlice({
  name: 'SearchSlice',
  initialState,
  reducers: {
    SetSearchInput: (state, action) => {
      state.searchQuery = action.payload
    },
    SetDashboardSearchInput: (state, action) => {
      state.dashboardQuery = action.payload
    },

  },
})

export const {SetSearchInput , SetDashboardSearchInput} = SearchSlice.actions
export default SearchSlice.reducer; 