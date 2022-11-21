import { Heading, List, ListItem, VStack, Text } from "@chakra-ui/react";
import { DatasetRegistration } from "../lib/types/DatasetRegistration";

interface ResultListProps {
  width?: string;
  height?: string;
  datasets: Array<DatasetRegistration>;
}

function ResultList(props: ResultListProps) {
  const { width = "80%", height = "100vh", datasets } = props;
  return (
    <VStack w={width} h={height}>
      <Heading>Results</Heading>
      <List>
        <ListItem>
          {datasets.map((ds) => {
            return <Text>{ds.title.value}</Text>;
          })}
        </ListItem>
      </List>
    </VStack>
  );
}

export default ResultList;
