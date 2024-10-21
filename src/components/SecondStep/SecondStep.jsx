import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  workingFields: Yup.array().min(1, "Select at least one field."),
  employees: Yup.string().required("Number of employees is required"),
  wfhPolicy: Yup.string().required("Please select a WFH policy"),
});

const SecondStep = ({ children, initialValues }) => {
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
      {/* Company Working Fields */}
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-700">
          Company is working on:
        </label>
        <div className="flex flex-col space-y-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              value="Technology"
              {...register("workingFields")}
              className="form-checkbox text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Technology</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              value="Finance"
              {...register("workingFields")}
              className="form-checkbox text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Finance</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              value="Healthcare"
              {...register("workingFields")}
              className="form-checkbox text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Healthcare</span>
          </label>
        </div>
        {errors.workingFields && (
          <span className="text-sm text-red-600">
            {errors.workingFields.message}
          </span>
        )}
      </div>

      {/* Number of Employees */}
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-700">
          Number of employees
        </label>
        <select
          {...register("employees")}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select...</option>
          <option value="1-10">1-10</option>
          <option value="10-20">10-20</option>
          <option value="20-30">20-30</option>
          <option value="40+">40+</option>
        </select>
        {errors.employees && (
          <span className="text-sm text-red-600">
            {errors.employees.message}
          </span>
        )}
      </div>

      {/* WFH Policy */}
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-700">
          WFH Policy
        </label>
        <div className="flex space-x-6">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="Yes"
              {...register("wfhPolicy")}
              className="form-radio text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="No"
              {...register("wfhPolicy")}
              className="form-radio text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">No</span>
          </label>
        </div>
        {errors.wfhPolicy && (
          <span className="text-sm text-red-600">
            {errors.wfhPolicy.message}
          </span>
        )}
      </div>

      {/* Render buttons passed as children */}
      {children(trigger, getValues)}
    </form>
  );
};

export default SecondStep;
