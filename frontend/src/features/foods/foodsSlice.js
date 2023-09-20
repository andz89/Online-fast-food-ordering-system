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
      const { postId, title, content, dateUpdated } = action.payload;
      const existingPost = state.posts.find((post) => post._id === postId);

      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
        existingPost.dateUpdated = dateUpdated;
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
