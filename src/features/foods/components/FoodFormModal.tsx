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
  CloseButton,
  Flex,
} from '@chakra-ui/react';
import { ref, uploadBytesResumable, uploadBytes, getDownloadURL } from '@firebase/storage';
import React from 'react';
import { Controller } from 'react-hook-form';
import * as z from 'zod';

import { Form, InputField, FileUpload } from '@/components';
import { FOOD_FORM } from '@/constants';
import { ComBosResponse, useCreateFood, useEditFood } from '@/features/foods';
import { storage } from '@/lib/firebase';
import { useFoodStore } from '@/stores/food';

export type FoodValues = {
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

export const FoodFormModal = () => {
  const {
    isOpen,
    onClose,
    data: dataFood,
    type,
    foodId,
    imageSource,
    setImageSource,
  } = useFoodStore();
  const isAdding = type === FOOD_FORM.ADD;
  const initialRef = React.useRef(null);

  const handleImage = async (e: any) => {
    if (e.target.files) {
      const fileName = e.target.files[0];
      const storageRef = ref(storage, `images/${fileName.name}`);
      const uploadTask = uploadBytesResumable(storageRef, fileName);
      await uploadBytes(storageRef, fileName);
      getDownloadURL(uploadTask.snapshot.ref).then((url: any) => setImageSource(url));
    }
  };

  const createFoodMutation = useCreateFood();
  const editFoodMutation = useEditFood();
  const buttonText = isAdding ? 'Thêm sản phẩm' : 'Chỉnh sửa';

  const saveFood = (type: string, data: FoodValues): Promise<ComBosResponse> => {
    if (type === FOOD_FORM.ADD) {
      return createFoodMutation.mutateAsync({ ...data, image: imageSource });
    }
    return editFoodMutation.mutateAsync({
      data: { ...data, image: imageSource },
      foodId,
    });
  };

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <Form<FoodValues, typeof schema>
            onSubmit={async (data) => {
              await await saveFood(type, data);
              onClose();
            }}
            schema={schema}
            options={{
              defaultValues: dataFood,
            }}
          >
            {({ register, formState, control }) => (
              <>
                <ModalHeader fontWeight="bold">{buttonText}</ModalHeader>
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
                  {imageSource && (
                    <Flex>
                      <Image src={imageSource} alt="Image food" boxSize="100px" />
                      <CloseButton
                        size="sm"
                        ml="-25px"
                        colorScheme="teal"
                        onClick={() => setImageSource('')}
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
                    isLoading={isAdding ? createFoodMutation.isLoading : editFoodMutation.isLoading}
                  >
                    {buttonText}
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
