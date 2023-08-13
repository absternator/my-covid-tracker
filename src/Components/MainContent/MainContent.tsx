import { Box } from "@chakra-ui/react";
import { Chart } from "./components/Chart";

interface MainContentProps {
  region: string | undefined;
}
export const MainContent = ({ region }: MainContentProps) => {
  return (
    <Box>
      <Chart region={region} />
    </Box>
  );
};
