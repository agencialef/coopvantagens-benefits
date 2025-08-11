export const setDocumentTitle = (title: string) => {
  if (title) document.title = title;
};

export const setMetaDescription = (description: string) => {
  const tag = document.querySelector('meta[name="description"]');
  if (tag) tag.setAttribute("content", description);
};
