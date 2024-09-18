import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">About YUMMY</h1>
      <p className="text-lg mb-4">
        <strong>Welcome to YUMMY!</strong>
      </p>
      <p className="text-lg mb-4">
        YUMMY is your ultimate destination for delightful and convenient online food delivery. We bring the best restaurants and local favorites right to your doorstep, ensuring that you can enjoy a wide variety of delicious meals, whether you're at home, at work, or on the go.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
      <p className="text-lg mb-4">
        At YUMMY, our mission is simple: to make it easier for you to enjoy the food you love. We believe that great food should be accessible to everyone, and our platform is designed to connect you with your favorite dishes from the best restaurants around. Whether you're craving a quick snack, a hearty meal, or something exotic, YUMMY has got you covered.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose YUMMY?</h2>
      <ul className="list-disc list-inside text-lg mb-4">
        <li><strong>Wide Selection:</strong> We partner with a vast range of restaurants, offering everything from traditional dishes to the latest culinary trends.</li>
        <li><strong>Convenience:</strong> With just a few clicks, you can browse menus, place your order, and have it delivered to your doorstep.</li>
        <li><strong>Quality Service:</strong> We prioritize customer satisfaction, ensuring that your food is delivered fresh and on time.</li>
        <li><strong>Safety:</strong> We adhere to strict hygiene and safety standards, so you can enjoy your meal with peace of mind.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">How It Works</h2>
      <ol className="list-decimal list-inside text-lg mb-4">
        <li><strong>Browse:</strong> Explore a diverse range of restaurants and cuisines on our platform.</li>
        <li><strong>Order:</strong> Choose your favorite dishes and place an order with ease.</li>
        <li><strong>Track:</strong> Stay updated with real-time order tracking as your meal makes its way to you.</li>
        <li><strong>Enjoy:</strong> Savor your meal delivered hot and fresh to your location.</li>
      </ol>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Join Us on a Culinary Journey</h2>
      <p className="text-lg mb-4">
        YUMMY is more than just a food delivery service; it’s a community of food lovers who appreciate convenience without compromising on taste. We’re constantly working to expand our reach, bringing new and exciting dining options to your fingertips.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Our Commitment</h2>
      <p className="text-lg mb-4">
        We are committed to making your food delivery experience as smooth and enjoyable as possible. From our easy-to-use website and app to our dedicated customer service team, everything we do is centered around providing you with the best possible experience.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
      <p className="text-lg mb-4">
        Have questions, feedback, or want to partner with us? We’d love to hear from you!
      </p>
      <p className="text-lg mb-2">
        <strong>Email:</strong> <a href="mailto:support@yummy.com" className="text-red-500">support@yummy.com</a>
      </p>
      <p className="text-lg mb-2">
        <strong>Phone:</strong> +123-456-7890
      </p>
      <p className="text-lg">
        <strong>Address:</strong> 123 Yummy Street, Food City, FL 12345
      </p>
    </div>
  );
};

export default About;
