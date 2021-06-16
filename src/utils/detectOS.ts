import * as Bowser from 'bowser';

const detectOS = () => {
  const parsedAgent = Bowser.parse(window.navigator.userAgent);

  return {
    name: parsedAgent.browser.name,
    os: parsedAgent.os.name,
    platform: parsedAgent.platform.type,
  };
};

export default detectOS;
