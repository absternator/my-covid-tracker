import { Box, Flex, Select, Text } from "@chakra-ui/react";
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import { Dispatch } from "react";
import { ukCovidApiUrl } from "../../../utils/config";

interface NavbarProps {
  setRegion: Dispatch<React.SetStateAction<string | undefined>>;
}

export const Navbar = ({ setRegion }: NavbarProps) => {
  const { data, error } = useSWR<
    {
      areaCode: string;
      areaName: string;
    }[]
  >(`${ukCovidApiUrl}generic/area/region`, fetcher);

  return (
    <Flex
      align='center'
      justify={{ base: "center", md: "space-between" }}
      bg='gray.200'
      p='4'
      w='100%'
    >
      <Box hideBelow='md'>
        <Text fontSize='1.5em'>MyUKCovidTracker</Text>
      </Box>
      <Box>
        <Select
          placeholder={
            error ? "Unable to retrieve UK regions" : "Select your region"
          }
          size='lg'
          onChange={(e) => setRegion(e.target.value)}
        >
          {data?.map((region) => (
            <option key={region.areaCode}>{region.areaName}</option>
          ))}
        </Select>
      </Box>
    </Flex>
  );
};
