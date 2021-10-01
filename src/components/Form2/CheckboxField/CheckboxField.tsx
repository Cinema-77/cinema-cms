import React from 'react';
import * as S from './CheckboxField.style';

interface CheckboxFieldProps {
  name: string;
  change: any;
  title: string;
  listCheckbox: {
    _id: string;
    name: string;
  }[];
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  listCheckbox,
  change,
  title,
}) => {
  return (
    <S.CheckboxField>
      {title}
      <S.List>
        {listCheckbox.map((item) => (
          <S.Checkbox key={item._id}>
            <input type="checkbox" name={name} value={item._id} onChange={change} />
            {item.name}
          </S.Checkbox>
        ))}
      </S.List>
    </S.CheckboxField>
  );
};
