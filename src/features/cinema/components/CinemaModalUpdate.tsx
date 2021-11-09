import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { MdSettings } from 'react-icons/md';
import * as z from 'zod';

import { useUpdateCinema } from '../api/updateCinema';

import { Form, InputField, SelectField } from '@/components';
import { useCities, getDistrict, getWards, District, Ward } from '@/features/auth';

type Address = {
  districts: District[];
  wards: Ward[];
};

type CinemaValues = {
  _id: string;
  name: string;
  address: {
    city: string;
    district: string;
    ward: string;
    street: string;
  };
};

const schema = z.object({
  name: z.string().nonempty({ message: 'Tên rạp là bắt buộc' }),
  address: z.object({
    city: z.string().nonempty({ message: 'Thành phố là bắt buộc' }),
    district: z.string().nonempty({ message: 'Quận/Huyện là bắt buộc' }),
    ward: z.string().nonempty({ message: 'Phường/Xã là bắt buộc' }),
    street: z.string().nonempty({ message: 'Đường là bắt buộc' }),
  }),
});

export const CinemaModalUpdate: React.FC<CinemaValues> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [address, setAdress] = useState<Address>({ districts: [], wards: [] });
  const initialRef = useRef() as any;
  const cityQuery = useCities();
  const cinemaUpdateMutation = useUpdateCinema();
  const cl = useColorModeValue('white', 'gray.900');

  const onChangeCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const code = event.target.value.split('-');
    console.log(code);
    if (code.length > 1) {
      setAdress({ districts: [], wards: [] });
      getDistrict(code[0]).then((res) => setAdress({ districts: res.districts, wards: [] }));
    }
  };

  const onChangeDistrict = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const code = event.target.value.split('-');
    if (code.length > 1) {
      setAdress({ ...address, wards: [] });
      getWards(code[0]).then((res) => setAdress({ ...address, wards: res.wards }));
    }
  };

  const onUpdateCinema = async (data: CinemaValues) => {
    const { name, address } = data;
    const newCity = address.city.split('-');
    const newWard = address.ward.split('-');
    const newDistrict = address.district.split('-');

    const values = {
      name,
      address: {
        ...address,
        city: newCity.length < 2 ? newCity[0] : newCity[1],
        district: newDistrict.length < 2 ? newDistrict[0] : newDistrict[1],
        ward: newWard.length < 2 ? newWard[0] : newWard[1],
      },
    };
    await cinemaUpdateMutation.mutateAsync({ data: values, cinemaId: props._id });
  };

  return (
    <>
      <Button
        leftIcon={<MdSettings />}
        colorScheme="cyan"
        color={cl}
        variant="solid"
        onClick={onOpen}
      >
        Edit
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <Form<CinemaValues, typeof schema>
            onSubmit={async (data) => {
              await onUpdateCinema(data);
              onClose();
            }}
            options={{ defaultValues: props }}
            schema={schema}
          >
            {({ register, formState }) => (
              <>
                <ModalHeader fontWeight="bold">Update Cinema</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <InputField
                    type="text"
                    label="Tên Rạp Phim"
                    error={formState.errors['name']}
                    registration={register('name')}
                  />
                  <SelectField
                    label="Thành phố"
                    registration={register('address.city')}
                    error={formState.errors['address']?.city}
                    defaultValue={props.address.city}
                    options={
                      cityQuery.data &&
                      cityQuery?.data.map((city) => ({
                        label: city.name,
                        value: `${city.code}-${city.name}`,
                      }))
                    }
                    onChanging={onChangeCity}
                    mt="4"
                  />
                  <SelectField
                    label="Quận / Huyện"
                    registration={register('address.district')}
                    error={formState.errors['address']?.district}
                    options={address?.districts.map((d) => ({
                      label: d.name,
                      value: `${d.code}-${d.name}`,
                    }))}
                    defaultValue={props.address.district}
                    onChanging={onChangeDistrict}
                    mt="4"
                  />
                  <SelectField
                    label="Phường"
                    registration={register('address.ward')}
                    error={formState.errors['address']?.ward}
                    options={address?.wards.map((d) => ({
                      label: d.name,
                      value: `${d.code}-${d.name}`,
                    }))}
                    defaultValue={props.address.ward}
                    mt="4"
                  />
                  <InputField
                    type="text"
                    label="Đường"
                    error={formState.errors['address']?.street}
                    registration={register('address.street')}
                    mt="4"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onClose} mr={3} fontWeight="medium">
                    Cancel
                  </Button>
                  <Button
                    backgroundColor="cyan.400"
                    color="white"
                    fontWeight="medium"
                    type="submit"
                    _hover={{
                      backgroundColor: 'cyan.700',
                    }}
                    isLoading={cinemaUpdateMutation.isLoading}
                  >
                    Update
                  </Button>
                </ModalFooter>
              </>
            )}
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
};
