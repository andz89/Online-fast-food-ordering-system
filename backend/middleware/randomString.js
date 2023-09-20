const getString = () => {
  let now = new Date();
  let seed = now.getTime().toString();
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Generate random numbers and letters for first 5 characters
  let randomString = "";
  for (let i = 0; i < 5; i++) {
    let index = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(index);
  }

  // Generate random letters/digits for remaining characters
  for (let i = 0; i < 15; i++) {
    let index = parseInt(seed.charAt(i), 10) || 0;
    result += characters.charAt(index % characters.length);
  }

  // Concatenate random numbers/letters and letters/digits
  result = randomString + result.substring(5);

  return result;
};

export { getString };
