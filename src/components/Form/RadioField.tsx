import { FormControlProps, Radio, RadioGroup, Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from '.';

interface OptionsRadio {
  title: string;
  value: any;
}

interface RadioFieldProps extends FieldWrapperPassThroughProps, FormControlProps {
  options: OptionsRadio[];
  defaultValue?: any;
  registration: Partial<UseFormRegisterReturn>;
}

export const RadioField: React.FC<RadioFieldProps> = (props) => {
  const { options, label, registration, defaultValue, error } = props;

  return (
    <FieldWrapper label={label} error={error} fieldset={true}>
      <RadioGroup defaultValue={defaultValue}>
        <Wrap spacing="24px">
          {options.map((o) => (
            <WrapItem key={o.title}>
              <Radio value={o.value} {...registration}>
                {o.title}
              </Radio>
            </WrapItem>
          ))}
        </Wrap>
      </RadioGroup>
    </FieldWrapper>
  );
};
