import { Navbar } from "./Components/Navbar";
import { useState } from "react";
import { MainContent } from "./Components/MainContent";
import { Flex } from "@chakra-ui/react";

function App() {
  const [region, SetRegion] = useState<undefined | string>(undefined);

  return (
    <Flex align='center' direction='column' justify='center'>
      <Navbar setRegion={SetRegion} />
      <MainContent region={region} />
    </Flex>
  );
}

export default App;
