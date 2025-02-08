"use server";
import { z } from "zod";
import type { LoginResponse } from "@/types/auth";

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

export async function signup(prevState: any, formData: FormData) {
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
    console.log("validatedFields data:", validatedFields);

    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields",
    };
  }

  // Simulate API call
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const { step, name, email, password, dob, postalCode } = validatedFields.data;

  try {
    // Here you would typically make an API call to create the user
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
    // console.log("formData:", formData);
    const result = await response.json();
    if (result.status === "success") {
      return {
        message: result.message,
        success: true,
      };
    }
  } catch (error) {
    return {
      message: "Something went wrong!",
      success: false,
    };
  }
}

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function login(prevState: any, formData: FormData) {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      error: "Invalid email or password",
    };
  }

  // Simulate API call
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const { email, password } = validatedFields.data;

  try {
    // Here you would make the actual API call to authenticate the user
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}index.php?endpoint=login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const result: LoginResponse = await response.json();
    if (result.status === "success") {
      return {
        success: true,
        message: result.message,
        userData: result.user,
      };
      // redirect("/");
    }
  } catch (error) {
    return {
      error: "Invalid credentials",
    };
  }
}
