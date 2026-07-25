import { stackItems } from '../data/portfolioData';

export default function StackSection() {
  return (
    <section className="section" id="stack">
      <div className="section-header">
        <div className="section-label">stack</div>
        <span className="section-link">VIEW ALL →</span>
      </div>

      <div className="stack-pills">
        {stackItems.map((item) => (
          <span className="stack-pill" key={item}>{item}</span>
        ))}
        <span className="stack-pill more">+ more</span>
      </div>
    </section>
  );
}
