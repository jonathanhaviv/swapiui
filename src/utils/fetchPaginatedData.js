// todo - look at optimizing this with promises
export const fetchPaginatedData = async (api, resource, page) => {
  let url = `${api}/${resource}?page=${page}`
  let data = []

  while (url) {
    const response = await fetch(url);
    const result = await response.json();
    data = [...data, ...result.results]
    url = result.next;
  }

  return data;
}