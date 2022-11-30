import Box from "@mui/joy/Box";

export const BaseImage = ({ ...propValues }) => (
  <Box>
    {/*eslint-disable-next-line jsx-a11y/alt-text*/}
    <img {...propValues} />
  </Box>
);
