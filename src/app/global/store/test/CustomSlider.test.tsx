// "use client"

// import { render , screen , fireEvent , waitFor } from '@testing-library/react';
// import CustomSlider from '../CustomSlider';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import { UseGetEntities } from '@/app/APIs/GetEntitiy';
// import { useOrder } from '@/app/context/order/OrdersContext';
// import { useCartContext } from '@/app/context/cart/CartContext';
// import { useGlobalContext } from '@/app/context/Global/GlobalContext';
// import '@testing-library/jest-dom';

// // ~ Mock (Ignor its test) hooks and API call
//     jest.mock('@/app/APIs/GetEntitiy');
//     jest.mock('@/app/context/order/OrdersContext');
//     jest.mock('@/app/context/cart/CartContext');
//     jest.mock('@/app/context/Global/GlobalContext');
// // ~ Mock (Ignor its test) hooks and API call
// // ~ Testing Script 
//     describe('CustomSlider', () => {
//         // * ########## mockData
//           const mockData = {
//               data: {
//                   docs: [
//                       { _id: '1', name: 'Product 1', price: 10.99, images: [{ secure_url: 'url1' }], description: 'Desc 1', discount: 2, variants: [] },
//                       { _id: '2', name: 'Product 2', price: 20.99, images: [{ secure_url: 'url2' }], description: 'Desc 2', discount: 0, variants: [] },
//                   ]
//               }
//           };
//         // * ########## mockData
//         // * ########## beforeEach
//           beforeEach(() => {
//             UseGetEntities.mockReturnValue({ data: mockData, isError: false, isLoading: false });
//             useOrder.mockReturnValue({ createOrder: jest.fn(), clearOrder: jest.fn() });
//             useCartContext.mockReturnValue({ setCartProducts: jest.fn() });
//             useGlobalContext.mockReturnValue({ setWhichCatigory: jest.fn() });
//           });
//         // * ########## beforeEach
//         // * ########## rendering the slider with product data
//           it('should render the slider with product data', async () => {
//             render(<CustomSlider title="Featured Products" category="featured" />);

//             // Check if the slider title is rendered
//             expect(screen.getByText('Featured Products')).toBeInTheDocument();

//             // Check if product names are rendered
//             expect(screen.getByText('Product 1')).toBeInTheDocument();
//             expect(screen.getByText('Product 2')).toBeInTheDocument();

//             // Check if product prices are displayed
//             expect(screen.getByText('$10.99')).toBeInTheDocument();
//             expect(screen.getByText('$20.99')).toBeInTheDocument();
//           });
//         // * ########## rendering the slider with product data

//       it('should show a loading state', async () => {
//         UseGetEntities.mockReturnValueOnce({ data: null, isError: false, isLoading: true });
//         render(<CustomSlider title="Featured Products" category="featured" />);

//         // ! Check if loading component is shown
//           expect(screen.getByText('Pleas Wait ...')).toBeInTheDocument(); // Assuming 'Loading' component has text 'Loading...'
//         // ! Check if loading component is shown
//       });

//       it('should show an error state if data fetch fails', async () => {
//         UseGetEntities.mockReturnValueOnce({ data: null, isError: true, isLoading: false });
//         render(<CustomSlider title="Featured Products" category="featured" />);

//         // Check if error message is displayed ############ Error #########
//             expect(screen.getByText('Sorry bro, something went wrong')).toBeInTheDocument();
//         // Check if error message is displayed ############ Error #########
//       });

//       it('should handle left and right arrow button clicks', async () => {
//         render(<CustomSlider title="Featured Products" category="featured" />);
//         // ! ############ Error #########
//             const leftArrow = screen.getByRole('button', { name: /left/i }); 
//         // ! ############ Error #########
//         const rightArrow = screen.getByRole('button', { name: /right/i });

//         // Mock scrollBy function to test if the slider scrolls
//         const scrollByMock = jest.fn();
//         Object.defineProperty(window, 'scrollBy', {
//           writable: true,
//           value: scrollByMock,
//         });

//         // Click on the right arrow
//         fireEvent.click(rightArrow);
//         expect(scrollByMock).toHaveBeenCalledWith(expect.objectContaining({ left: expect.any(Number), behavior: 'smooth' }));

//         // Click on the left arrow
//         fireEvent.click(leftArrow);
//         expect(scrollByMock).toHaveBeenCalledWith(expect.objectContaining({ left: expect.any(Number), behavior: 'smooth' }));
//       });

//       it('should add a product to the cart', async () => {
//         render(<CustomSlider title="Featured Products" category="featured" />);
//         // ! ############ Error #########
//             const addToCartButton = screen.getByText('Add to Cart');
//         // ! ############ Error #########
//         fireEvent.click(addToCartButton);

//         // Check if the cart action is called
//         expect(useCartContext().setCartProducts).toHaveBeenCalled();

//         // Check if the button changes after being clicked
//         expect(screen.getByText('Added . . Go to cart ?')).toBeInTheDocument();
//       });

//       it('should redirect to cart when "Go to cart" is clicked', async () => {
//         render(<CustomSlider title="Featured Products" category="featured" />);
//         // ! ############ Error #########
//             const buyNowButton = screen.getByText('Add to Cart');
//         // ! ############ Error #########
//         fireEvent.click(buyNowButton);

//         // Test if the link to cart works correctly (mock redirection or check behavior)
//         const link = screen.getByText('Added . . Go to cart ?');
//         expect(link).toHaveAttribute('href', expect.stringContaining('/global/cart'));
//       });
//     });
// // ~ Testing Script 
