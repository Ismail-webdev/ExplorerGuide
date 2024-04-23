import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import toast from "react-hot-toast";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Required"),
  password: Yup.string().required("Required")
});
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState("");
  const { signIn, signInGoogle } = UserAuth();
  const navigate = useNavigate();

  const signinGoogle = (e) => {
    e.preventDefault();
    setGoogleLoading(true)
    setError("");
    setTimeout(async() => {
    try {
      await signInGoogle();
      navigate("/");
    } catch (error) {
      setGoogleLoading(false)
      setError(error.message);
      toast.error(error.errors);
    } }, 3000);
  };
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await signIn(values.email, values.password);
      toast.success("SignIn Successfully");
      navigate("/");
    } catch (error) {
      setErrors({ submit: error.message });
      toast.error(error.errors || error.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="h-screen bg-gray-100">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={SignInSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Loading..." : "Sign In"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div>
            <button
              onClick={signinGoogle}
              className="mt-2 flex w-full justify-center rounded-md bg-slate-400 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
           {loading ? "Loading...": "SignIn With Google"}
            </button>
          </div>
          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create One Now!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
