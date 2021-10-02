import { AppProvider } from '@/providers/app';
import { AppRoutes } from '@/routes';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/components';
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
