import React from "react";

export default function FormField({
  id,
  label,
  type = "text",
  name,
  autoComplete,
  error,
  registration,
}) {
  const errorId = `${id}-error`;
  const hasError = Boolean(error);

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={hasError}
        aria-required="true"
        aria-describedby={hasError ? errorId : undefined}
        {...registration}
      />
      {hasError && (
        <p id={errorId} className="form-field__error" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}
