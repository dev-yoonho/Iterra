import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="page-frame">
      <section className="hero-panel">
        <p className="eyebrow">Lost Path</p>
        <h1>이 경로에는 아직 아무 기록도 없습니다.</h1>
        <p>다른 지형으로 이동해서 Iterra의 흔적을 살펴보세요.</p>
        <Link className="inline-link" href="/archive">
          아카이브로 이동
        </Link>
      </section>
    </div>
  )
}

