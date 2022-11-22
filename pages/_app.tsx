import { ChakraProvider, HStack } from "@chakra-ui/react";
import { theme } from "@chakra-ui/theme";
import { SparqlEndpointFetcher } from "fetch-sparql-endpoint";
import { useEffect, useState } from "react";
import FacetList from "../components/facetList";
import ResultList from "../components/resultList";
import { DatasetRegistration } from "../lib/types/DatasetRegistration";

function DatasetBrowser() {
  const [datasets, setDatasets] = useState<Array<any>>([]);
  useEffect(() => {
    getAllDatasets();
  }, []);

  const getAllDatasets = async () => {
    const ds: Array<DatasetRegistration> = [];
    const fetcher = new SparqlEndpointFetcher({
      additionalUrlParams: new URLSearchParams({
        infer: "true",
        sameAs: "true",
      }),
    });
    const endpoint =
      "https://triplestore.netwerkdigitaalerfgoed.nl/repositories/registry";
    const query =
      "PREFIX dcat: <http://www.w3.org/ns/dcat#> PREFIX dct: <http://purl.org/dc/terms/> PREFIX foaf: <http://xmlns.com/foaf/0.1/> SELECT DISTINCT ?dataset ?title ?publisherName WHERE { ?dataset a dcat:Dataset ; dct:title ?title ; dct:publisher ?publisher . ?publisher foaf:name ?publisherName . FILTER(LANG(?title) = '' || LANGMATCHES(LANG(?title), 'en')) FILTER(LANG(?publisherName) = '' || LANGMATCHES(LANG(?publisherName), 'en'))}";
    const bindingsStream = await fetcher.fetchBindings(endpoint, query);
    bindingsStream.on("data", (bindings) => {
      ds.push(bindings);
    });
    bindingsStream.on("end", () => {
      setDatasets(ds);
    });
  };

  return (
    <ChakraProvider theme={theme}>
      <HStack>
        <FacetList />
        <ResultList datasets={datasets} />
      </HStack>
    </ChakraProvider>
  );
}

export default DatasetBrowser;
