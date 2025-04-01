export async function fetcher(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  return response.json();
}
