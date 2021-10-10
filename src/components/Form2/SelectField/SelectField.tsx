import React from 'react';

import * as S from './SelectField.style';
interface SelectFieldProps {
  name: string;
  title: string;
  List: any;
  change: any;
}

export const SelectField: React.FC<SelectFieldProps> = ({ List, change, title, name }) => {
  return (
    <S.SelectField>
      {title}
      <S.Select name={name} onChange={change}>
        <S.Option value="" hidden>
          Mời chọn {title}
        </S.Option>
        {List.map((item: any) => (
          <S.Option key={item._id} value={item._id}>
            {item.name}
          </S.Option>
        ))}
      </S.Select>
    </S.SelectField>
  );
};
