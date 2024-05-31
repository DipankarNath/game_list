import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { PlayerType, DashboardState } from './types';
import { addNewPlayer, updateExistingPlayer } from './../../api/playerAPI';

const initialState: DashboardState = {
  data: {
    playerList: [{
      id: '047adb69-a9e4-4993-bec1-cf22e31f98f3',
      name: 'Alisson',
      age: 29,
      sport: 'football',
      team: 'brazil'
    },
    {
      id: 'c1eb6a51-c9b2-4204-abee-1b1ba7ad544d',
      name: 'Ederson',
      age: 28,
      sport: 'football',
      team: 'brazil'
    },
    {
      id: 'b7b01fdd-6833-49a6-9c12-6dad2174e110',
      name: 'Marquinhos',
      age: 27,
      sport: 'football',
      team: 'brazil'
    },
    {
      id: '8ec1d365-1a17-4830-bf54-333c31d9eb34',
      name: 'David de Gea',
      age: 31,
      sport: 'football',
      team: 'spain'
    },
    {
      id: '80e4b04b-bf2c-47a6-abca-8f6a2ba3a248',
      name: 'Pau Torras',
      age: 25,
      sport: 'football',
      team: 'spain'
    },
    {
      id: '96e49c3b-736e-4477-9e71-cec957bf60e3',
      name: 'Diego Llorente',
      age: 28,
      sport: 'football',
      team: 'spain'
    },
    {
      id: '6dac4cfb-e513-4dec-ba8c-32d9607dd9ad',
      name: 'Dhoni',
      age: 40,
      sport: 'cricket',
      team: 'india'
    },
    {
      id: '66a025b4-e324-4e9b-bc56-04b6a63f2fd4',
      name: 'Tendulkar',
      age: 48,
      sport: 'cricket',
      team: 'india'
    },
    {
      id: 'bace81bc-ce42-4076-8a8a-6dd02a5e2de1',
      name: 'Hardik',
      age: 28,
      sport: 'cricket',
      team: 'india'
    },
    {
      id: '7feac36f-c661-4e04-8099-618208d6a2b1',
      name: 'Maxwell',
      age: 33,
      sport: 'cricket',
      team: 'india'
    },
    {
      id: 'cdd647e7-8ded-4339-bb23-949dd3d428eb',
      name: 'Zampa',
      age: 29,
      sport: 'cricket',
      team: 'india'
    },
    {
      id: '626ef3f6-3658-46db-8e65-ec97d5685b69',
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
    const response = await addNewPlayer({ id: uuidv4(), ...player });
    return { data: response.data, message: ''};
  }
);

export const updatePlayer = createAsyncThunk(
  'dashboard/player/updatePlayer',
  async (player: PlayerType) => {
    const response = await updateExistingPlayer(player);
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
      })
      .addCase(updatePlayer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePlayer.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.data.playerList.findIndex(item => item.id === action.payload.data.id);
        if (index !== -1) {
          state.data.playerList[index] = { ...state.data.playerList[index], ...action.payload.data };
        }
      })
      .addCase(updatePlayer.rejected, (state) => {
        state.status = 'failed';
      })
  },
});

export default counterSlice.reducer;
