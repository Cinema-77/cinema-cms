import { Input, Box, FormControl, FormLabel, Button } from '@chakra-ui/react';
import * as React from 'react';

interface MemberInfoProps {
  name: string;
  point: number;
  newPoint: number;
  screenId: string;
  setModal: () => void;
  fetchGifts: (screenId: string) => Promise<boolean>;
}

export const MemberInfo: React.FC<MemberInfoProps> = (props) => {
  const { name, point, newPoint, setModal, fetchGifts, screenId } = props;

  return (
    <React.Fragment>
      <FormControl id="name" mt={3} display="flex">
        <FormLabel flex={1} flexShrink={0}>
          Tên khách hàng
        </FormLabel>
        <Input flex={1} value={name} isReadOnly />
      </FormControl>
      <FormControl id="point" mt={3} display="flex">
        <FormLabel flex={1} flexShrink={0}>
          Điểm tích luỹ
        </FormLabel>
        <Input flex={1} value={point} isReadOnly />
      </FormControl>
      <FormControl id="point can add" mt={3} display="flex">
        <FormLabel flex={1} flexShrink={0}>
          Điểm cộng thêm
        </FormLabel>
        <Input flex={1} value={newPoint} isReadOnly />
      </FormControl>
      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button
          colorScheme="cyan"
          color="white"
          onClick={async () => {
            setModal();
            await fetchGifts(screenId);
          }}
        >
          Đổi thưởng
        </Button>
      </Box>
    </React.Fragment>
  );
};
