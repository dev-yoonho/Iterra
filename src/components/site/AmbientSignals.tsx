import type { AgentSignalData } from '@/types/site'

type AmbientSignalsProps = {
  signals: AgentSignalData[]
}

export const AmbientSignals = ({ signals }: AmbientSignalsProps) => {
  const ambient = signals.filter((signal) => signal.surface === 'ambient').slice(0, 2)

  if (ambient.length === 0) {
    return null
  }

  return (
    <div aria-hidden="true" className="ambient-signals">
      {ambient.map((signal, index) => (
        <div className="ambient-signals__item" key={signal.name}>
          <span className="ambient-signals__index">A{index + 1}</span>
          <strong>{signal.name}</strong>
          <small>{signal.blurb}</small>
        </div>
      ))}
    </div>
  )
}
