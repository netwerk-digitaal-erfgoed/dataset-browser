import { DatasetRegistration } from "../types/DatasetRegistration";
import { Distribution } from "../types/Distribution";
import { RawDatasetRegistration } from "../types/RawDatasetRegistration";

export function rawToDatasetRegistration(
  input: RawDatasetRegistration[],
): DatasetRegistration[] {
  const uniqueDatasets = [
    ...new Map(input.map((item) => [item.dataset.value, item])).values(),
  ];
  return uniqueDatasets.map((i) =>
    datasetRegistrationTransformation(
      i,
      input.filter((f) => f.dataset.value === i.dataset.value),
    ),
  );
}

function datasetRegistrationTransformation(
  raw: RawDatasetRegistration,
  related: RawDatasetRegistration[],
): DatasetRegistration {
  const uniqueKeywords = [
    ...new Set(
      related.map((i) => (i.keyword !== undefined ? i.keyword.value : "")),
    ),
  ];
  const uniqueDistributions = [
    ...new Map(
      related.map((i) => [
        i.distribution_url !== undefined ? i.distribution_url.value : "",
        i,
      ]),
    ).values(),
  ].map((i) => distributionTransformation(i));
  const datasetRegistration: DatasetRegistration = {
    id: raw.dataset.value,
    title: raw.title.value,
    license: raw.license.value,
    description: raw.description?.value,
    keywords: uniqueKeywords,
    landingPage: raw.landingPage?.value,
    source: raw.source?.value,
    created: raw.created?.value,
    publisherName: raw.publisherName.value,
    distributions: uniqueDistributions,
  };
  return datasetRegistration;
}

function distributionTransformation(raw: RawDatasetRegistration): Distribution {
  const distribution: Distribution = {
    id: raw.distribution_url !== undefined ? raw.distribution_url.value : "",
    format: raw.distribution_format?.value,
    description: raw.distribution_description?.value,
    license: raw.distribution_license?.value,
    size: raw.distribution_size?.value,
  };
  return distribution;
}
