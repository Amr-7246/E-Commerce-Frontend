"use client"
import React, { useState } from 'react';
import { UseGetEntities } from '@/APIs/GetEntitiy';
import { IProduct } from '@/types/productsType';
import content from '@/AppContent.json';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { FiShoppingCart, FiTag, FiBox, FiPercent, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import OrderForm from '../components/OrderForm';
import { useOrder } from '@/context/order/OrdersContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const fallbackImg = '/SVG/Retail markdown-amico.svg';

const ProductPage = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const { data, isLoading, isError } = UseGetEntities(`products/${id}`);
  const product: IProduct | undefined = data?.data?.doc;
  const text = content.store.ProductPage;
  const variantsText = text.variantsCount;

  // Collapsible variants section
  const [showVariants, setShowVariants] = useState(false);
  const { createOrder, clearOrder } = useOrder();
  const [showOrderForm, setShowOrderForm] = useState(false);

  // Handler for Pay Now button
  const handlePayNow = () => {
    if (product) {
      createOrder(product, { name: '', email: '', phone: '', address: '', message: '', totalAmount: product.price });
      setShowOrderForm(true);
    }
  };

  // Handler for closing the OrderForm
  const handleCloseOrderForm = () => {
    clearOrder();
    setShowOrderForm(false);
  };

  if (isLoading) {
    return (
      <div className="flex-center min-h-[60vh] text-xl font-bold text-[var(--text-secondary)]"> {text.loading} </div>
    );
  }
  if (isError || !product) {
    return (
      <div className="flex-center min-h-[60vh] text-xl font-bold text-[var(--color-error-text)]">
        {text.error}
      </div>
    );
  }

  return (
    <div className="page mb-[140px] flex flex-col items-center gap-8 py-10">
      <div className="w-full mt-[50px] flex flex-col md:flex-row gap-10 items-center justify-center">
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src={product.images?.[0]?.secure_url || fallbackImg}
            alt={product.name}
            width={400}
            height={400}
            className="rounded-xl border border-[var(--border)] object-cover w-full max-w-[400px] h-auto shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-6 items-center text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-secondary)] flex items-center gap-2 justify-center mb-2">
            <FiBox className="inline-block text-[var(--btn-I)]" /> {product.name}
          </h1>
          <div className="w-full flex flex-col gap-2 items-center">
            <p className="text-lg text-[var(--inactive-text)] font-semibold border-b border-dashed border-[var(--border)] pb-2 w-full max-w-md mx-auto"> {product.shortDesc} </p>
            <p className="text-base text-[var(--text-primary)] font-bold leading-relaxed bg-[var(--black)]/50 rounded-lg px-4 py-3 shadow-sm w-full max-w-md mx-auto"> {product.description} </p>
          </div>
          {/* Deteails (Price , Inventory) */}
          <div className="bg-[var(--black)]/50 rounded-lg px-4 py-3 shadow-sm w-full max-w-md mx-auto flex flex-col gap-3 items-center mt-4 ">
            <div className="flex items-center gap-3 justify-center">
              <span className="text-[var(--color-price)] text-2xl font-bold flex items-center gap-1">
                <FiTag /> {product.price ? `ج.م ${product.price}` : '--'}
              </span>
              {/* {product.discount && product.discount > 0 && (
                <span className="text-[var(--color-discount)] text-lg line-through flex items-center gap-1">
                  <FiPercent /> ج.م {product.discount}
                </span>
              )} */}
            </div>
            <div className="flex items-center gap-2 text-[var(--inactive-text)] justify-center">
              <FiShoppingCart />
              <span className="font-medium">{text.inventory}: <span className="font-bold text-[var(--text-primary)]">{product.inventory ?? '--'}</span></span>
            </div>
          </div>
          {/* The Pay now button which show order form C  */}
            <button className="btn mt-6 w-full max-w-xs flex items-center justify-center gap-2" onClick={handlePayNow} >
              <FiShoppingCart className="text-lg" /> {text.payNow}
            </button>
        </div>
      </div>
      {/* Order it */}
      <AnimatePresence>
        {showOrderForm && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" >
            <div className="relative bg-[var(--main)] rounded-xl shadow-lg p-6 w-full max-w-md mx-auto">
              {/* <button className="absolute top-3 left-3 text-[var(--color-error)] hover:text-[var(--color-error-text)] text-2xl" onClick={handleCloseOrderForm} aria-label="إغلاق" >
                <FiX />
              </button> */}
              <OrderForm onOrderSent={handleCloseOrderForm} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductPage;
      // {/* Variants Section - Collapsible */}
      // {/* {product.variants && product.variants.length > 0 && (
      //   <div className="w-full max-w-2xl mt-8">
      //     <button
      //       className="flex items-center gap-2 mx-auto mb-4 text-[var(--text-secondary)] font-bold text-lg hover:underline focus:outline-none"
      //       onClick={() => setShowVariants((prev) => !prev)}
      //       aria-expanded={showVariants}
      //       aria-controls="variants-section"
      //     >
      //       {variantsText} : {product.variants.length}
      //       {showVariants ? <FiChevronUp className="text-xl" /> : <FiChevronDown className="text-xl" />}
      //     </button>
      //     {showVariants && (
      //       <div id="variants-section" className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
      //         {product.variants.map((variant, idx) => (
      //           <div key={idx} className="bg-[var(--main)] border border-[var(--border)] rounded-lg p-4 flex flex-col gap-2 items-center shadow">
      //             <div className="flex flex-wrap gap-2 justify-center">
      //               {variant.options.map((opt, i) => (
      //                 <span key={i} className="bg-[var(--btn-I)] text-[var(--text-inverted)] px-2 py-1 rounded text-sm font-semibold">
      //                   {opt.name}: {opt.value}
      //                 </span>
      //               ))}
      //             </div>
      //             {variant.price && (
      //               <span className="text-[var(--color-price)] font-bold">{text.price}: ج.م {variant.price}</span>
      //             )}
      //             {variant.inventory !== null && (
      //               <span className="text-[var(--inactive-text)]">{text.inventory}: {variant.inventory}</span>
      //             )}
      //             {variant.images && variant.images.length > 0 && (
      //               <div className="flex gap-2 mt-2 flex-wrap justify-center">
      //                 {variant.images.map((img, j) => (
      //                   <Image key={j} src={img.secure_url} alt="variant" width={60} height={60} className="rounded border border-[var(--border)] object-cover" />
      //                 ))}
      //               </div>
      //             )}
      //           </div>
      //         ))}
      //       </div>
      //     )}
      //   </div>
      // )} */}