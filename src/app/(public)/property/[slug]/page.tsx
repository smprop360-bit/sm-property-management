export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
    <div className="p-8 text-center text-brand-navy">
      נכס: {slug} — בקרוב
    </div>
  )
}
