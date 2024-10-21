import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveCompanyInfo,
  savePersonalInfo,
  savePlanSelection,
} from "../../redux/formSlice";
import FirstStep from "../FirstStep/FirstStep";
import SecondStep from "../SecondStep/SecondStep";
import ThirdStep from "../ThirdStep/ThirdStep";

const steps = ["Personal Info", "Company Info", "Plan Selection"];

const StepperComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);

  const handleNext = async (trigger, getValues) => {
    const isValid = await trigger();
    if (!isValid) return;
    const values = getValues();
    if (activeStep === 0) dispatch(savePersonalInfo(values));
    if (activeStep === 1) dispatch(saveCompanyInfo(values));
    if (activeStep === 2) {
      dispatch(savePlanSelection(values));
      alert("Data Submitted successfully");
      console.log(formData);
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const renderStepContent = (step, buttonWrapper) => {
    switch (step) {
      case 0:
        return (
          <FirstStep initialValues={formData.personalInfo}>
            {buttonWrapper}
          </FirstStep>
        );
      case 1:
        return (
          <SecondStep initialValues={formData.companyInfo}>
            {buttonWrapper}
          </SecondStep>
        );
      case 2:
        return (
          <ThirdStep initialValues={formData.planSelection}>
            {buttonWrapper}
          </ThirdStep>
        );
      default:
        return null;
    }
  };

  const buttonWrapper = (trigger, getValues) => {
    return (
      <div className="flex justify-between mt-4">
        {activeStep > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Back
          </button>
        )}
        <button
          type="button"
          onClick={() => handleNext(trigger, getValues)}
          className={`${
            activeStep < steps.length - 1
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-green-500 hover:bg-green-600"
          } text-white py-2 px-4 rounded`}
        >
          {activeStep < steps.length - 1 ? "Next" : "Submit"}
        </button>
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 p-4 bg-white shadow-md rounded-md">
      <div className="mb-6">
        <p className="text-2xl font-bold capitalize">Stepper form App</p>
      </div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          {steps.map((label, index) => (
            <div
              key={label}
              className={`flex-1 text-center ${
                activeStep === index
                  ? "font-semibold text-blue-500"
                  : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 mx-auto mb-2 flex items-center justify-center rounded-full ${
                  activeStep === index
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {index + 1}
              </div>
              <div className=" hidden md:inline-flex">{label}</div>
            </div>
          ))}
        </div>

        <div className="h-1 bg-gray-300">
          <div
            className="bg-blue-500 h-full transition-all duration-300"
            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      {renderStepContent(activeStep, buttonWrapper)}
    </div>
  );
};

export default StepperComponent;
