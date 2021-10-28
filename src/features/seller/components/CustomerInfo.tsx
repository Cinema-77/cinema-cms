import { Input, Box, FormControl, FormLabel, Button } from '@chakra-ui/react';
import * as React from 'react';

interface CustomerInfoProps {
  name: string;
  point: string;
  newPoint: string;
  setModal: () => void;
}

export const CustomerInfo: React.FC<CustomerInfoProps> = (props) => {
  const { name, point, newPoint, setModal } = props;

  return (
    <React.Fragment>
      <FormControl id="first-name" mt={3} display="flex">
        <FormLabel flex={1} flexShrink={0}>
          Tên khách hàng
        </FormLabel>
        <Input flex={1} value={name} isReadOnly />
      </FormControl>
      <FormControl id="first-name" mt={3} display="flex">
        <FormLabel flex={1} flexShrink={0}>
          Điểm tích luỹ
        </FormLabel>
        <Input flex={1} value={point} isReadOnly />
      </FormControl>
      <FormControl id="first-name" mt={3} display="flex">
        <FormLabel flex={1} flexShrink={0}>
          Điểm cộng thêm
        </FormLabel>
        <Input flex={1} value={newPoint} isReadOnly />
      </FormControl>
      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button colorScheme="cyan" color="white" onClick={setModal}>
          Đổi thưởng
        </Button>
      </Box>
    </React.Fragment>
  );
};
