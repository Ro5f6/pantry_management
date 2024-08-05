// _app.js
import { Box } from '@mui/material';

function MyApp({ Component, pageProps }) {
  return (
    <Box>
      <Component {...pageProps} />
    </Box>
  );
}

export default MyApp;
