import * as Bowser from 'bowser';

const detectOS = () => {
  const parsedAgent = Bowser.parse(window.navigator.userAgent);

  return {
    browser: parsedAgent.browser.name || 'unknown',
    platform: parsedAgent.platform.type || 'unknown',
  };
};

export default detectOS;
