/**
 * Shortens an email address for display
 * Example: john.doe@example.com → jo****@ex****.com
 *
 * @param {string} email - Full email address
 * @param {number} usernameChars - Number of visible chars before masking (default: 2)
 * @param {number} domainChars - Number of visible chars of domain before masking (default: 2)
 * @returns {string} Shortened email
 */
export const shortenEmail = (email, usernameChars = 2, domainChars = 2) => {
  if (!email || !email.includes("@")) return email;

  const [username, domain] = email.split("@");
  const [domainName, domainExt] = domain.split(".");

  const shortUsername =
    username.length <= usernameChars
      ? username
      : username.slice(0, usernameChars) + "****";

  const shortDomain =
    domainName.length <= domainChars
      ? domainName
      : domainName.slice(0, domainChars) + "****";

  return `${shortUsername}@${shortDomain}.${domainExt}`;
};
