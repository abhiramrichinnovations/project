import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
export const loginUser =
createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
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

const data = await res.text();
console.log("DATA:", data);

if (!res.ok) {  
  try {
    const parsed = JSON.parse(data);
    if (parsed.error === "VALIDATION_ERROR" && parsed.details) {
      const firstField = Object.values(parsed.details)[0];
      return thunkAPI.rejectWithValue(
        firstField?.[0] || "Please check your input."
      );
    }
    return thunkAPI.rejectWithValue(
      parsed.error?.replace(/_/g, " ").toLowerCase() 
      || "Login failed."
    );
  } catch {
    return thunkAPI.rejectWithValue(data);
  }
}

try {
  return JSON.parse(data);
} catch {
  return data;
}
  }
);
const authSlice = createSlice({
  name: "auth",
initialState: {

 token: localStorage.getItem("token") || null,
 role: localStorage.getItem("role") || null,
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
      localStorage.removeItem("role");
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
        state.role = action.payload.role;
        state.isLoggedIn = true;

        localStorage.setItem(
          "token",
          action.payload.token
        );
         localStorage.setItem(
          "role",
          action.payload.role
         );
      }
    })

    .addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ||"Login Failed";
    });
    
}
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
