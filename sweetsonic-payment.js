/* SweetSonic v4.1 — Payment Integration Layer
   Replace the placeholder checkout handler with your chosen gateway
   (e.g. Razorpay/UPI) when the server-side credentials/API are ready.
*/
window.SweetSonicPayment = {
  startCheckout: function (options) {
    const amount = options && options.amount ? options.amount : 0;
    const item = options && options.item ? options.item : "SweetSonic";
    alert(
      "SweetSonic payment checkout is ready to connect.\n\n" +
      "Item: " + item + "\nAmount: ₹" + amount + "\n\n" +
      "Next step: connect the secure server-side payment gateway."
    );
  }
};
