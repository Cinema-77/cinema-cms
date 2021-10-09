import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '@/components';
import { AppProvider } from '@/providers/app';
import { AppRoutes } from '@/routes';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </ChakraProvider>
  );
}

export default App;
