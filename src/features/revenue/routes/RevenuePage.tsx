import { Box, Flex, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { SiteHeader } from '@/components';
import { ROUTES } from '@/constants';
import { RevenueByDateForm, RevenueByQuarterForm } from '@/features/revenue';
import { useAuth } from '@/lib/auth';

export const RevenuePage = () => {
  const { user } = useAuth();

  return (
    <Box>
      <SiteHeader
        menuName="Doanh thu"
        menuHref={ROUTES.REVENUE}
        heading={`Doanh thu của rạp phim`}
      />
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
          <Tabs variant="enclosed" width="full">
            <TabList>
              <Tab>Doanh thu của rạp theo ngày </Tab>
              <Tab>Doanh thu của rạp theo quý </Tab>
              <Tab>Doanh thu của phim </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <RevenueByDateForm cinemaId={user?.cinema._id as string} />
              </TabPanel>
              <TabPanel>
                <RevenueByQuarterForm cinemaId={user?.cinema._id as string} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Flex>
    </Box>
  );
};
