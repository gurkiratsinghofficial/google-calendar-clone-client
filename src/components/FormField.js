import { ErrorMessage, Field } from "formik";
import React from "react";
/**
 * @description: returns input field
 * @param {string} type @description: input type
 * @param {string} type @description: input name
 * @param {string} type @description: input label
 */
function FormField({ type, name, label }) {
  return (
    <div>
      <p className="field-name">{label}</p>
      <Field type={type} name={name} />
      <p className="error">
        <ErrorMessage className="error" name={name} />
      </p>
    </div>
  );
}

export default FormField;
