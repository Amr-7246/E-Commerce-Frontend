import { UseCreateEntitiy } from '@/APIs/CreateEntitiy'
import { useOrder } from '@/context/order/OrdersContext'
import React, { useState } from 'react'
import content from '@/AppContent.json';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

interface OrderFormProps {
  onOrderSent: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onOrderSent }) => {
  const { currentOrder, setCurrentOrder, clearOrder } = useOrder();
  const { mutate } = UseCreateEntitiy();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Centralized text from store.OrderForm
  const t = content.store.OrderForm;

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Remove product from order context
  const handleRemoveProduct = () => {
    if (setCurrentOrder) setCurrentOrder(null);
    clearOrder();
    onOrderSent();
  };

  // Submit order
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.address) {
      setError(t.errorRequired);
      return;
    }
    if (!currentOrder) {
      setError(t.errorGeneral);
      return;
    }
    // Update order context with customer data
    if (setCurrentOrder) {
      setCurrentOrder((prev) => prev ? {
        ...prev,
        customer: {
          name: form.name,
          email: form.email,
          phone: Number(form.phone),
          address: form.address,
          message: form.message,
        },
      } : prev);
    }
    mutate(
      { Data: { ...currentOrder, customer: { ...form, phone: Number(form.phone) } }, Route: 'orders' },
      {
        onSuccess: () => {
          setSuccess(true);
          clearOrder();
          setTimeout(() => {
            onOrderSent();
          }, 1200);
        },
        onError: () => {
          setError(t.errorGeneral);
        },
      }
    );
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-[var(--text-secondary)]">{t.title}</h2>
        <button type="button" onClick={handleRemoveProduct} className="text-[var(--color-error)] hover:text-[var(--color-error-text)] text-2xl" aria-label={t.remove}>
          <FiXCircle />
        </button>
      </div>
      <input
        className="input"
        name="name"
        type="text"
        placeholder={t.name}
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        className="input"
        name="email"
        type="email"
        placeholder={t.email}
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        className="input"
        name="phone"
        type="tel"
        placeholder={t.phone}
        value={form.phone}
        onChange={handleChange}
        required
      />
      <input
        className="input"
        name="address"
        type="text"
        placeholder={t.address}
        value={form.address}
        onChange={handleChange}
        required
      />
      <textarea
        className="input"
        name="message"
        placeholder={t.message}
        value={form.message}
        onChange={handleChange}
        rows={2}
      />
      {error && <div className="text-[var(--color-error-text)] text-sm font-bold">{error}</div>}
      {success && (
        <div className="flex items-center gap-2 text-[var(--color-success-text)] font-bold">
          <FiCheckCircle /> {t.sent}
        </div>
      )}
      <button
        type="submit"
        className="btn flex items-center justify-center gap-2 mt-2"
        disabled={success}
      >
        <FiCheckCircle className="text-lg" /> {t.send}
      </button>
    </motion.form>
  );
}

export default OrderForm