import React from 'react';

interface ErrorMessageProps {
  name: string;
  errors: any;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ errors, name }) => {
  const error = errors[name];
  return (
    <div
      style={{
        color: '#ff424f',
        fontSize: '10px',
        fontWeight: 'bold',
        paddingTop: '0.5rem',
      }}
    >
      {error && error.message}
    </div>
  );
};
