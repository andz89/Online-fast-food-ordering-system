//local mutation
import { createSlice } from "@reduxjs/toolkit";
import { sub } from "date-fns";
const initialState = {
  foods: [],
};

const foodsSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {
    foodAdded: {
      reducer(state, action) {
        state.foods.push(action.payload);
      },
      prepare({
        food_name,
        price,
        description,
        createdAt,
        updatedAt,
        _id,
        image_one,
        image_two,
      }) {
        return {
          payload: {
            image_two,
            image_one,
            food_name,
            price,
            description,
            createdAt,
            updatedAt,
            _id,
          },
        };
      },
    },
    foodsFetched: (state, action) => {
      // Update the state with the posts received from the server
      state.foods = action.payload;
    },

    foodEditted: (state, action) => {
      const {
        foodId,
        food_name,
        price,
        description,
        image_one,
        image_two,
        updatedAt,
      } = action.payload;
      const existingFood = state.foods.find((food) => food._id === foodId);

      if (existingFood) {
        existingFood.food_name = food_name;
        existingFood.description = description;
        existingFood.price = price;
        existingFood.image_one = image_one;
        existingFood.image_two = image_two;
        existingFood.updatedAt = updatedAt;
      }
    },
    removeFood: (state, action) => {
      const { foodId } = action.payload;
      const foods = state.foods.filter((food) => food._id !== foodId);

      if (foods) {
        state.foods = foods;
      }
    },
  },
});

export const { foodAdded, foodsFetched, removeFood, foodEditted } =
  foodsSlice.actions;

export default foodsSlice.reducer;
