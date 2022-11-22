import { Literal, NamedNode } from "@rdfjs/types";

export interface DatasetRegistration {
  dataset: NamedNode;
  publisherName: Literal;
  title: Literal;
}
