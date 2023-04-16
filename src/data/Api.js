export async function getComic() {
  const url = "http://localhost:5190/comics";
  
  try {
    const response = await window.fetch(url);
    const body = await response.json();
    return { status: response.status, comics: body };
  } catch (error) {
    console.log(error);
    return { status: error.response.status, comics: null };
  }
  
}