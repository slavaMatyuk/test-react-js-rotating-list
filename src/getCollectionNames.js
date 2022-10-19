export const getCollectionNames = (searchQuery) =>
  fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(searchQuery)}`
  )
    .then((response) => response.json())
    .then((data) =>
      data.results
        .map((item) => item.collectionName)
        .filter((item) => Boolean(item))
        .sort((a, b) => (a > b ? 1 : -1))
    );
