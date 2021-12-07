import { Box, Flex, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { SiteHeader } from '@/components';
import { ROUTES } from '@/constants';
import { AuthUser } from '@/features/auth';
import { RevenueByDateForm, RevenueByQuarterForm, RevenueByMovieForm } from '@/features/revenue';
import { useAuth } from '@/lib/auth';
import { Authorization, POLICIES, ROLES } from '@/lib/authorization';

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
            px={5}
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
                <Authorization policyCheck={POLICIES['revenue:all-cinema'](user as AuthUser)}>
                  <Tab>Doanh thu tất cả rạp theo quý </Tab>
                </Authorization>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <RevenueByDateForm cinemaId={user?.cinema._id || ''} />
                </TabPanel>
                <TabPanel>
                  <RevenueByQuarterForm cinemaId={user?.cinema._id || ''} />
                </TabPanel>
                <TabPanel>
                  <RevenueByMovieForm cinemaId={user?.cinema._id || ''} />
                </TabPanel>
                {/* <Authorization policyCheck={POLICIES['revenue:all-cinema'](user as AuthUser)}>
                  <TabPanel>
                    <RevenueByQuarterForm cinemaId={user?.cinema._id as string} type="All" />
                  </TabPanel>
                </Authorization> */}
              </TabPanels>
            </Tabs>
          </Stack>
        </Flex>
      </Authorization>
    </Box>
  );
};
