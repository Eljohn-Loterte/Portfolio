import { certifications } from '../data/portfolioData';

export default function CertificationsSection() {
  return (
    <section className="section" id="certifications">
      <div className="section-header">
        <div className="section-label">03 — certifications</div>
        <span className="section-link">ALL CERTIFICATIONS →</span>
      </div>

      <div className="certs-grid">
        {certifications.map((cert, i) => (
          <div className="cert-card" key={i}>
            <div className="cert-icon">{cert.icon}</div>
            <div className="cert-name">{cert.name}</div>
            <div className="cert-issuer">{cert.issuer}</div>
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-verify"
            >
              ‹ VERIFY ›
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
