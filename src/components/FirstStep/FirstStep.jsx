import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  companyName: Yup.string().required("Company Name is required"),
  companyWebsite: Yup.string().required("Company Website is required"),
  state: Yup.string().required("State is required"),
  zipCode: Yup.string().required("Zip Code is required"),
});

const FirstStep = ({ initialValues, children }) => {
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  return (
    <form className="space-y-6 text-left">
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          {...register("firstName")}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your first name"
        />
        {errors.firstName && (
          <span className="text-sm text-red-600">
            {errors.firstName.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          {...register("lastName")}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your last name"
        />
        {errors.lastName && (
          <span className="text-sm text-red-600">
            {errors.lastName.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-700">Email</label>
        <input
          {...register("email")}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
        />
        {errors.email && (
          <span className="text-sm text-red-600">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-700">
          Company Name
        </label>
        <input
          {...register("companyName")}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your company name"
        />
        {errors.companyName && (
          <span className="text-sm text-red-600">
            {errors.companyName.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-700">
          Company Website
        </label>
        <input
          {...register("companyWebsite")}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your company website"
        />
        {errors.companyWebsite && (
          <span className="text-sm text-red-600">
            {errors.companyWebsite.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-700">State</label>
        <select
          {...register("state")}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a state</option>
          <option value="California">California</option>
          <option value="Texas">Texas</option>
          <option value="New York">New York</option>
          {/* Add more states as needed */}
        </select>
        {errors.state && (
          <span className="text-sm text-red-600">{errors.state.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-700">
          Zip Code
        </label>
        <input
          {...register("zipCode")}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your zip code"
        />
        {errors.zipCode && (
          <span className="text-sm text-red-600">{errors.zipCode.message}</span>
        )}
      </div>

      {/* Render the buttons passed as children */}
      {children(trigger, getValues)}
    </form>
  );
};

export default FirstStep;
