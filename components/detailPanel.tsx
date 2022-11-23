import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Heading,
  HStack,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { DatasetRegistration } from "../lib/data/types/DatasetRegistration";

interface DetailPageProps {
  result: DatasetRegistration;
}

export function DetailPanel(props: DetailPageProps) {
  const { result } = props;
  return (
    <VStack width="100%" alignItems="flex-start">
      <VStack width="100%" paddingLeft={4} alignItems="flex-start">
        <HStack width="100%">
          <Heading size="sm">Publisher:</Heading>
          <Text>{result.publisherName}</Text>
        </HStack>
        <HStack width="100%">
          <Heading size="sm">Landing Page:</Heading>
          <Link href={result.landingPage} isExternal>
            {result.landingPage} <ExternalLinkIcon mx="2px" />
          </Link>
        </HStack>
        <HStack width="100%">
          <Heading size="sm">Source:</Heading>
          <Text>{result.source}</Text>
        </HStack>
        <HStack width="100%">
          <Heading size="sm">Created:</Heading>
          <Text>{result.created}</Text>
        </HStack>
        <HStack width="100%">
          <Heading size="sm">License:</Heading>
          <Link href={result.license} isExternal>
            {result.license} <ExternalLinkIcon mx="2px" />
          </Link>
        </HStack>
        <HStack width="100%">
          <Heading size="sm">Keywords:</Heading>
          <Text fontStyle="italic">
            {result.keywords.map((k) => {
              return `'${k}', `;
            })}
          </Text>
        </HStack>
      </VStack>
      <Tabs width="100%">
        <TabList marginTop={5}>
          <Tab>Description</Tab>
          <Tab>Schema Evaluation</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Text>{result.description}</Text>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}
