import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addNewPlayer } from './../../api/playerAPI';
import { PlayerType, DashboardState } from './types';

const initialState: DashboardState = {
  data: {
    playerList: [{
      name: 'Alisson',
      age: 29,
      sport: 'football',
      team: 'brazil'
    },
    {
      name: 'Ederson',
      age: 28,
      sport: 'football',
      team: 'brazil'
    },
    {
      name: 'Marquinhos',
      age: 27,
      sport: 'football',
      team: 'brazil'
    },
    {
      name: 'David de Gea',
      age: 31,
      sport: 'football',
      team: 'spain'
    },
    {
      name: 'Pau Torras',
      age: 25,
      sport: 'football',
      team: 'spain'
    },
    {
      name: 'Diego Llorente',
      age: 28,
      sport: 'football',
      team: 'spain'
    },
    {
      name: 'Dhoni',
      age: 40,
      sport: 'cricket',
      team: 'india'
    },
    {
      name: 'Tendulkar',
      age: 48,
      sport: 'cricket',
      team: 'india'
    },
    {
      name: 'Hardik',
      age: 28,
      sport: 'cricket',
      team: 'india'
    },
    {
      name: 'Maxwell',
      age: 33,
      sport: 'cricket',
      team: 'india'
    },
    {
      name: 'Zampa',
      age: 29,
      sport: 'cricket',
      team: 'india'
    },
    {
      name: 'Wade',
      age: 35,
      sport: 'cricket',
      team: 'india'
    }],
  },
  status: 'idle',
};

export const addPlayer = createAsyncThunk(
  'dashboard/player/addNew',
  async (player: PlayerType) => {
    const response = await addNewPlayer(player);
    return { data: response.data, message: ''};
  }
);

export const counterSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPlayer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addPlayer.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data.playerList.push(action.payload.data);
      })
      .addCase(addPlayer.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default counterSlice.reducer;
