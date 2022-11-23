import { Heading, List, ListItem, Text, VStack } from "@chakra-ui/react";
import { DatasetRegistration } from "../lib/data/types/DatasetRegistration";

interface ResultListProps {
  width?: string;
  height?: string;
  result: Array<DatasetRegistration>;
}

function ResultList(props: ResultListProps) {
  const { width = "80%", height = "100vh", result } = props;
  return (
    <VStack w={width} h={height}>
      <Heading>Results ({result.length})</Heading>
      <List>
        {result.map((ds) => {
          return (
            <ListItem key={ds.id}>
              <Text>{ds.title}</Text>
            </ListItem>
          );
        })}
      </List>
    </VStack>
  );
}

export default ResultList;
