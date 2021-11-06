import { BreadcrumbItem, Box, BreadcrumbLink, Flex, Stack, Button } from '@chakra-ui/react';
import React from 'react';

import { Form, SingleSelect, SiteHeader } from '@/components';
import { ROUTES } from '@/constants';
import { getRevenueFromDateToDate, LineChart, IRevenue } from '@/features/revenue';
import { useAuth } from '@/lib/auth';

type RevenueValues = {
  cinemaId: string;
  dateStart: string;
  dateEnd: string;
};

export const RevenuePage = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [report, setReport] = React.useState<IRevenue[]>([]);
  const { user } = useAuth();

  return (
    <Box>
      <SiteHeader menuName="Doanh thu" menuHref={ROUTES.REVENUE} heading={`Doanh thu của rạp phim`}>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Doanh thu</BreadcrumbLink>
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
          <Stack spacing={2} width="full">
            <Box
              width="50%"
              margin="auto"
              border="1px"
              borderColor="gray.200"
              borderStyle="solid"
              padding="5"
            >
              <Form<RevenueValues>
                onSubmit={async (data) => {
                  setLoading(true);
                  const values = { ...data, cinemaId: user?.cinema._id as string };
                  const { data: report } = await getRevenueFromDateToDate(values);
                  setReport(report);
                  setLoading(false);
                }}
              >
                {({ register, setValue }) => (
                  <Stack spacing={4} direction="column">
                    <Flex alignItems="center" justifyContent="space-between">
                      <Stack direction="column" flex={1}>
                        <SingleSelect
                          registration={register('dateStart')}
                          label="Từ"
                          setValues={setValue}
                          nameToSet="dateStart"
                        />
                        <SingleSelect
                          registration={register('dateEnd')}
                          label="Đến"
                          setValues={setValue}
                        />
                      </Stack>
                    </Flex>

                    <Button
                      backgroundColor="cyan.400"
                      color="white"
                      fontWeight="medium"
                      type="submit"
                      _hover={{
                        backgroundColor: 'cyan.700',
                      }}
                      maxWidth="200px"
                      alignSelf="flex-end"
                      isLoading={loading}
                    >
                      Thống kê
                    </Button>
                  </Stack>
                )}
              </Form>
            </Box>
            {report.length > 0 && <LineChart data={report} />}
          </Stack>
        </Stack>
      </Flex>
    </Box>
  );
};
