export const simpleFilter = (dataset, query) => {
  if (query === "") return dataset;
  return dataset.filter((data) => {
    return data.name.toLowerCase().includes(query.toLowerCase());
  });
};
