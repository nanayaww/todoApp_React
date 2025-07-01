// Save state to localStorage
export function saveToLocalStorage(state) {
  try {
    const stringState = JSON.stringify(state);
    localStorage.setItem("persistState", stringState);
  } catch (error) {
    console.warn("Could not save state", error);
  }
}

// Load state from localStorage
export function loadFromLocalStorage() {
  try {
    const loadState = localStorage.getItem("persistState");
    if (!loadState) return undefined;
    return JSON.parse(loadState);
  } catch (error) {
    console.warn("Could not load state", error);
    return undefined;
  }
}
