import React from 'react';
import * as S from './InputField.style';

interface InputFieldProps {
  title: string;
  name: string;
  value?: string;
  change: React.ChangeEventHandler;
  textarea?: string | boolean;
  type?: string;
  url?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  url,
  type,
  title,
  textarea,
  name,
  change,
  value,
}) => {
  return (
    <S.InputField>
      {title}
      {type === 'file' && (
        <>
          <S.FileUploadLabel htmlFor={name}>Select a {name}...</S.FileUploadLabel>
          <S.FileUpload id={name} type={type} name={name} onChange={change} />
          {url && name === 'image' && (
            <S.Image>
              <img src={url} alt="" />
            </S.Image>
          )}
          {url && name !== 'image' && <S.Iframe src={url} allowFullScreen />}
        </>
      )}
      {type !== 'file' && !textarea && <S.Input name={name} onChange={change} value={value} />}
      {textarea && <S.Area name={name} onChange={change} value={value} />}
    </S.InputField>
  );
};