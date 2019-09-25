import data from '../data/data.json';


function useData(...keys) {
  if (!keys.length) return data;

  return keys.reduce((result, item) => result[item], data);
}

export default useData;
