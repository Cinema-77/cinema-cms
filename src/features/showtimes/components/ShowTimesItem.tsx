import { Box, Button, Flex, Heading, Img, Stack, Text } from '@chakra-ui/react';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { ShowTimesListByDate, ShowTimesDetail } from '..';

export const ShowTimesItem: React.FC<ShowTimesListByDate> = (props) => {
  const { movie, screen2D, screen3D, screenIMAX } = props;
  const shouldHide = (showtimes: ShowTimesDetail[]) => !showtimes.length;

  return (
    <Box rounded="md" border="1px" borderColor="gray.300">
      <Box flex="1 1 auto" p={3}>
        <Flex flexWrap="wrap" mx="-3">
          <Box px={3} flexShrink={0}>
            <Img
              src={movie.image}
              alt={movie.name}
              rounded={4}
              loading="lazy"
              htmlHeight="300px"
              htmlWidth="250px"
            />
          </Box>
          <Stack px={3} spacing={2} flex={1}>
            <Heading as="h4" fontSize="md">
              {movie.name}
            </Heading>
            <Text fontSize="md" color="gray.400">
              {/* {movie.moveDuration} phút */}
              {movie.description}
            </Text>

            {!shouldHide(screen2D.showTimesDetails) && (
              <Box>
                <Text fontSize="md" fontWeight="bold">
                  {screen2D.title} phụ đề Anh
                </Text>
                <Stack spacing={1} direction="row" mt={2}>
                  {screen2D.showTimesDetails.map((showtime) => (
                    <Button
                      as={Link}
                      to={`/seller/bookTicket/${showtime._id}`}
                      variant="outline"
                      key={showtime._id}
                    >
                      {showtime.timeSlot.time}
                    </Button>
                  ))}
                </Stack>
              </Box>
            )}

            {!shouldHide(screen3D.showTimesDetails) && (
              <Box>
                <Text fontSize="md" fontWeight="bold">
                  {screen3D.title} phụ đề Anh
                </Text>
                <Stack spacing={1} direction="row" mt={2}>
                  {screen3D.showTimesDetails.map((showtime) => (
                    <Button
                      as={Link}
                      to={`/seller/bookTicket/${showtime._id}`}
                      variant="outline"
                      key={showtime._id}
                    >
                      {showtime.timeSlot.time}
                    </Button>
                  ))}
                </Stack>
              </Box>
            )}

            {!shouldHide(screenIMAX.showTimesDetails) && (
              <Box>
                <Text fontSize="md" fontWeight="bold">
                  {screenIMAX.title} phụ đề Anh
                </Text>
                <Stack spacing={1} direction="row" mt={2}>
                  {screenIMAX.showTimesDetails.map((showtime) => (
                    <Button
                      as={Link}
                      to={`/seller/bookTicket/${showtime._id}`}
                      variant="outline"
                      key={showtime._id}
                    >
                      {showtime.timeSlot.time}
                    </Button>
                  ))}
                </Stack>
              </Box>
            )}
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
};
