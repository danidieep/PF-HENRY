
export const addProductToCarrito = (payload) => {
  fetch(`/cart/${payload.artId}`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(payload.email),
  });
};

export const deleteProductFromCarrito = (payload) => {
  fetch(`/cart/${payload.artId}`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(payload.email),
  });
};
