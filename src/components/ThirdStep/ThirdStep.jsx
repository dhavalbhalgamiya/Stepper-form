import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  planType: Yup.string().required("Plan is required"),
  planStartDate: Yup.date().required("Start date is required").nullable(),
});

// Plans pricing information
const plans = {
  monthly: {
    gold: 50,
    titanium: 100,
  },
  yearly: {
    gold: 500,
    titanium: 1000,
  },
};

const ThirdStep = ({ initialValues, children }) => {
  const {
    register,
    trigger,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  // Retrieve company information (including number of employees) from Redux store
  const companyInfo = useSelector((state) => state.form.companyInfo);

  // Watch form values for updates
  const values = watch();

  // Calculate price based on selected plan and number of employees
  const calculatePrice = () => {
    const employeesCount = parseInt(companyInfo?.employees, 10) || 0;

    if (values.planType && employeesCount > 0) {
      const [billingCycle, planOption] = values.planType.split("-");
      const planPrice = plans[billingCycle]?.[planOption] || 0;
      return planPrice * employeesCount;
    }
    return 0;
  };

  return (
    <form className="space-y-6 text-left">
      {/* Plan Start Date */}
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-700">
          Start Plan Date
        </label>
        <input
          type="date"
          {...register("planStartDate")}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.planStartDate && (
          <span className="text-sm text-red-600">
            {errors.planStartDate.message}
          </span>
        )}
      </div>

      {/* Plan Selection */}
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-700">
          Select a Plan
        </label>
        <div className="space-y-2 flex flex-col">
          <label className="">
            <input
              type="radio"
              value="monthly-gold"
              {...register("planType")}
              className="form-radio text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2">Monthly Gold ($50/user)</span>
          </label>
          <label className="">
            <input
              type="radio"
              value="monthly-titanium"
              {...register("planType")}
              className="form-radio text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2">Monthly Titanium ($100/user)</span>
          </label>
          <label className="">
            <input
              type="radio"
              value="yearly-gold"
              {...register("planType")}
              className="form-radio text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2">Yearly Gold ($500/user)</span>
          </label>
          <label className="">
            <input
              type="radio"
              value="yearly-titanium"
              {...register("planType")}
              className="form-radio text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2">Yearly Titanium ($1000/user)</span>
          </label>
        </div>
        {errors.planType && (
          <span className="text-sm text-red-600">
            {errors.planType.message}
          </span>
        )}
      </div>

      {/* Render buttons passed as children */}
      {children(trigger, getValues)}

      {/* Order Summary */}
      <div className="mt-6 p-4 border rounded-lg shadow-sm bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800">Order Summary</h3>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Plan Type:</span>{" "}
          {values.planType || "Not selected"}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Start Date:</span>{" "}
          {values.planStartDate || "Not selected"}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Number of Employees:</span>{" "}
          {companyInfo?.employees || 0}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Total Price:</span> $
          {calculatePrice()}
        </p>
      </div>
    </form>
  );
};

export default ThirdStep;
