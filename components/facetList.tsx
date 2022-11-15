import { VStack, Heading } from "@chakra-ui/react";

interface FacetListProps {
  width?: string;
  height?: string;
}

function FacetList(props: FacetListProps) {
  const { width = "20%", height = "100vh" } = props;
  return (
    <VStack w={width} h={height} borderRight="solid 1px grey">
      <Heading>Search</Heading>
    </VStack>
  );
}

export default FacetList;
