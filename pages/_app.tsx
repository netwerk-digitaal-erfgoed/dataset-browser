import { ChakraProvider, HStack } from "@chakra-ui/react";
import { theme } from "@chakra-ui/theme";
import { SparqlEndpointFetcher } from "fetch-sparql-endpoint";
import { useEffect, useState } from "react";
import ResultList from "../components/resultList";
import Search from "../components/search";
import { rawToDatasetRegistration } from "../lib/data/transformation/rawToDatasetRegistration";
import { DatasetRegistration } from "../lib/data/types/DatasetRegistration";
import { RawDatasetRegistration } from "../lib/data/types/RawDatasetRegistration";

function DatasetBrowser() {
  const [datasets, setDatasets] = useState<Array<DatasetRegistration>>([]);
  const [result, setResult] = useState<Array<DatasetRegistration>>([]);
  useEffect(() => {
    getAllDatasets();
  }, []);

  const getAllDatasets = async () => {
    const ds: Array<RawDatasetRegistration> = [];
    const fetcher = new SparqlEndpointFetcher({
      additionalUrlParams: new URLSearchParams({
        infer: "true",
        sameAs: "true",
      }),
    });
    const endpoint =
      "https://triplestore.netwerkdigitaalerfgoed.nl/repositories/registry";
    const query =
      "PREFIX dcat: <http://www.w3.org/ns/dcat#> \
      PREFIX dct: <http://purl.org/dc/terms/> \
      PREFIX foaf: <http://xmlns.com/foaf/0.1/> \
      PREFIX owl: <http://www.w3.org/2002/07/owl#>\
      \
      SELECT\
        ?dataset\
        ?title\
        ?license\
        ?description\
        ?keyword\
        ?landingPage\
        ?source    \
          ?created        \
        ?publisherName\
        ?distribution_url\
          ?distribution_format   \
          ?distribution_description\
          ?distribution_license  \
          ?distribution_size\
      WHERE {\
        ?dataset a dcat:Dataset ;\
        dct:license ?license ;\
        dct:publisher ?publisher ;\
        dct:title ?title .\
          ?publisher foaf:name ?publisherName .\
      \
        OPTIONAL { ?dataset dct:description ?description }\
          OPTIONAL { ?dataset dcat:keyword ?keyword }\
          OPTIONAL { ?dataset dcat:landingPage ?landingPage }    \
          OPTIONAL { ?dataset dct:source ?source }    \
          OPTIONAL { ?dataset dct:created ?created }        \
      \
        OPTIONAL { ?dataset dcat:distribution ?distribution . \
              ?distribution dcat:accessURL ?distribution_url . }\
          OPTIONAL { ?distribution dct:format ?distribution_format }      \
          OPTIONAL { ?distribution dct:description ?distribution_description }    \
          OPTIONAL { ?distribution dct:license ?distribution_license }       	\
          OPTIONAL { ?distribution dcat:byteSize ?distribution_size }     \
          \
        FILTER(LANG(?title) = '' || LANGMATCHES(LANG(?title), 'en')) \
          FILTER(LANG(?publisherName) = '' || LANGMATCHES(LANG(?publisherName), 'en'))\
      }";

    const bindingsStream = await fetcher.fetchBindings(endpoint, query);
    bindingsStream.on("data", (bindings: RawDatasetRegistration) => {
      ds.push(bindings);
    });
    bindingsStream.on("end", () => {
      const arr = rawToDatasetRegistration(ds);
      setDatasets(arr);
      setResult(arr);
    });
  };

  const resetSearch = () => {
    setResult(datasets);
  };

  return (
    <ChakraProvider theme={theme}>
      <HStack>
        <Search
          result={result}
          setResult={setResult}
          resetSearch={resetSearch}
        />
        <ResultList result={result} />
      </HStack>
    </ChakraProvider>
  );
}

export default DatasetBrowser;
