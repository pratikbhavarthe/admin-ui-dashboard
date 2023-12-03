export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
}

export const range = (start, end, step = 1) => {
  let ranges = [];
  for(let i=0; i<end; i++) {
    i === 0 ? ranges.push(start) : ranges.push(ranges[ranges.length - 1] + step);
  }
  return ranges;
}