/**
 * Shortens an email address for display
 * Example: john.doe@example.com → jo***@****
 *
 * @param {string} email - Full email address
 * @param {number} usernameChars - Number of visible chars before masking (default: 3)
 * @returns {string} Shortened email
 */
export const shortenEmail = (email, usernameChars = 3) => {
  if (!email || !email.includes("@")) return email;

  const [username] = email.split("@");

  const shortUsername =
    username.length <= usernameChars
      ? username
      : username.slice(0, usernameChars) + "***";

  return `${shortUsername}@****`;
};
