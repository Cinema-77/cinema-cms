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
  value?: any;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  listCheckbox,
  change,
  title,
  value,
}) => {
  return (
    <S.CheckboxField>
      {title}
      {!value && (
        <S.List>
          {listCheckbox.map((item) => (
            <S.Checkbox key={item._id}>
              <input type="checkbox" name={name} value={item._id} onChange={change} />
              {item.name}
            </S.Checkbox>
          ))}
        </S.List>
      )}
      {value && (
        <S.List>
          {listCheckbox.map((item) => (
            <React.Fragment key={item._id}>
              {value.includes(item._id) && (
                <S.Checkbox>
                  <input type="checkbox" name={name} value={item._id} onChange={change} checked />
                  {item.name}
                </S.Checkbox>
              )}
              {!value.includes(item._id) && (
                <S.Checkbox>
                  <input type="checkbox" name={name} value={item._id} onChange={change} />
                  {item.name}
                </S.Checkbox>
              )}
            </React.Fragment>
          ))}
        </S.List>
      )}
    </S.CheckboxField>
  );
};
