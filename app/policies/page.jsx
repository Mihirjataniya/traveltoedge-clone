export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white mt-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          {/* <p className="text-blue-100 text-lg">Effective Date: November 30, 2025</p> */}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="mb-12">
          <p className="text-gray-700 text-lg leading-relaxed">
            <span className="font-semibold text-gray-900">Travel To Edge</span> (referred to as "we," "us," or "our") is committed to maintaining the privacy of the personal information you provide to us when using the Travel To Edge website and its services. This Privacy Policy describes how we collect, use, and protect your personal information.
          </p>
        </div>

        {/* Privacy Promise */}
        <section className="mb-12 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Privacy Promise</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="text-blue-600 mt-1">✓</div>
              <p className="text-gray-700 leading-relaxed">
                At Travel To Edge, your trust is our most important asset. We promise to keep your information secure and use it only as necessary to provide you with the superior, safe, and personal travel experiences we are known for.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="text-blue-600 mt-1">✓</div>
              <p className="text-gray-700 leading-relaxed">
                We will safeguard your information using strict security and confidentiality standards.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="text-blue-600 mt-1">✓</div>
              <p className="text-gray-700 leading-relaxed">
                We will only collect and use the minimum customer information required to deliver our services and inform you about our tours, products, and opportunities.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="text-blue-600 mt-1">✓</div>
              <p className="text-gray-700 leading-relaxed">
                We will not share your personal information with any external organization without your prior consent or unless required by law.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="text-blue-600 mt-1">✓</div>
              <p className="text-gray-700 leading-relaxed">
                We will always maintain control over the confidentiality of your information, even when we work with trusted partners (like verified hotels or transfer providers) to support your journey.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Information We Collect</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">A. Personal Information (PII)</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We collect personal information when you willingly provide it to us, such as when you book a tour, ask for a custom itinerary, subscribe to our blog, or contact our Trip Captain. This may include:
            </p>
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
              <div className="flex gap-3">
                <span className="text-blue-600 font-semibold">•</span>
                <div>
                  <span className="font-semibold text-gray-900">Contact Information:</span>
                  <span className="text-gray-700"> Name, email address, phone number, and mailing address.</span>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-blue-600 font-semibold">•</span>
                <div>
                  <span className="font-semibold text-gray-900">Booking Information:</span>
                  <span className="text-gray-700"> Details needed for travel, such as passport details, travel dates, destinations, and traveler names.</span>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-blue-600 font-semibold">•</span>
                <div>
                  <span className="font-semibold text-gray-900">Health & Safety Information:</span>
                  <span className="text-gray-700"> Dietary restrictions, medical needs, or other essential details for your comfort and safety.</span>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-blue-600 font-semibold">•</span>
                <div>
                  <span className="font-semibold text-gray-900">Payment Information:</span>
                  <span className="text-gray-700"> Billing details (Note: actual payment processing is usually handled by a secure third-party processor).</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">B. Website Usage Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you visit www.traveltoedge.com, we automatically collect non-personal information. This helps us understand how visitors use our website. This includes:
            </p>
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-2">
              <p className="text-gray-700">• Your IP address</p>
              <p className="text-gray-700">• Browser type and operating system</p>
              <p className="text-gray-700">• Pages you view, time spent on the site, and how you navigate the website</p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">2. How We Use Collected Information</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use the information we collect for these purposes:
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
            <div>
              <span className="font-semibold text-gray-900">Service Delivery:</span>
              <span className="text-gray-700"> To create and manage your handcrafted itineraries, process bookings (tours, flights, hotels), and handle transfers.</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Safety and Support:</span>
              <span className="text-gray-700"> To provide the reliable, 24/7 support, including emergency information and local healthcare contacts.</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Personalization:</span>
              <span className="text-gray-700"> To give you personalized content, special offers, and communications based on your travel interests.</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Communication:</span>
              <span className="text-gray-700"> To send you updates, booking confirmations, newsletters, and to respond to your questions via the Trip Captain service.</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Improvement:</span>
              <span className="text-gray-700"> To analyze website usage to make our existing features better and to develop new products and services.</span>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Cookies and Tracking</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use cookies to improve your experience on our website. A cookie is a small data file stored on your device that helps us identify you and speed up your navigation. We use cookies to:
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-2 mb-4">
            <p className="text-gray-700">• Remember your preferences and past searches.</p>
            <p className="text-gray-700">• Analyze site traffic and how users behave.</p>
          </div>
          <p className="text-gray-700 leading-relaxed">
            You can manage or disable cookies through your browser settings, but please be aware that this might affect how our Service works.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Sharing Your Information</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We will not sell, rent, or lease your personal information to others. We may share your information only in these limited cases:
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
            <div>
              <span className="font-semibold text-gray-900">Trusted Partners:</span>
              <span className="text-gray-700"> With our handpicked, trusted partners (like verified hotels, airlines, local guides, and transfer providers), but only as necessary to complete the services you have booked (e.g., sharing your name with a hotel for a reservation).</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Legal Requirements:</span>
              <span className="text-gray-700"> If required by law, subpoena, or other legal processes.</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Safety:</span>
              <span className="text-gray-700"> To protect the rights, property, or safety of Travel To Edge, our users, or others.</span>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Security</h2>
          <p className="text-gray-700 leading-relaxed">
            We are committed to the security of your data. The personal information we collect is stored on secure, limited-access servers. We use physical, electronic, and managerial safeguards to protect your personal data.
          </p>
        </section>

        {/* Section 6 - Contact */}
        <section className="mb-12 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            If you have any questions, comments, or concerns about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-semibold">Email:</span>
              <a href="mailto:travel2edge@gmail.com" className="text-blue-600 hover:text-blue-800 underline">
                travel2edge@gmail.com
              </a>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-semibold">Phone:</span>
              <div className="text-gray-700">
                <a href="tel:+919220457513" className="hover:text-blue-600">+91 92204 57513</a>,{' '}
                <a href="tel:+919739240290" className="hover:text-blue-600">+91 97392 40290</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-semibold">Address:</span>
              <span className="text-gray-700">Vasant Kunj Delhi, 110070</span>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-600 text-sm mb-4">
            This policy is effective as of November 30, 2025. We may update this Privacy Policy from time to time — if we do, we will post the revised policy on this page with a new "Effective Date".
          </p>
          <p className="text-gray-900 font-semibold text-lg">
            Travel To Edge — Your journey. Carefully crafted.
          </p>
        </div>
      </div>
    </div>
  );
}