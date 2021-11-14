import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  Stack,
  Image,
  useColorModeValue,
  useDisclosure,
  CloseButton,
  Flex,
} from '@chakra-ui/react';
import { ref, uploadBytesResumable, uploadBytes, getDownloadURL } from '@firebase/storage';
import React from 'react';
import { Controller } from 'react-hook-form';
import { MdAdd } from 'react-icons/md';
import * as z from 'zod';

import { Form, InputField, FileUpload } from '@/components';
import { useCreateFood } from '@/features/foods';
import { storage } from '@/lib/firebase';

type FoodValues = {
  name: string;
  price: string;
  unit: string;
  image: string;
};

const schema = z.object({
  name: z.string().nonempty({ message: 'Tên sản phẩm là bắt buộc' }),
  price: z.string().nonempty({ message: 'Giá là bắt buộc' }),
  unit: z.string().nonempty({ message: 'Tên unit là bắt buộc' }),
});

export const FoodCreateModal = () => {
  const bg = useColorModeValue('gray.900', 'white');
  const color = useColorModeValue('white', 'gray.900');

  const initialRef = React.useRef(null);
  const [url, setUrl] = React.useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleImage = async (e: any) => {
    if (e.target.files) {
      const fileName = e.target.files[0];
      const storageRef = ref(storage, `images/${fileName.name}`);
      const uploadTask = uploadBytesResumable(storageRef, fileName);
      await uploadBytes(storageRef, fileName);
      getDownloadURL(uploadTask.snapshot.ref).then((url: any) => setUrl(url));
    }
  };

  const createFoodMutation = useCreateFood();

  return (
    <>
      <Button
        leftIcon={<MdAdd />}
        backgroundColor={bg}
        color={color}
        fontWeight="medium"
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)',
        }}
        onClick={onOpen}
      >
        Thêm sản phẩm
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <Form<FoodValues, typeof schema>
            onSubmit={async (data) => {
              await createFoodMutation.mutateAsync({ ...data, image: url });
              onClose();
            }}
            schema={schema}
          >
            {({ register, formState, control }) => (
              <>
                <ModalHeader fontWeight="bold">Thêm phòng</ModalHeader>
                <ModalCloseButton />
                <ModalBody as={Stack} spacing={5} direction="column">
                  <InputField
                    label="Tên sản phẩm"
                    registration={register('name')}
                    error={formState.errors['name']}
                  />
                  <InputField
                    label="Unit"
                    registration={register('unit')}
                    error={formState.errors['unit']}
                  />
                  <InputField
                    label="Giá"
                    registration={register('price')}
                    error={formState.errors['price']}
                  />
                  <Controller
                    name="image"
                    control={control}
                    render={({ field }) => (
                      <FileUpload
                        label="File"
                        acceptedFileTypes={'image/*'}
                        onChange={(value: any) => {
                          field.onChange(value);
                          handleImage(value);
                        }}
                      />
                    )}
                  />
                  {url && (
                    <Flex>
                      <Image src={url} alt="Image food" boxSize="100px" />
                      <CloseButton
                        size="sm"
                        ml="-25px"
                        colorScheme="teal"
                        onClick={() => setUrl('')}
                      />
                    </Flex>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onClose} mr={3} fontWeight="medium">
                    Trở lại
                  </Button>
                  <Button
                    backgroundColor="cyan.400"
                    color="white"
                    fontWeight="medium"
                    type="submit"
                    _hover={{
                      backgroundColor: 'cyan.700',
                    }}
                    isLoading={createFoodMutation.isLoading}
                  >
                    Thêm sản phẩm
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
