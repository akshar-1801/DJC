const transporter = require("../config/email");

const sendOrderConfirmationEmail = async (userEmail, orderDetails) => {
  // console.log(orderDetails);
  const mailOptions = {
    from: "terminator.terminate2024@gmail.com",
    to: userEmail,
    subject: "Order Confirmation - Diamond Jewellery Company",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4CAF50;">Thank you for your order, ${
          orderDetails.userName
        }!</h2>
        <p>We have received your order and it is being processed. Below are the details of your purchase:</p>
        
        <h3 style="color: #4CAF50;">Order Details:</h3>
        <ul style="list-style-type: none; padding: 0;">
          <li><strong>Order ID:</strong> ${orderDetails.razorpay_order_id}</li>
          <li><strong>Payment ID:</strong> ${
            orderDetails.razorpay_payment_id
          }</li>
          <li><strong>Total Amount:</strong> ₹${orderDetails.amount}</li>
          <li><strong>Phone Number:</strong> ${orderDetails.phone_number}</li>
          <li><strong>Shipping Address:</strong> ${orderDetails.address}</li>
        </ul>

        <h3 style="color: #4CAF50;">Products Ordered:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f0f0f0;">
              <th style="border: 1px solid #ddd; padding: 8px;">Product Name</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${orderDetails.cartItems
              .map(
                (item) => `
                <tr>
                  <td style="border: 1px solid #ddd; padding: 8px;">${item.product_name}</td>
                  <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.quantity}</td>
                  <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">₹${item.price}</td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        </table>

        <p style="color: #888;">Sincerely,<br/>The Diamond Jewellery Company Team</p>

        <footer style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #ddd; font-size: 0.9em; color: #888;">
          <p>You are receiving this email because you placed an order with Diamond Jewellery Company.</p>
        </footer>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendCProductReachedEmail = async (userEmail, formData) => {
  const mailOptions = {
    from: "terminator.terminate2024@gmail.com", // Sender's email
    to: userEmail,
    subject: "Your Request Has Been Received - Diamond Jewellery Company",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4CAF50;">Dear ${formData.title} ${formData.lastName},</h2>
        <p>Thank you for reaching out to <strong>Diamond Jewellery Company</strong>. We have received your request and will review it shortly. Our team will get back to you if we can create the custom product you have inquired about.</p>

        <h3 style="color: #4CAF50;">Request Details:</h3>
        <ul style="list-style-type: none; padding: 0;">
          <li><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
          <li><strong>Phone Number:</strong> ${formData.phoneNumber}</li>
          <li><strong>Country:</strong> ${formData.country}</li>
          <li><strong>Subject:</strong> ${formData.subject}</li>
          <li><strong>Message:</strong> ${formData.message}</li>
          <li><strong>Size:</strong> ${formData.size}</li>
          <li><strong>Quantity:</strong> ${formData.quantity}</li>
        </ul>

        <p>We appreciate your interest in our products and look forward to serving you.</p>
        
        <p>Best Regards,<br><strong>Diamond Jewellery Company Team</strong></p>
        <hr style="border: none; border-top: 1px solid #eaeaea;" />
        <p style="font-size: 12px; color: #777;">
          This email was sent from Diamond Jewellery Company. If you received this email in error, please disregard it.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendOrderConfirmationEmail, sendCProductReachedEmail };
