import { Heading, VStack } from "@chakra-ui/react";

interface ResultListProps {
  width?: string;
  height?: string;
  datasets: string;
}

function ResultList(props: ResultListProps) {
  const { width = "80%", height = "100vh" } = props;
  return (
    <VStack w={width} h={height}>
      <Heading>Results</Heading>
    </VStack>
  );
}

export default ResultList;
