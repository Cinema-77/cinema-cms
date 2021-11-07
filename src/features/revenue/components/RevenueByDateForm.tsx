import { Box, Button, Flex, Stack } from '@chakra-ui/react';
import React from 'react';

import { Form, SingleSelect } from '@/components';
import { getRevenueFromDateToDate, IRevenue, LineChart } from '@/features/revenue';

type RevenueValues = {
  cinemaId: string;
  dateStart: string;
  dateEnd: string;
};

interface RevenueByDateFormProps {
  cinemaId: string;
}

export const RevenueByDateForm: React.FC<RevenueByDateFormProps> = ({ cinemaId }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [report, setReport] = React.useState<IRevenue[]>([]);

  return (
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
            const values = { ...data, cinemaId };
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
  );
};
