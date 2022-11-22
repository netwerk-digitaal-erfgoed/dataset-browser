import { Heading, List, ListItem, Text, VStack } from "@chakra-ui/react";
import { DatasetRegistration } from "../lib/types/DatasetRegistration";

interface ResultListProps {
  width?: string;
  height?: string;
  datasets: Array<DatasetRegistration>;
}

function ResultList(props: ResultListProps) {
  const { width = "80%", height = "100vh", datasets } = props;
  console.log(datasets);
  return (
    <VStack w={width} h={height}>
      <Heading>Results</Heading>
      <List>
        {datasets.map((ds) => {
          return (
            <ListItem key={ds.dataset.value}>
              <Text>{ds.title.value}</Text>
            </ListItem>
          );
        })}
      </List>
    </VStack>
  );
}

export default ResultList;
