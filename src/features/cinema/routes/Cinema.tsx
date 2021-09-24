import { SiteHeader } from '@/components/Layout';
import { BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import React from 'react';

interface CinemaProps {}

export const Cinema: React.FC<CinemaProps> = () => {
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
