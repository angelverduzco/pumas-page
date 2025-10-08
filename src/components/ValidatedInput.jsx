import { useState } from "react";

export default function ValidatedInput({
  label,
  type,
  value,
  onChange,
  validationFn,
  onValidationChange,
}) {
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(true);

  const handleBlur = (value) => {
    const validationResult = validationFn ? validationFn(value) : null;

    const newIsValid = validationResult === null;

    setIsValid(newIsValid);
    setError(validationResult);

    if (onValidationChange) {
      onValidationChange(newIsValid);
    }
  };

  return (
    <div className="validated-input">
      <label>
        {label}
        <input
          type={type}
          value={value}
          onChange={onChange}
          aria-invalid={!isValid}
          aria-describedby={`${label}-error`}
          onBlur={() => handleBlur(value)}
        />
      </label>
      {error ? (
        <span id={`${label}-error`} className="error-message">
          {error}
        </span>
      ) : null}
    </div>
  );
}
