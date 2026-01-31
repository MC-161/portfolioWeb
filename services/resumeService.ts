
// Official hosted PDF resume link
const RESUME_URL = "https://drive.google.com/file/d/15QT5SmFQlAle6DSxj_buyOyTNAkD2BMD/view?usp=sharing";

const GITHUB_URL = "https://github.com/MC-161";

export const downloadResume = () => {
  // Opening in a new tab for seamless viewing experience
  window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
};

export const goToGithub = () => {
  // Opening in a new tab for seamless viewing experience
  window.open(GITHUB_URL, '_blank', 'noopener,noreferrer');
};

export const printResume = () => {
  window.print();
};
