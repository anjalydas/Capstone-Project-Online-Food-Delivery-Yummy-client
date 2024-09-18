import React from 'react';

const CustomerCare = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Customer Care</h1>
      <p className="mb-4">
        At YUMMY, we strive to provide excellent customer service. If you have any questions, concerns, or need assistance, please reach out to our customer care team.
      </p>

      <h2 className="text-2xl font-semibold mb-4">1. Contact Information</h2>
      <p className="mb-4">
        You can contact our customer care team through the following methods:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Email: <a href="mailto:support@yummy.com" className="text-blue-600 hover:underline">support@yummy.com</a></li>
        <li>Phone: +918200000077</li>
        <li>Yummy.Com, 537 D, Ward 14, Elliyarackal Junction Konni, Pathanamthitta Kerala-689691

</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">2. Customer Support Hours</h2>
      <p className="mb-4">
        Our customer support team is available during the following hours:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
        <li>Saturday - Sunday: Closed</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">3. Frequently Asked Questions (FAQs)</h2>
      <p className="mb-4">
        For common questions and issues, please visit our FAQ page where you can find answers to frequently asked questions.
      </p>

      <h2 className="text-2xl font-semibold mb-4">4. Feedback and Suggestions</h2>
      <p className="mb-4">
        We welcome your feedback and suggestions to help us improve our services. Please send your feedback to us via email.
      </p>

      <h2 className="text-2xl font-semibold mb-4">5. Resolving Issues</h2>
      <p>
        If you have an issue that needs to be resolved, please contact our customer care team as soon as possible. We are committed to addressing your concerns promptly.
      </p>
    </div>
  );
};

export default CustomerCare;
