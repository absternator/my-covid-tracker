import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { AxisOptions, Chart as ReactChart } from 'react-charts';
import { ukCovidApiUrl } from '../../../utils/config';

interface ChartProps {
  region: string | undefined;
}

interface CumCasesBySpecimenDate {
  date: string;
  cumCases: number;
}
export const Chart = ({ region }: ChartProps) => {
  const { data, error, isLoading } = useSWR<{
    data: CumCasesBySpecimenDate[];
  }>(
    region
      ? `${ukCovidApiUrl}v1/data?filters=areaType=region;areaName=${region}&structure={"date":"date","cumCases":"cumCasesBySpecimenDate"}`
      : null,
    fetcher
  );

  const primaryAxis = React.useMemo(
    (): AxisOptions<CumCasesBySpecimenDate> => ({
      getValue: (datum) => datum.date,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<CumCasesBySpecimenDate>[] => [
      {
        getValue: (datum) => datum.cumCases,
      },
    ],
    []
  );

  const series: any[] = [
    {
      label: 'Cumulative Covid Cases',
      data:
        data?.data.map((d) => ({
          cumCases: d.cumCases,
          date: new Date(d.date),
        })) || [],
    },
  ];
  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>Error Unable retrieve covid data from your region...</div>;

  return (
    <Flex
      w={{ base: 350, sm: 600, lg: 1000 }}
      h={{ base: 260, sm: 400, lg: 600 }}
      direction='column'
      align='center'
      justify='center'
    >
      {data ? (
        <ReactChart
          options={{
            data: series,
            primaryAxis,
            secondaryAxes,
          }}
        />
      ) : (
        'please select your region'
      )}
    </Flex>
  );
};
