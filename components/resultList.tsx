import {
  Box,
  Button,
  Heading,
  HStack,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { DatasetRegistration } from "../lib/data/types/DatasetRegistration";
import { DetailPanel } from "./detailPanel";

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
      <List width="100%">
        {result.map((ds) => {
          return <ResultPanel result={ds} />;
        })}
      </List>
    </VStack>
  );
}

interface ResultPanelProps {
  result: DatasetRegistration;
}

function ResultPanel(props: ResultPanelProps) {
  const { result } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [datasetRegistration, setDatasetRegistration] = useState<
    DatasetRegistration | undefined
  >(undefined);

  const openModal = (ds: DatasetRegistration) => {
    setDatasetRegistration(ds);
    onOpen();
  };
  return (
    <ListItem width="100%" key={result.id}>
      <Box
        maxW="100%"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        padding={2}
        marginBottom={3}
        _hover={{
          cursor: "pointer",
          backgroundColor: "WhiteSmoke",
        }}
        onClick={() => openModal(result)}
      >
        <VStack width="100%" alignItems="flex-start">
          <Heading noOfLines={1} size="sm">
            {result.title}
          </Heading>
          <HStack width="100%">
            <Heading size="sm">Publisher:</Heading>
            <Text noOfLines={1}>{result.publisherName}</Text>
          </HStack>
          <HStack width="100%">
            <Heading size="sm">License:</Heading>
            <Text noOfLines={1}>{result.license}</Text>
          </HStack>
          <HStack width="100%">
            <Heading size="sm">Keywords:</Heading>
            <Text noOfLines={1} fontStyle="italic">
              {result.keywords.map((k) => {
                return `'${k}', `;
              })}
            </Text>
          </HStack>
        </VStack>
      </Box>

      {datasetRegistration !== undefined && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          scrollBehavior="inside"
          size="6xl"
        >
          <ModalOverlay
            bg="blackAlpha.600"
            backdropFilter="blur(5px) hue-rotate(90deg)"
          />
          <ModalContent>
            <ModalHeader>{datasetRegistration.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <DetailPanel result={datasetRegistration} />
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </ListItem>
  );
}

export default ResultList;
