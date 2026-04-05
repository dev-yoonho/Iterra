type SectionHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
}

export const SectionHeader = ({ eyebrow, title, description }: SectionHeaderProps) => (
  <div className="section-header">
    {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
    <h2>{title}</h2>
    {description ? <p className="section-header__description">{description}</p> : null}
  </div>
)
