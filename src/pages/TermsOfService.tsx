export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-doc-bg pt-32 pb-24 px-6 lg:px-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-doc-text mb-6">Terms of Service</h1>
        <p className="text-doc-text-muted mb-8">Last updated: October 12, 2026</p>

        <div className="prose prose-invert prose-blue max-w-none text-doc-text-secondary leading-relaxed space-y-6">
          <p>
            These Terms of Service ("Terms") govern your access to and use of the EnorAI API, website, and related services (collectively, the "Services"). By accessing or using the Services, you agree to be bound by these Terms.
          </p>

          <h2 className="text-2xl font-semibold text-doc-text mt-10 mb-4">1. Use of the Services</h2>
          <p>
            EnorAI grants you a limited, non-exclusive, non-transferable, and revocable license to use our API strictly in accordance with our documentation and these Terms. You agree not to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Reverse engineer, decompile, or disassemble the Services.</li>
            <li>Use the Services to develop a competing product.</li>
            <li>Attempt to circumvent our rate limits or access controls.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-doc-text mt-10 mb-4">2. Healthcare Compliance & BAA</h2>
          <p>
            You acknowledge that EnorAI is a tool to assist with healthcare data compliance, but using EnorAI does not automatically guarantee your application's compliance with HIPAA, GDPR, or other regulations.
          </p>
          <p>
            If you transmit Protected Health Information (PHI) to EnorAI, you must have an active Business Associate Agreement (BAA) with us. EnorAI accepts no liability for PHI transmitted without a BAA or via the "Hobby" tier.
          </p>

          <h2 className="text-2xl font-semibold text-doc-text mt-10 mb-4">3. Fees and Payment</h2>
          <p>
            Fees for our Pay-as-you-go and Enterprise tiers are billed monthly. You agree to provide current, complete, and accurate billing information. EnorAI reserves the right to suspend API access if your payment method fails.
          </p>

          <h2 className="text-2xl font-semibold text-doc-text mt-10 mb-4">4. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, EnorAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising out of your use of the Services.
          </p>

          <h2 className="text-2xl font-semibold text-doc-text mt-10 mb-4">5. Termination</h2>
          <p>
            We may terminate or suspend your access to the Services immediately, without prior notice or liability, for any reason, including if you breach these Terms.
          </p>

          <h2 className="text-2xl font-semibold text-doc-text mt-10 mb-4">6. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at <strong>legal@enorai.com</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
