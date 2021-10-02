import {
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  IconButton,
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
  useDisclosure,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import React from 'react';
import FocusLock from 'react-focus-lock';
import { UseFormRegisterReturn } from 'react-hook-form';
import { MdAdd } from 'react-icons/md';
import { FieldWrapper, FieldWrapperPassThroughProps, Form, InputField } from '.';

type TimeValues = {
  time: string;
};
const FormPopover = ({ onCancel }: any) => {
  return (
    <Form<TimeValues>
      onSubmit={async (data) => {
        console.log(data);
      }}
    >
      {({ register, formState }) => (
        <Stack spacing={4}>
          <InputField
            type="text"
            label="Add time"
            registration={register('time')}
            error={formState.errors['time']}
          />
          <ButtonGroup d="flex" justifyContent="flex-end">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button colorScheme="teal" type="submit">
              Save
            </Button>
          </ButtonGroup>
        </Stack>
      )}
    </Form>
  );
};

interface CheckBoxFieldProps extends FieldWrapperPassThroughProps {
  defaultValue?: string[];
  registration: Partial<UseFormRegisterReturn>;
  options: string[];
  more?: boolean;
}

export const CheckBoxField: React.FC<CheckBoxFieldProps> = (props) => {
  const { label, options, error, defaultValue, more, registration } = props;
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  return (
    <FieldWrapper label={label} error={error} fieldset={true}>
      <CheckboxGroup colorScheme="cyan" defaultValue={defaultValue}>
        <Wrap>
          {options.map((o, index) => (
            <WrapItem key={`${index}-${o}`}>
              <Checkbox value={o} {...registration}>
                {o}
              </Checkbox>
            </WrapItem>
          ))}
          {more && (
            <>
              <IconButton aria-label="add time" size="xs" icon={<MdAdd />} onClick={onOpen} />

              <Modal isOpen={isOpen} initialFocusRef={firstFieldRef} onClose={onClose}>
                <ModalOverlay />
                <ModalContent p={5}>
                  <FocusLock returnFocus persistentFocus={false}>
                    <FormPopover firstFieldRef={firstFieldRef} onCancel={onClose} />
                  </FocusLock>
                </ModalContent>
              </Modal>
            </>
          )}
        </Wrap>
      </CheckboxGroup>
    </FieldWrapper>
  );
};
