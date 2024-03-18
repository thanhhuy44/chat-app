"use client";

import React, { useState } from "react";
import Input from "@/components/Input";
import { CircleNotch, Eye, EyeSlash } from "@phosphor-icons/react/dist/ssr";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import { signIn } from "next-auth/react";

interface FormInputs {
  email: string;
  password: string;
}

const FormValidate: ZodType<FormInputs> = z.object({
  email: z
    .string({
      required_error: "Can't be empty!",
    })
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email!"),
  password: z
    .string({
      required_error: "Can't be empty!",
    })
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
      "Invalid password!",
    ),
});

export default function LoginForm() {
  const [show, setShow] = useState<boolean>(false);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormValidate),
  });

  const handleLogin = async (data: FormInputs) => {
    event?.preventDefault();
    await signIn("credentials", {
      ...data,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleLogin)}
      className="flex flex-col justify-center gap-y-2"
    >
      <div>
        <Input {...register("email")} placeholder="Email" />
        <p className="mt-1 min-h-3 text-xs font-medium leading-[1] text-red-500">
          {errors.email?.message}
        </p>
      </div>
      <div>
        <Input
          {...register("password")}
          type={show ? "text" : "password"}
          placeholder="Password"
          rightIcon={
            <button type="button" onClick={() => setShow((prev) => !prev)}>
              {show ? <EyeSlash /> : <Eye />}
            </button>
          }
        />
        <p className="mt-1 min-h-3 text-xs font-medium leading-[1] text-red-500">
          {errors.password?.message}
        </p>
      </div>
      <Button
        disabled={isSubmitting}
        type="submit"
        className="flex items-center justify-center disabled:opacity-30"
      >
        {isSubmitting ? (
          <CircleNotch size={24} className="animate-spin" />
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
}
