export const setItems = (name, data) => {
  window.localStorage.setItem(name, JSON.stringify(data))
}

export const getItems = (name) => {
  return JSON.parse(window.localStorage.getItem(name))
}

export const removeItems = (name) => {
  window.localStorage.removeItem(name)
}

