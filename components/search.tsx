import {
  Button,
  Heading,
  List,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { DatasetRegistration } from "../lib/data/types/DatasetRegistration";

interface FacetedSearch {
  facetLists: FacetList[];
}

interface FacetList {
  title: string;
  facets: Facet[];
}

interface Facet {
  title: string;
  key: keyof DatasetRegistration;
  facetValues: { [facetValue: string]: number };
}

interface SearchProps {
  width?: string;
  height?: string;
  result: Array<DatasetRegistration>;
  setResult: Dispatch<SetStateAction<DatasetRegistration[]>>;
  resetSearch: () => void;
}

function Search(props: SearchProps) {
  const {
    width = "20%",
    height = "100vh",
    result,
    setResult,
    resetSearch,
  } = props;

  const [clickedFacets, setClickedFacets] = useState<Map<string, string[]>>(
    new Map(),
  );

  const reducer = (
    map: { [facetValue: string]: number },
    val: string | number,
  ) => {
    if (map[val] === undefined) {
      map[val] = 1;
    } else {
      ++map[val];
    }
    return map;
  };

  const facetList: FacetList = {
    title: "datasets",
    facets: [
      {
        title: "Keywords",
        key: "keywords",
        facetValues: result
          .map((i) => i.keywords)
          .flat()
          .reduce(reducer, {}),
      },
      {
        title: "Publisher",
        key: "publisherName",
        facetValues: result.map((i) => i.publisherName).reduce(reducer, {}),
      },
      {
        title: "License",
        key: "license",
        facetValues: result.map((i) => i.license).reduce(reducer, {}),
      },
    ],
  };

  const clickFacetValue = (key: keyof DatasetRegistration, value: string) => {
    const arr = clickedFacets.get(key) ?? [];
    arr.push(value);
    console.log(clickedFacets);
    setClickedFacets(clickedFacets.set(key, arr));
    const newResults: DatasetRegistration[] = result.filter((f) => {
      switch (key) {
        case "license":
        case "publisherName":
          return arr.includes(f[key]);
        case "keywords":
          return arr.every((el) => f[key].includes(el));
        default:
          return undefined;
      }
    });
    setResult(newResults);
  };

  const clearFacets = () => {
    setClickedFacets(new Map());
    resetSearch();
  };

  return (
    <VStack w={width} h={height}>
      <Heading size="lg">Search</Heading>
      <Button onClick={() => clearFacets()}>Reset</Button>
      <List width="100%">
        {facetList.facets.map((f) => {
          return (
            <ListItem width="100%" key={f.title}>
              <Heading size="md">{f.title}</Heading>
              <List
                width="100%"
                paddingBottom={5}
                marginBottom={5}
                borderBottom="1px solid black"
              >
                {Object.entries(f.facetValues)
                  .sort((a, b) => b[1] - a[1])
                  .map((fv) => {
                    if (fv[0] !== "") {
                      const arr = clickedFacets.get(f.key);
                      const isClicked =
                        arr !== undefined && arr.includes(fv[0]) ? true : false;
                      return (
                        <FacetValueListItem
                          key={fv[0]}
                          onClick={clickFacetValue}
                          facetKey={f.key}
                          facetValue={fv[0]}
                          facetCount={fv[1]}
                          isClicked={isClicked}
                        />
                      );
                    } else {
                      return;
                    }
                  })}
              </List>
            </ListItem>
          );
        })}
      </List>
    </VStack>
  );
}

interface FacetValueListItemProps {
  onClick: (key: keyof DatasetRegistration, value: string) => void;
  facetKey: keyof DatasetRegistration;
  facetValue: string;
  facetCount: number;
  isClicked: boolean;
}

function FacetValueListItem(props: FacetValueListItemProps) {
  const { onClick, facetKey, facetValue, facetCount, isClicked } = props;
  const weight = isClicked ? "bold" : "normal";
  return (
    <ListItem width="100%" key={facetValue}>
      <Text
        noOfLines={1}
        onClick={() => onClick(facetKey, facetValue)}
        fontWeight={weight}
        _hover={{
          cursor: "pointer",
          textDecoration: "underline",
        }}
      >
        ({facetCount}) - {facetValue}
      </Text>
    </ListItem>
  );
}

export default Search;
