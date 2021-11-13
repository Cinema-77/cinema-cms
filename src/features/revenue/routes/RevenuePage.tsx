import { Box, Flex, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { SiteHeader } from '@/components';
import { ROUTES } from '@/constants';
import { RevenueByDateForm } from '@/features/revenue';
import { useAuth } from '@/lib/auth';
import { Authorization, ROLES } from '@/lib/authorization';

export const RevenuePage = () => {
  const { user } = useAuth();

  return (
    <Box>
      <Authorization
        forbiddenFallback={<div>Only admin and manger can view this.</div>}
        allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]}
      >
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
                  {/* <RevenueByQuarterForm cinemaId={user?.cinema._id as string} /> */}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </Flex>
      </Authorization>
    </Box>
  );
};
