
import React from 'react';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ children, ...props }) => {
  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" {...props}>
      {children}
    </form>
  );
};

export default Form;
