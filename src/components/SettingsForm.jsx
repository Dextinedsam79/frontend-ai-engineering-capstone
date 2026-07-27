import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormField from "./FormField";
import "./SettingsForm.css";

const settingsSchema = z.object({
  fullName: z
    .string({ required_error: "Full name is required" })
    .trim()
    .min(1, "Full name is required")
    .min(2, "Full name must be at least 2 characters"),
  email: z
    .string({ required_error: "Email address is required" })
    .trim()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
});

export default function SettingsForm() {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(settingsSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  useEffect(() => {
    if (!submitSuccess) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [submitSuccess]);

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setSubmitSuccess(true);
    reset(data);
  };

  return (
    <form
      className="settings-form"
      noValidate
      aria-labelledby="settings-heading"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className="settings-form__fieldset">
        <legend id="settings-heading" className="settings-form__legend">
          Profile settings
        </legend>

        <p className="settings-form__description">
          Update your public profile details below.
        </p>

        <FormField
          id="fullName"
          label="Full Name"
          name="fullName"
          autoComplete="name"
          error={errors.fullName}
          registration={register("fullName")}
        />

        <FormField
          id="email"
          label="Email Address"
          name="email"
          type="email"
          autoComplete="email"
          error={errors.email}
          registration={register("email")}
        />

        {submitSuccess && (
          <p
            className="settings-form__success"
            role="status"
            aria-live="polite"
          >
            Settings saved successfully.
          </p>
        )}

        <button
          type="submit"
          className="settings-form__submit"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </fieldset>
    </form>
  );
}
