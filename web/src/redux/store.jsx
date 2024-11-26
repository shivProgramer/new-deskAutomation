import { configureStore } from '@reduxjs/toolkit';
import Auth_slice from "./slice/Auth_slice";
import Project_cost_slice from "./slice/Project_cost_slice"
import Emplopyee_slice from "./slice/Emplopyee_slice"
const store = configureStore({
  reducer: {
    auth: Auth_slice,
    projects : Project_cost_slice,
    employee: Emplopyee_slice,
  },
});

export default store;