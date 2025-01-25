export const getCategories = async () => {
  const response = await fetch("https://api.escuelajs.co/api/v1/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const getProducts = async (offset, search, min, max, category) => {
  const response = await fetch(
    `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=10&price_min=${min}&price_max=${max}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};
