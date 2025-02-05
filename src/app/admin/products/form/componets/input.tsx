import React from 'react';
import {
    Controller,
    UseControllerProps,
    ControllerRenderProps,
    FieldErrors,
    useForm,
  } from 'react-hook-form';
  const { isEmpty } = require('lodash');
  
  type InputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & { label?: string; propRef?: any } & UseControllerProps;
  
  export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, name, rules, control, propRef, type, ...props }, ref) => {
      return (
        <Controller
          rules={rules}
          name={name}
          control={control}
          render={({ field, formState: { errors } }) => {
            field.value = isEmpty(field.value) ? '' : field.value;
            return (
              <>
                {label ? (
                  <label className="font-bold">
                    {label}{' '}
                    {rules.required ? (
                      <span className="text-red-500 text-base">*</span>
                    ) : null}
                  </label>
                ) : null}
                {InputRender({
                  field,
                  type,
                  errors,
                  props,
                  ref,
                  name,
                  propRef,
                })}
  
                {errors?.[name]?.message ? (
                  <p className="text-red-500">{errors[name].message}</p>
                ) : null}
              </>
            );
          }}
        />
      );
    }
  );
  
  type inputRenderParams = {
    field: ControllerRenderProps;
    errors: FieldErrors;
    ref;
    props;
    type;
    name;
    propRef;
  };
  
  function InputRender(data: inputRenderParams) {
    const { field, errors, ref, props, type, name, propRef } = data;
  
    if (type == 'text' || !type) {
      return (
        <input
          {...field}
          className={isEmpty(errors[name]) ? '' : 'ring-1 !ring-red-500'}
          type="text"
          ref={ref}
          {...props}
        />
      );
    }
  
    if (type == 'textarea') {
      return (
        <textarea
          {...field}
          value={props.value || ''}
          className={isEmpty(errors[name]) ? '' : 'ring-1 !ring-red-500'}
          ref={ref}
          {...props}
        />
      );
    }
  
    if (type == 'file') {
      return (
        <input
          className={isEmpty(errors[name]) ? '' : 'ring-1 !ring-red-500'}
          type="file"
          ref={(e) => {
            if (propRef) {
              field.ref(e);
              propRef.current = e;
            }
          }}
          onChange={async (event) => {
            const files = [];
            field.onChange([...event.target.files]);
          }}
          {...props}
        />
      );
    }
  }
  
  Input.displayName = 'Input';
  export default Input;
  