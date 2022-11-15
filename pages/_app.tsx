import { HStack } from "@chakra-ui/react";
import { SparqlEndpointFetcher } from "fetch-sparql-endpoint";
import pTimeout from "p-timeout";
import rdfSerializer from "rdf-serialize";
import { useEffect, useState } from "react";
import stringifyStream from "stream-to-string";
import FacetList from "../components/facetList";
import ResultList from "../components/resultList";

function DatasetBrowser() {
  const [datasets, setDatasets] = useState<string>("");
  useEffect(() => {
    getAllDatasets();
  }, []);

  const getAllDatasets = async () => {
    const fetcher = new SparqlEndpointFetcher();
    const endpoint = "https://triplestore.netwerkdigitaalerfgoed.nl/sparql";
    const query =
      "PREFIX dcat: <http://www.w3.org/ns/dcat#> PREFIX dct: <http://purl.org/dc/terms/> PREFIX foaf: <http://xmlns.com/foaf/0.1/> SELECT DISTINCT ?dataset ?title ?publisherName WHERE { ?dataset a dcat:Dataset ; dct:title ?title ; dct:publisher ?publisher . ?publisher foaf:name ?publisherName . FILTER(LANG(?title) = '' || LANGMATCHES(LANG(?title), 'en')) FILTER(LANG(?publisherName) = '' || LANGMATCHES(LANG(?publisherName), 'en'))}";

    const unresolvedTriplesStream = fetcher.fetchTriples(endpoint, query);
    const triplesStream = await pTimeout(unresolvedTriplesStream, {
      milliseconds: 60000,
    });
    const textStream = rdfSerializer.serialize(triplesStream, {
      contentType: "application/ld+json",
    });
    setDatasets(await stringifyStream(textStream));
  };

  return (
    <HStack>
      <FacetList />
      <ResultList datasets={datasets} />
    </HStack>
  );
}

export default DatasetBrowser;
