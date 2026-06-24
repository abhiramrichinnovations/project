import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
export const loginUser =
createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
 await new Promise(resolve => setTimeout(resolve, 500));
    const res = await fetch(
      "http://localhost:5000/login",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
     console.log("Sending Login Request");
     console.log("FETCH DONE");

    const data = await res.json();

    console.log("DATA:", data);
return data;
   //return await res.json();
  }
);
const authSlice = createSlice({
  name: "auth",
initialState: {

 token: localStorage.getItem("token") || null,
 isLoggedIn: !!localStorage.getItem("token"),
loading:false,
 error:null,
},
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
  builder

    .addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })

    .addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;

      if (action.payload.token) {
        state.token = action.payload.token;
        state.isLoggedIn = true;

        localStorage.setItem(
          "token",
          action.payload.token
        );
      }
    })

    .addCase(loginUser.rejected, (state) => {
      state.loading = false;
      state.error = "Login Failed";
    });
    
}
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
