import React from 'react'

const Cart = ({cart}) => {

  const subtotal = cart.reduce((total, item) => {
  return total + item.price * item.quantity;
}, 0);
  return (
    <div className="p-5">
  <h1 className="text-2xl font-bold mb-4">My Cart</h1>

  {cart.map((item, index) => (
    <div
      key={index}
      className="flex justify-between items-center border p-4 mb-3 rounded-lg"
    >
      <div>
        <span className="text-6xl">{item.icon}</span>
        <h2 className="font-bold">{item.name}</h2>
        <p>Price: Rs. {item.price}</p>
        <p>Quantity: {item.quantity}</p>
      </div>

      <h2 className="font-bold">
        Rs. {item.price * item.quantity}
      </h2>
    </div>
  ))}

  {/* Subtotal */}
  <div className="border-t pt-4 mt-5 flex justify-between items-center">
    <h2 className="text-xl font-bold">Subtotal:</h2>
    <h2 className="text-xl font-bold text-blue-600">
      Rs. {subtotal.toLocaleString("en-PK")}
    </h2>
  </div>
</div>
  )
}

export default Cart
