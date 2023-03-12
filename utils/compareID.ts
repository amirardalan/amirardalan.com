// Sort Blog posts by ID
type ID = { id: number };

const compareID = (a: ID, b: ID) => {
  if (a.id < b.id) return -1;
  if (a.id > b.id) return 1;
  return 0;
};

export default compareID;
