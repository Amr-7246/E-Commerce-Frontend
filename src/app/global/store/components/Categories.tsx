import { UseGetEntities } from '@/APIs/GetEntitiy'
import React from 'react'
import content from '@/AppContent.json'
import Loading from '@/app/components/Loading'
import { useWhichCatigoryContext } from '@/context/store/WhichCatigoryContext'

const Categories = () => {
  const { data, isError, isLoading } = UseGetEntities('categories')
  console.log(data)
  const { WhichCatigory, setWhichCatigory } = useWhichCatigoryContext()
  const catText = content.Categories

  if (isLoading) return <Loading />
  if (isError || !data) {
    return (
      <div className="w-full flex items-center justify-center text-[var(--color-error-text)] font-bold py-8">
        {catText.error}
      </div>
    )
  }

  // Ensure we have an array of categories
  const categories = Array.isArray(data) ? data : data?.data.docs || []

  return (
    <section className="w-full flex flex-col gap-6 items-center py-6 border-t border-[var(--border)] pt-10 ">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{catText.headline}</h2>
      <div className="flex flex-wrap gap-4 justify-center w-full">
        {  !categories ? <div>{catText.error}</div> : categories.map((cat: any) => (
          <button
            key={cat._id || cat.name}
            className={`btn ${WhichCatigory === cat._id ? '!bg-transparent !border-[var(--btn-I)] !text-[var(--btn-I)]' : ''} ${!cat.name  ? "hidden" : '' } `}
            onClick={() => setWhichCatigory(cat._id)}
            type="button"
          >
            {cat.name}
          </button>
        ))}
      </div>
    </section>
  )
}

export default Categories
