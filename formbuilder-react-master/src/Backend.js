import { FORM_BUILDER_URL } from "./Config";

export const createNewField = async (value) => {
  const response = await fetch(FORM_BUILDER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });

  return await response.json();
};

export const editField = async (id, value) => {
  const response = await fetch(FORM_BUILDER_URL + `/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });

  return await response.json();
};

export const deleteField = async (id) => {
  const response = await fetch(FORM_BUILDER_URL + `/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  return await response.json();
};
