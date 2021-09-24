import { InputField, SelectField } from '@/components';
import { District, getDistrict, getWards, useCities, Ward } from '@/features/auth';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdAdd } from 'react-icons/md';
import { useCreateCinema } from '../api/createCinema';

type Address = {
  districts: District[];
  wards: Ward[];
};

export type CinemaValues = {
  name: string;
  address: {
    city: string;
    district: string;
    ward: string;
    street: string;
  };
};

export const CinemaModalCreate: React.FC<any> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, formState, handleSubmit } = useForm();
  const [address, setAdress] = useState<Address>({ districts: [], wards: [] });
  const initialRef = useRef() as any;
  const cityQuery = useCities();
  const createCinema = useCreateCinema();

  const onChangeCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const code = event.target.value.split('-');
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

  const onCreateCinema: SubmitHandler<CinemaValues> = async (data: CinemaValues) => {
    const { name, address } = data;
    let newCity = address.city.split('-');
    let newWard = address.ward.split('-');
    let newDistrict = address.district.split('-');
    const values = {
      name,
      address: {
        ...address,
        city: newCity[1],
        district: newDistrict[1],
        ward: newWard[1],
      },
    };
    await createCinema.mutateAsync(values);
    onClose();
  };
  const bg = useColorModeValue('gray.900', 'white');
  const color = useColorModeValue('white', 'gray.900');
  return (
    <>
      <Button
        id="add-site-modal-button"
        onClick={onOpen}
        backgroundColor={bg}
        color={color}
        fontWeight="medium"
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)',
        }}
        leftIcon={<MdAdd />}
      >
        Add Cinema
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateCinema)}>
          <ModalHeader fontWeight="bold">Add Cinema</ModalHeader>
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
              placeholder="Thành phố"
              registration={register('address.city')}
              error={formState.errors['address']?.city}
              options={
                cityQuery.data &&
                cityQuery?.data.map((city, _) => ({
                  label: city.name,
                  value: `${city.code}-${city.name}`,
                }))
              }
              onChanging={onChangeCity}
              mt="4"
            />
            <SelectField
              label="Quận / Huyện"
              placeholder="Quận / Huyện"
              registration={register('address.district')}
              error={formState.errors['address']?.district}
              options={address?.districts.map((d) => ({
                label: d.name,
                value: `${d.code}-${d.name}`,
              }))}
              onChanging={onChangeDistrict}
              mt="4"
            />
            <SelectField
              label="Phường"
              placeholder="Phường"
              registration={register('address.ward')}
              error={formState.errors['address']?.ward}
              options={address?.wards.map((d) => ({
                label: d.name,
                value: `${d.code}-${d.name}`,
              }))}
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
              isLoading={createCinema.isLoading}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
