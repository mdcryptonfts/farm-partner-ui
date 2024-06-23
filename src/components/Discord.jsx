import config from '../data/config.json'; 

const RedirectDiscord = () => {
  useEffect(() => {
    window.location.href = config.URLs.discord;
  }, []);

  return null;
};

export default RedirectDiscord;
