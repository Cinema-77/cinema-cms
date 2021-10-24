import { Box, BreadcrumbItem, BreadcrumbLink, Button, Flex, Stack } from '@chakra-ui/react';
import { format } from 'date-fns';
import * as React from 'react';

import { SiteHeader } from '@/components';
import { ShowTimesItem } from '@/features/showtimes';
import { getDay, getEachDayOfInterval } from '@/utils/format';

interface SellerPageProps {
  children?: React.ReactNode;
}

export const SellerPage: React.FC<SellerPageProps> = () => {
  const today = new Date();
  const endDay = today.setDate(today.getDate() + 5);
  const result = getEachDayOfInterval({
    start: new Date(),
    end: endDay,
  });
  const [activeDate, setActiveDate] = React.useState(0);

  return (
    <Box>
      <SiteHeader menuName="Lịch chiếu" heading={`Lịch chiếu phim | suất chiếu `}>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Suất chiếu phim</BreadcrumbLink>
        </BreadcrumbItem>
      </SiteHeader>
      <Flex justifyContent="flex-start">
        <Stack
          backgroundColor="white"
          px={12}
          py={12}
          shadow={[null, 'md']}
          spacing={4}
          w="100%"
          alignItems="center"
          flexShrink={0}
        >
          <Stack spacing={2} direction="row">
            {result
              .map((d) => ({
                date: format(d, 'MM/dd/yyyy'),
                day: getDay(d),
              }))
              .map((b, i) => {
                const isActive = i === activeDate;
                return (
                  <Button
                    key={b.date}
                    size="lg"
                    colorScheme={isActive ? 'cyan' : undefined}
                    color={isActive ? 'white' : undefined}
                    onClick={() => setActiveDate(i)}
                    fontSize="medium"
                  >
                    {b.date}
                    <br /> {b.day}
                  </Button>
                );
              })}
          </Stack>
          <Stack spacing={3} w="100%">
            <ShowTimesItem />
            <ShowTimesItem />
          </Stack>
        </Stack>
      </Flex>
    </Box>
  );
};
