import fs from "fs";

export const getUserUploadedFileName = (username) => {
  const directoryPath = `data/${username}`;
  console.log(directoryPath);
  return fs.readdirSync(directoryPath, (err, files) => {
    if (err) {
      throw new Error("Error in Reading file", err);
    }
    console.log("filenaame", files[0]);
    return files[0];
  });
};
