import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { Input } from "../../components/UI/Input";
import { notify } from "../../utility/notify";
import { registerUser,clearState as clearAuthState } from "../../slice/auth/authSlice";

const Register = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const dispatch = useDispatch();

  const { isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (isSuccess && !isLoading) {
      notify("Registration Successful!", "success");
      setFormData({ name: "", email: "", password: "" });
      dispatch(clearAuthState());
    }

    if (isError && !isLoading) {
      notify(message || "Registration Failed", "error");
      dispatch(clearAuthState());
    }
  }, [isSuccess, isError, isLoading]);

  return (
    <div
      className={`max-w-xl mx-auto p-4 rounded-lg shadow space-y-4 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-xl font-semibold">Register New Customer</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            label="Name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <Input
            label="Email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <Input
            label="Password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isLoading ? <CircularProgress size={20} /> : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
