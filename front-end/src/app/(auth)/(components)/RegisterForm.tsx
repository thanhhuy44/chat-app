"use client";

import React, { useState } from "react";
import Input from "@/components/Input";
import { CircleNotch, Eye, EyeSlash } from "@phosphor-icons/react/dist/ssr";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import createCustomFetch from "@/utils/client";
import { ApiResponse } from "@/types";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface FormInputs {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const FormValidate: ZodType<FormInputs> = z
  .object({
    fullName: z
      .string({
        required_error: "Can't be empty!",
      })
      .trim()
      .refine((data) => data.trim() !== "", {
        message: "Can't be empty!",
      }),
    email: z
      .string({
        required_error: "Can't be empty!",
      })
      .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email!")
      .refine((data) => data.trim() !== "", {
        message: "Can't be empty!",
      }),
    password: z
      .string({
        required_error: "Can't be empty!",
      })
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
        "Invalid password!",
      )
      .refine((data) => data.trim() !== "", {
        message: "Can't be empty!",
      }),
    confirmPassword: z.string({
      required_error: "Can't be empty!",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Not match!",
        path: ["confirmPassword"],
      });
    }
  });

export default function RegisterForm() {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const [confirmShow, setConfirmShow] = useState<boolean>(false);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormValidate),
  });

  const fetch = createCustomFetch({
    method: "POST",
  });

  const handleRegister = async (data: FormInputs) => {
    const response: ApiResponse = await fetch("/auth/register", data);
    if (response.statusCode === 201) {
      toast("Register success!", {
        icon: "👌",
      });
      router.push("/login");
    } else {
      toast(response.message || "Something went wrong!", {
        icon: "🤌",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="flex flex-col justify-center gap-y-2"
    >
      <div>
        <Input {...register("fullName")} placeholder="Your name" />
        <p className="mt-1 min-h-3 text-xs font-medium leading-[1] text-red-500">
          {errors.fullName?.message}
        </p>
      </div>
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
      <div>
        <Input
          {...register("confirmPassword")}
          type={confirmShow ? "text" : "password"}
          placeholder="Password"
          rightIcon={
            <button type="button" onClick={() => setShow((prev) => !prev)}>
              {confirmShow ? <EyeSlash /> : <Eye />}
            </button>
          }
        />
        <p className="mt-1 min-h-3 text-xs font-medium leading-[1] text-red-500">
          {errors.confirmPassword?.message}
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
          "Register"
        )}
      </Button>
    </form>
  );
}
