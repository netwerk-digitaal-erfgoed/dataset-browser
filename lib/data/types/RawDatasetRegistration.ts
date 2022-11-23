import { Literal, NamedNode } from "@rdfjs/types";

export interface RawDatasetRegistration {
  dataset: NamedNode;
  title: Literal;
  license: NamedNode;
  description: Literal;
  keyword: Literal;
  landingPage: NamedNode;
  source: NamedNode;
  created: Literal;
  publisherName: Literal;
  distribution_url: NamedNode;
  distribution_format: Literal;
  distribution_description: Literal;
  distribution_license: NamedNode;
  distribution_size: Literal;
}
