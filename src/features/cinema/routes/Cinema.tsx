import {
  BreadcrumbItem,
  BreadcrumbLink,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import React from 'react';

import { SiteHeader } from '@/components/Layout';

export const Cinema = () => {
  return (
    <>
      <SiteHeader menuName="List Cinema" heading={`Cinema`}>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Cinema 2</BreadcrumbLink>
        </BreadcrumbItem>
      </SiteHeader>
      <Tabs>
        <TabList>
          <Tab fontWeight="500">Showtimes</Tab>
          <Tab fontWeight="500">Movies</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
