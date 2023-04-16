export async function getComic() {
  const url = "http://localhost:5000/comics";
  
  try {
    const response = await window.fetch(url);
    const body = await response.json();
    return { status: response.status, comics: body };
  } catch (error) {
    console.log(error);
    return { status: error.response.status, comics: null };
  }
  
}

export async function getRatedComics() {
  const url = "http://localhost:5000/comics/rated";
  
  try {
    const response = await window.fetch(url);
    const body = await response.json();
    return { status: response.status, comics: body };
  } catch (error) {
    console.log(error);
    return { status: error.response.status, comics: null };
  }
  
}

export async function postRateComic(id, rate) {
  const url = "http://localhost:5000/comics?id="+id+"&rate="+rate;
  
  const response = await window.fetch(url,{
    method:'POST',
    headers:{'Content-Type': 'application/json'}
  });
  
}