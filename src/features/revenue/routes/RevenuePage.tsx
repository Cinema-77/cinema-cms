import { Box, Flex, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { SiteHeader } from '@/components';
import { ROUTES } from '@/constants';
import { AuthUser } from '@/features/auth';
import { RevenueByDateForm, RevenueByQuarterForm } from '@/features/revenue';
import { useAuth } from '@/lib/auth';
import { Authorization, ROLES, POLICIES } from '@/lib/authorization';

export const RevenuePage = () => {
  const { user } = useAuth();

  return (
    <Box>
      <Authorization
        forbiddenFallback={<div>Chỉ có người có quyền mới truy cập được.</div>}
        allowedRoles={[ROLES.USER, ROLES.MANAGER]}
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
                <Authorization policyCheck={POLICIES['revenue:quarter'](user as AuthUser)}>
                  <Tab>Doanh thu của rạp theo tháng </Tab>
                </Authorization>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <RevenueByDateForm
                    cinemaId={user?.cinema._id || ''}
                    userName={user?.profile.fullName || ''}
                    roleType={user?.permission.type || '2'}
                  />
                </TabPanel>
                <TabPanel>
                  <RevenueByQuarterForm cinemaId={user?.cinema._id || ''} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </Flex>
      </Authorization>
    </Box>
  );
};
