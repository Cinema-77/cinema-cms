import {
  Box,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Spinner,
  Stack,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import * as React from 'react';

import { SiteHeader } from '@/components';
import { ROUTES } from '@/constants';
import { getRangeDate } from '@/features/seller';
import { ShowTimesItem, useShowTimesByDate } from '@/features/showtimes';
import { useAuth } from '@/lib/auth';
import { Authorization, ROLES } from '@/lib/authorization';
import { getDay } from '@/utils/format';

export const SellerPage = () => {
  const { rangeDate, startDay } = getRangeDate();
  const { user } = useAuth();
  const [activeDate, setActiveDate] = React.useState<string>(format(startDay, 'MM/dd/yyyy'));
  const showTimesByDateQuery = useShowTimesByDate({
    data: { date: activeDate, cinemaId: user?.cinema._id || '' },
  });

  return (
    <Box>
      <Authorization
        forbiddenFallback={<div>Only manager and user can view this.</div>}
        allowedRoles={[ROLES.MANAGER, ROLES.USER]}
      >
        <SiteHeader
          menuName="Lịch chiếu"
          menuHref={ROUTES.SELLER}
          heading={`Lịch chiếu phim | suất chiếu `}
        >
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Suất chiếu phim</BreadcrumbLink>
          </BreadcrumbItem>
        </SiteHeader>
        <Flex justifyContent="flex-start">
          <Stack
            backgroundColor="white"
            px={10}
            py={12}
            shadow={[null, 'md']}
            spacing={4}
            w="100%"
            alignItems="center"
            flexShrink={0}
          >
            <Stack spacing={2} direction="row">
              {rangeDate
                .map((d) => ({
                  date: format(d, 'MM/dd/yyyy'),
                  day: getDay(d),
                }))
                .map((b) => {
                  const isActive = b.date === activeDate;
                  return (
                    <Button
                      key={b.date}
                      size="lg"
                      colorScheme={isActive ? 'cyan' : undefined}
                      color={isActive ? 'white' : undefined}
                      onClick={() => setActiveDate(b.date)}
                      fontSize="medium"
                      _hover={{
                        backgroundColor: 'cyan.400',
                        color: 'white',
                      }}
                    >
                      {b.date}
                      <br /> {b.day}
                    </Button>
                  );
                })}
            </Stack>
            {showTimesByDateQuery.isLoading ? (
              <Flex justifyContent="center">
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              </Flex>
            ) : (
              <Stack spacing={3} w="100%">
                {showTimesByDateQuery.data?.showTimes.map((showtime) => (
                  <ShowTimesItem {...showtime} date={activeDate} key={showtime.movie.name} />
                ))}
              </Stack>
            )}
          </Stack>
        </Flex>
      </Authorization>
    </Box>
  );
};
