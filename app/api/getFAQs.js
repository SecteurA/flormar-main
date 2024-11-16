export async function getFAQs() {
  const res = await fetch(
    'https://admin.flormar.ma/wp-json/acf/v3/faq?per_page=30'
  );
  const data = await res.json();

  const sortedData = data.sort((a, b) => a.id - b.id);

  const formattedData = sortedData.map((item) => ({
    id: item?.id,
    question: item?.acf?.question,
    answer: item?.acf?.reponse,
  }));

  return formattedData;
}
