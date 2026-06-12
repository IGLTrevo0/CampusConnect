import "./Footer.css";
import icon from "./assets/Images/ccicon.png";
import SocialLink from "./CSEDSocial";
import instagramIcon from "./components/Iconsfolder/instagramIcon.png";
import linkedinIcon from "./components/Iconsfolder/linkedinIcon.png";
import Mediumicon from "./components/Iconsfolder/Mediumicon.png";
import Xicon from "./components/Iconsfolder/Xicon.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <img src={icon} alt="logoCC" />
        <h3 className="footer-title">CampusConnect</h3>
      </div>
      <div className="footer-right">
        <ul className="footerlist">
          <li><a href="#">Privacy</a></li>
          <li><a href="#">T&C</a></li>
          <li><a href="#">Support</a></li>
        </ul>
      </div>
      <div className="footer-club">
        <a
          className="csedlink"
          href="https://csedvit.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CSED
        </a>
        <p className="copyright">© 2026 CampusConnect. All rights reserved.</p>
      </div>
      <div className="footer-social-links">
        <SocialLink
          icon={instagramIcon}
          url="https://www.instagram.com/csed.vit"
          name="Instagram"
        />
        <SocialLink
          icon={linkedinIcon}
          url="https://www.linkedin.com/company/csedvit/"
          name="LinkedIn"
        />
        <SocialLink
          icon={Mediumicon}
          url="https://csedvit.medium.com/"
          name="Medium"
        />
        <SocialLink icon={Xicon} url="https://x.com/csed_twt" name="X" />
      </div>
    </footer>
  );
}
export default Footer;
