const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__text">
        &copy; {new Date().getFullYear()} Guitar Heaven. All rights reserved.
      </p>
      <p className="footer__github">Github - GoldStar21</p>
    </footer>
  );
};

export default Footer;
