"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";

const steps = [
  {
    id: 1,
    name: "Personal Info",
    fields: ["name", "email", "emailConfirm"],
  },
  {
    id: 2,
    name: "Security",
    fields: ["password", "passwordConfirm"],
  },
  {
    id: 3,
    name: "Additional Info",
    fields: ["dob", "postalCode"],
  },
];

const ProgressIndicator = ({ currentStep }: { currentStep: number }) => (
  <div className="flex justify-between mb-8">
    {steps.map((step) => (
      <div key={step.id} className="flex items-center">
        <div
          className={`
            w-8 h-8 rounded-full flex items-center justify-center
            ${currentStep >= step.id ? "bg-teal-500 text-white" : "bg-gray-200"}
          `}
        >
          {step.id}
        </div>
        {step.id !== steps.length && (
          <div
            className={`w-12 h-1 mx-2 ${
              currentStep > step.id ? "bg-teal-500" : "bg-gray-200"
            }`}
          />
        )}
      </div>
    ))}
  </div>
);

const StepForm = ({
  currentStep,
  formState,
}: {
  currentStep: number;
  formState: any;
}) => (
  <>
    {/* Step 1: Personal Info */}
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{
        opacity: currentStep === 1 ? 1 : 0,
        x: currentStep === 1 ? 0 : 20,
      }}
      className={currentStep === 1 ? "space-y-4" : "hidden"}
    >
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" type="text" required className="w-full" />
        {formState?.errors?.name && (
          <p className="text-red-500 text-sm">{formState.errors.name}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          className="w-full"
        />
        {formState?.errors?.email && (
          <p className="text-red-500 text-sm">{formState.errors.email}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="emailConfirm">Confirm Email</Label>
        <Input
          id="emailConfirm"
          name="emailConfirm"
          type="email"
          required
          className="w-full"
        />
        {formState?.errors?.emailConfirm && (
          <p className="text-red-500 text-sm">
            {formState.errors.emailConfirm}
          </p>
        )}
      </div>
    </motion.div>

    {/* Step 2: Security */}
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{
        opacity: currentStep === 2 ? 1 : 0,
        x: currentStep === 2 ? 0 : 20,
      }}
      className={currentStep === 2 ? "space-y-4" : "hidden"}
    >
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          className="w-full"
        />
        {formState?.errors?.password && (
          <p className="text-red-500 text-sm">{formState.errors.password}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="passwordConfirm">Confirm Password</Label>
        <Input
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          required
          className="w-full"
        />
        {formState?.errors?.passwordConfirm && (
          <p className="text-red-500 text-sm">
            {formState.errors.passwordConfirm}
          </p>
        )}
      </div>
    </motion.div>

    {/* Step 3: Additional Info */}
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{
        opacity: currentStep === 3 ? 1 : 0,
        x: currentStep === 3 ? 0 : 20,
      }}
      className={currentStep === 3 ? "space-y-4" : "hidden"}
    >
      <div className="space-y-2">
        <Label htmlFor="dob">Date of Birth</Label>
        <Input id="dob" name="dob" type="date" required className="w-full" />
        {formState?.errors?.dob && (
          <p className="text-red-500 text-sm">{formState.errors.dob}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="postalCode">Postal Code</Label>
        <Input
          id="postalCode"
          name="postalCode"
          type="text"
          required
          className="w-full"
        />
        {formState?.errors?.postalCode && (
          <p className="text-red-500 text-sm">{formState.errors.postalCode}</p>
        )}
      </div>
    </motion.div>
  </>
);

const NavigationButtons = ({
  currentStep,
  handlePrevious,
  handleNext,
  steps,
}: {
  currentStep: number;
  handlePrevious: () => void;
  handleNext: () => void;
  steps: { id: number; name: string; fields: string[] }[];
}) => (
  <div className="flex justify-between pt-6">
    <Button
      type="button"
      variant="outline"
      onClick={handlePrevious}
      disabled={currentStep === 1}
    >
      <ChevronLeft className="w-4 h-4 mr-2" />
      Previous
    </Button>

    {currentStep < steps.length ? (
      <Button
        type="button"
        onClick={handleNext}
        className="bg-teal-500 hover:bg-teal-600"
      >
        Next
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    ) : (
      <Button type="submit" className="bg-teal-500 hover:bg-teal-600">
        Create Account
      </Button>
    )}
  </div>
);

const SignupSchema = z
  .object({
    step: z.number(),
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    emailConfirm: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirm: z.string(),
    dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
    postalCode: z.string().min(3, "Invalid postal code"),
  })
  .refine((data) => data.email === data.emailConfirm, {
    message: "Emails don't match",
    path: ["emailConfirm"],
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formState, setFormState] = useState({
    errors: {},
    message: "",
    success: false,
  });

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const validatedFields = SignupSchema.safeParse({
      step: Number.parseInt(formData.get("step") as string),
      name: formData.get("name"),
      email: formData.get("email"),
      emailConfirm: formData.get("emailConfirm"),
      password: formData.get("password"),
      passwordConfirm: formData.get("passwordConfirm"),
      dob: formData.get("dob"),
      postalCode: formData.get("postalCode"),
    });

    if (!validatedFields.success) {
      setFormState({
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Invalid fields",
        success: false,
      });
      return;
    }

    const { name, email, password, dob, postalCode } = validatedFields.data;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}index.php?endpoint=register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            date_of_birth: dob,
            postal_code: postalCode,
          }),
        }
      );

      const result = await response.json();
      if (result.status === "success") {
        setFormState({
          errors: {},
          message: result.message,
          success: true,
        });
      } else {
        setFormState({
          errors: {},
          message: result.message,
          success: false,
        });
      }
    } catch (error) {
      setFormState({
        errors: {},
        message: "Something went wrong!",
        success: false,
      });
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 pt-16">
      {/* Left Column */}
      <div className="hidden lg:flex flex-col p-8 bg-teal-50">
        <Link href="/" className="text-2xl font-semibold text-teal-600 mb-auto">
          banquee.
        </Link>
        <div className="space-y-6 max-w-lg">
          <Image
            src="/images/log.svg"
            alt="Financial illustration"
            width={400}
            height={400}
            className="mx-auto"
          />
          <h1 className="text-4xl font-bold">Welcome to Banquee</h1>
          <p className="text-gray-600">
            Start managing your finances faster and better with our secure
            banking platform.
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col justify-center p-8">
        <div className="w-full max-w-md mx-auto space-y-8">
          <ProgressIndicator currentStep={currentStep} />
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="step" value={currentStep} />
            <StepForm currentStep={currentStep} formState={formState} />
            <NavigationButtons
              currentStep={currentStep}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              steps={steps}
            />
            {formState?.message && (
              <p
                className={`text-center ${
                  formState.success ? "text-green-500" : "text-red-500"
                }`}
              >
                {formState.message}
              </p>
            )}
          </form>
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-teal-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
