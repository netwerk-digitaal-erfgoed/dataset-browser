import { Distribution } from "./Distribution";
import { Keyword } from "./Keyword";

export interface DatasetRegistration {
  id: string;
  title: string;
  license: string;
  description?: string;
  keywords: Keyword[];
  landingPage?: string;
  source?: string;
  created?: string;
  publisherName: string;
  distributions: Distribution[];
}
