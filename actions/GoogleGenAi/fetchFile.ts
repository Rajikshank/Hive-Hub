

export default async function fetchPdf(resumeUrl:string) {
  const data = await fetch(
    resumeUrl
  );
  const arrayBuffer = await data.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer
    
}