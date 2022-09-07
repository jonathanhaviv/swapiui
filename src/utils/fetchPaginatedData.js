export const fetchPaginatedData = async (api, resource, pages) => {
  const urls = [];
  let count = 1;

  while (count <= pages) {
    urls.push(`${api}/${resource}?page=${count}`);
    count++;
  }

  try {
    const promises = urls.map((url) => {
      return fetch(url).then((response) => response.json());
    });

    const data = await Promise.all(promises);

    return data.reduce((prev, current) => prev.concat(current.results), []);
  } catch (error) {
    console.error(error);
    throw error;
  }
};