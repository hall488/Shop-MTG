const requestSearch = async (searchValue, sets, activeSet, colors) => {
  let filters = [];

  if (searchValue.current != "") {
    filters.push(`${searchValue.current}`);
  }

  if (sets.map((s) => s.code).includes(activeSet)) {
    filters.push(`set%3A${activeSet}`);
  }

  if (Object.values(colors.current).some((item) => item)) {
    let string = "";
    Object.keys(colors.current)
      .filter((item) => colors.current[item])
      .forEach((item) => {
        string += item;
      });
    filters.push(`color%3D${string}`);
  }

  let query = filters.join("+");
  //console.log(query);

  const response = await fetch(
    `https://api.scryfall.com/cards/search?q=${query}`,
    {
      mode: "cors",
    }
  );

  const json = await response.json();

  return json;
};

const requestSetNames = async () => {
  const response = await fetch(`https://api.scryfall.com/sets`, {
    mode: "cors",
  });

  const json = await response.json();

  return json.data;
};

export { requestSearch, requestSetNames };
