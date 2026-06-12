function CSEDSocial({ icon, url, name }) {
  return (
    <a className="social-link" href={url} target="_blank" rel="noopener noreferrer">
      <img src={icon} alt={name} />
    </a>
  );
}
export default CSEDSocial;