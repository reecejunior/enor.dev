export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-doc-bg pt-32 pb-24 px-6 lg:px-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-doc-text mb-6">Privacy Policy</h1>
        <p className="text-doc-text-muted mb-8">Last updated: October 12, 2026</p>

        <div className="prose prose-invert prose-blue max-w-none text-doc-text-secondary leading-relaxed space-y-6">
          <p>
            At EnorAI Inc. ("we," "us," or "our"), we take the privacy and security of health information extremely seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our API and middleware services (the "Services").
          </p>

          <h2 className="text-2xl font-semibold text-doc-text mt-10 mb-4">1. Information We Process</h2>
          <p>
            EnorAI is a middleware designed specifically for healthcare AI. We process Protected Health Information (PHI) exclusively for the purpose of scrubbing, tokenizing, and validating clinical text. 
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Transient Processing:</strong> Payload data (such as clinical notes sent to our API) is processed in-memory. We do not persist raw PHI to disk unless explicitly configured via a Business Associate Agreement (BAA) for federated learning.</li>
            <li><strong>Telemetry Data:</strong> We collect non-identifiable telemetry data (latency, error rates, token counts) to maintain and improve the reliability of our Services.</li>
            <li><strong>Account Information:</strong> We collect your name, email, billing address, and payment information when you register for an API key.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-doc-text mt-10 mb-4">2. HIPAA Compliance</h2>
          <p>
            EnorAI operates as a Business Associate under the Health Insurance Portability and Accountability Act (HIPAA). If you are a Covered Entity, you must execute a Business Associate Agreement (BAA) with us before transmitting PHI to our production environment.
          </p>

          <h2 className="text-2xl font-semibold text-doc-text mt-10 mb-4">3. Data Security</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information and the PHI you transmit. Our infrastructure is hosted on SOC2 Type II compliant providers, and all data in transit is encrypted using TLS 1.3.
          </p>

          <h2 className="text-2xl font-semibold text-doc-text mt-10 mb-4">4. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2 className="text-2xl font-semibold text-doc-text mt-10 mb-4">5. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact our Data Protection Officer at: <strong>privacy@enorai.com</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
