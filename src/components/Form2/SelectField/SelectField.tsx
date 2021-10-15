import React from 'react';

import * as S from './SelectField.style';
interface SelectFieldProps {
  name: string;
  title: string;
  List: any;
  change: any;
  value?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({ List, change, title, name, value }) => {
  return (
    <S.SelectField>
      {title}
      {value && (
        <S.Select name={name} onChange={change} value={value}>
          {List.map((item: any) => (
            <S.Option key={item._id} value={item._id}>
              {item.name}
            </S.Option>
          ))}
        </S.Select>
      )}
      {!value && (
        <S.Select name={name} onChange={change}>
          <S.Option value="" hidden>
            Mời bạn chọn...
          </S.Option>
          {List.map((item: any) => (
            <S.Option key={item._id} value={item._id}>
              {item.name}
            </S.Option>
          ))}
        </S.Select>
      )}
    </S.SelectField>
  );
};
