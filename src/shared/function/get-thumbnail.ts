const getThumbnail = (source) => {
  const thumbnails = {
    Stripe: 'https://d21r3yo3pas5u.cloudfront.net/webhook/stripe.png',
    Discord: 'https://d21r3yo3pas5u.cloudfront.net/webhook/discord.png',
    GitHub: 'https://d21r3yo3pas5u.cloudfront.net/webhook/github.png',
    PayPal: 'https://d21r3yo3pas5u.cloudfront.net/webhook/paypal.png',
    Twilio: 'https://d21r3yo3pas5u.cloudfront.net/webhook/twilio.png',
  };
  return thumbnails[source];
};

export default getThumbnail;
