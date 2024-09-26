import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchQuery: '',
  linksData: '',
  PreviewData: ''
}

const SearchSlice = createSlice({
  name: 'SearchSlice',
  initialState,
  reducers: {
    SetSearchInput: (state, action) => {
      state.searchQuery = action.payload
    },

  },
})

export const {SetSearchInput} = SearchSlice.actions
export default SearchSlice.reducer; 