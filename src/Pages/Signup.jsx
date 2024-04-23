import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Signup = () => {
    const navigate = useNavigate();
    const { createUser } = UserAuth();

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            await createUser(values.email, values.password);
            toast.success("SignUp Successful");
            navigate('/');
        } catch (error) {
            setErrors({ form: error.errors || error.message || "Something went wrong" });
            toast.error(error.errors || error.message || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="h-screen bg-white">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign up for a free account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={SignupSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-6">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email Address
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <Field
                                            type="email"
                                            name="email"
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Enter Your Email"
                                        />
                                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Password
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <Field
                                            type="password"
                                            name="password"
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Enter Password"
                                        />
                                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Loading...." : "Sign Up"}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already Have an account?{" "}
                        <Link
                            to="/"
                            className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
                        >
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;