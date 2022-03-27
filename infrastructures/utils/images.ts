import { decode as atob } from 'base-64';

export const dataURItoBLOB = (dataURI: string) => {
  console.warn(1, dataURI);
  /* https://stackoverflow.com/questions/12168909/blob-from-dataurl */
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(',')[1]);
  console.warn(2, byteString);
  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  console.warn(3, mimeString);
  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);
  console.warn(4, ab);
  // create a view into the buffer
  const ia = new Uint8Array(ab);
  console.warn(5, ia);
  // set the bytes of the buffer to the correct values
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }
  console.warn(6, ia);
  // write the ArrayBuffer to a blob, and you're done
  const blob = new Blob([ab], { type: mimeString });
  console.warn(7, blob);
  return blob;
};

export const fileURItoBLOB = async (fileURI: string) => {
  const resp = await fetch(fileURI);
  const imageBody = await resp.blob();
  return imageBody;
};
