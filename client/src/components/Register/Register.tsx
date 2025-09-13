import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import type { User } from "../../types/user.types";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const {
    signup,
    errors : RegisterErrors ,
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (data: User) => {
    signup(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Register
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">Username is required</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">Email is required</p>
            )}
          </div>
          <div className="w-full ">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="w-full flex items-center border border-gray-300 rounded-md shadow-sm ">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className="w-full px-3 py-2 mt-1  rounded-md  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register("password", { required: true })}
              />
              {showPassword ? (
                <BsEyeSlash
                  className="mr-2 cursor-pointer text-xl"
                  onClick={handleShowPassword}
                  id="password"
                />
              ) : (
                <BsEye
                  className="mr-2 cursor-pointer text-xl"
                  onClick={handleShowPassword}
                  id="password"
                />
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">Password is required</p>
            )}
          </div>
          <div className="w-full ">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="w-full flex items-center border border-gray-300 rounded-md shadow-sm ">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="current-password"
                className="w-full px-3 py-2 mt-1  rounded-md  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register("confirmPassword", { required: true })}
              />
              {showConfirmPassword ? (
                <BsEyeSlash
                  className="mr-2 cursor-pointer text-xl"
                  onClick={handleShowConfirmPassword}
                  id="confirmPassword"
                />
              ) : (
                <BsEye
                  className="mr-2 cursor-pointer text-xl"
                  onClick={handleShowConfirmPassword}
                  id="confirmPassword"
                />
              )}
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                Confirm Password is required
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </p>
      </div>
      {RegisterErrors.length > 0 && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {RegisterErrors.map((error: string, i: number) => (
            <p key={i}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Register;
