export const fetchSearch = () =>
  $.ajax({
    method: "GET",
    url: `api/search`,
  });
