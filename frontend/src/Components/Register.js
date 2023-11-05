import { TextField } from "@mui/material";
import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { registerUser } from "../api";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router";
import { validateEmail } from "../api/user";
function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailerr, setemailerr] = useState("");
  const navigate = useNavigate();

  const {
    reset,
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors, isSubmitting, isValidating },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phonenumber: "",
    },
  });

  const onSubmit = async (formData) => {
    try {
      console.log("Submitting", formData);

      // Validation for phone number
      if (!/^\d{10}$/.test(formData.phonenumber)) {
        toast.error("phone number not valid ");
      }

      // Validation for email
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
        toast.error("email  not valid ");
      }

      const { data } = await registerUser(formData);
      console.log(data.success, "data");
      if (data.success) {
        toast.success("Registered successfully");
        navigate("/Login");
        reset();
        setValue("name", "");
        setValue("email", "");
        setValue("picture", null);
        setShowPassword(false);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.reponse.data.message);
    }
  };
  const onEmailChange = async (event) => {
    const email = event.target.value;
    const data = await validateEmail(email);
    console.log(data, "Data");

    setemailerr(data.message);

    console.log(emailerr, "s");
  };
  return (
    <div className="flex">
      <div className=" hidden lg:block w-1/2 h-screen bg-blue-400">
        <img
          className="object-cover h-full w-full"
          src="https://img.freepik.com/premium-vector/digital-pay-technology-concept-secure-online-paymentscontactless-payment-system_369728-44.jpg?w=2000"
        />
      </div>
      <div className="flex lg:w-1/2  sm:w-full h-screen justify-center p-20">
        <div className="flex flex-col gap-4">
          <p className="text-gray-500">New User? </p>
          <h1 className="font-bold text-3xl font-mono">Register</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5 my-10">
              <div className="">
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  className="w-full rounded-lg text-white"
                  {...register("name")}
                />
              </div>
              <div className="">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  className="w-full rounded-lg text-white"
                  {...register("email")}
                  onChange={(e) => {
                    onEmailChange(e);
                  }}
                />
                {emailerr && (
                  <div className={"text-red-500 font-bold"}>{emailerr}</div>
                )}
              </div>

              <div className="">
                <TextField
                  id="outlined-basic"
                  label="phonenumber"
                  variant="outlined"
                  className="w-full rounded-lg text-white"
                  {...register("phonenumber")}
                />
              </div>
              <div className="relative">
                {/* p-2 mt-3 rounded-2xl border w-full */}
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  className="w-full rounded-lg text-white"
                  type={showPassword ? "text" : "password"}
                  placeholder="enter  a password"
                  {...register("password")}
                />
                <div
                  className="absolute top-8 right-1 translate-x-[-50%] translate-y-[-50%] hover:cursor-pointer"
                  onClick={() => {
                    setShowPassword((showPassword) => !showPassword);
                  }}
                >
                  {showPassword ? (
                    <AiFillEye size={20} />
                  ) : (
                    <AiFillEyeInvisible size={20} />
                  )}
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm italic">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex mx-10 p-5">
              <p
                className="
            text-gray-500 
          
            "
              >
                Already have an account?{" "}
              </p>

              <p
                className="text-blue-500 hover: cursor-pointer"
                onClick={() => {
                  navigate("/Login");
                }}
              >
                {"  "}
                Sign In
              </p>
            </div>
            <button className="py-2 px-10 mx-24 my-4 bg-blue-400  text-white  rounded-xl hover:bg-blue-500 hover:text-white hover:scale-110 duration-300">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
