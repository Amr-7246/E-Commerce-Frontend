import { UseGetEntities } from '@/APIs/GetEntitiy'
import React from 'react'
import content from '@/AppContent.json'
import Loading from '@/app/components/Loading'
import Image from 'next/image'
import Link from 'next/link'
import { IProduct } from '@/types/productsType'

const fallbackImg = '/SVG/Retail markdown-amico.svg'

const Cards = ({category , limit , isAll = true, discription, filterQuery } : {category: string | null, limit: number | null | string , isAll: boolean | null, discription : string | null, filterQuery?: string  }) => {
  //~ Start Hooks
  let Endpoint = '';
  if (filterQuery) {
    Endpoint = `products?${filterQuery}`;
  } else {
    Endpoint =  isAll && limit != null ? `products?limit=${limit}` :
                isAll && limit == null ? `products` :
                !isAll && limit == null ?  `products?category=${category}` :
                `products?category=${category}&limit=${limit}`
  }
  const { data , isError, isLoading } = UseGetEntities(Endpoint)
  const products: IProduct[] = Array.isArray(data?.data?.docs) ? data.data.docs : []
  const cardsText = content.Cards
  //~ End Hooks

  if (isLoading) {
    return <Loading />
  }
  if (isError || !data) {
    return (
      <div className="w-full flex items-center justify-center text-[var(--color-error-text)] font-bold py-8">
        {cardsText.loading}
      </div>
    )
  }
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

      { !products ? <div>{cardsText.loading}</div> : products?.map((product:any, idx:any ) => (
        <Link href={`global/store/${product._id}`} key={product._id || idx} className="product-card group" >
          <div className="relative w-full aspect-[4/3] bg-[var(--input-bg)] flex items-center justify-center">
            <Image
              src={product.images?.[0]?.secure_url || fallbackImg}
              alt={product.name || cardsText.noImage}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
              onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = fallbackImg
              }}
            />
            <div className="product-card-hover-mask" />
          </div>
          <div className="flex flex-col gap-2 p-4 flex-1">
            <h2 className="text-lg font-bold text-[var(--text-primary)] truncate">{product.name}</h2>
            <p className="text-sm text-[var(--inactive-text)] line-clamp-2">{product.shortDesc || product.description}</p>
            <div className="flex items-center gap-2 mt-auto">
              <span className="text-[var(--color-price)] font-bold text-base">
                {product.price ? `ج.م ${product.price}` : '--'}
              </span>
              {product.discount && (
                <span className="text-[var(--color-discount)] line-through text-xs">
                  ج.م {product.discount}
                </span>
              )}
            </div>
          </div>
        </Link>
      ))}
      {/* Explore More Card */}
      <div className="product-card flex flex-col items-center justify-center text-center min-h-[260px]">
        <div className="relative w-full aspect-[4/3] bg-[var(--input-bg)] flex items-center justify-center">
          <Image src={fallbackImg} alt={cardsText.exploreMore} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain w-full h-full opacity-80" priority />
          <div className="product-card-hover-mask" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">
            {cardsText.exploreMore}
          </h2>
          <Link href={category ? `/global/store/AllProducts/${category}` : "/store"} className="btn mt-2">
            {cardsText.exploreMoreBtn}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cards
