import { Box, Button, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import React from 'react';

// interface formatType {
//   title: string;
//   timeSlots: string[];
// }

// interface ShowTimesItemProps {
//   poster: string;
//   title: string;
//   subTitle: string;
//   ageLimit: string;
//   format: formatType[];
// }

export const ShowTimesItem: React.FC<any> = () => {
  return (
    <Box rounded="md" border="1px" borderColor="gray.300">
      <Box flex="1 1 auto" p={3}>
        <Flex flexWrap="wrap" mx="-3">
          <Box px={3}>
            <Image
              boxSize="200px"
              objectFit="cover"
              src="https://images.unsplash.com/photo-1579762689878-ce41dd75ad98?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80"
              alt="Dan Abramov"
              rounded={4}
            />
          </Box>
          <Stack px={3} spacing={2}>
            <Heading as="h4" fontSize="md">
              Lật Mặt 5: 48H
            </Heading>
            <Text fontSize="md" color="gray.400">
              {' '}
              Face Off - NC18{' '}
            </Text>
            <Box>
              <Text fontSize="md" fontWeight="bold">
                2D Phụ đề Anh
              </Text>
              <Stack spacing={1} direction="row" mt={2}>
                <Button variant="outline">18:15</Button>
                <Button variant="outline">20:00</Button>
              </Stack>
            </Box>
            <Box>
              <Text fontSize="md" fontWeight="bold">
                3D Phụ đề Anh
              </Text>
              <Stack spacing={1} direction="row" mt={2}>
                <Button variant="outline">19:00</Button>
                <Button variant="outline">21:00</Button>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
};
