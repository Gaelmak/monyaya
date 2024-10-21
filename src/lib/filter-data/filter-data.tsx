export const FilterData = (data: any[], filters: string) => {
  let result = [];
  if (filters === "Tous") {
    return data;
  } else {
    result = data?.filter((item?) => item?.courses?.category === filters);
    return result;
  }
};
