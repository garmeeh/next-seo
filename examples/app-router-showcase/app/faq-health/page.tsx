import { FAQJsonLd } from "next-seo";

export default function HealthFAQPage() {
  return (
    <div className="container mx-auto p-8">
      <FAQJsonLd
        questions={[
          {
            question: "What are the symptoms of COVID-19?",
            answer: `<p>The most common symptoms of COVID-19 include:</p>
<ul>
  <li>Fever or chills</li>
  <li>Cough</li>
  <li>Shortness of breath or difficulty breathing</li>
  <li>Fatigue</li>
  <li>Muscle or body aches</li>
  <li>Loss of taste or smell</li>
</ul>
<p>If you experience any of these symptoms, <strong>contact your healthcare provider immediately</strong>.</p>`,
          },
          {
            question: "How do I schedule a vaccination appointment?",
            answer: `<p>To schedule your vaccination appointment:</p>
<ol>
  <li>Visit our <a href="/vaccine-scheduler">online scheduling portal</a></li>
  <li>Call our hotline at <strong>1-800-VACCINE</strong></li>
  <li>Visit any participating pharmacy or health center</li>
</ol>
<p>Appointments are available <em>Monday through Saturday, 8 AM to 6 PM</em>.</p>`,
          },
          {
            question: "What health insurance plans are accepted?",
            answer: `<p>We accept most major health insurance plans including:</p>
<ul>
  <li>Medicare (Parts A, B, C, and D)</li>
  <li>Medicaid</li>
  <li>Blue Cross Blue Shield</li>
  <li>Aetna</li>
  <li>UnitedHealthcare</li>
  <li>Cigna</li>
</ul>
<p>For uninsured patients, we offer <strong>sliding scale fees</strong> based on income. Contact our <a href="/financial-assistance">financial assistance office</a> for more information.</p>`,
          },
          {
            question: "What preventive health screenings are recommended?",
            answer: `<p>Recommended preventive health screenings vary by age and risk factors:</p>
<div>
  <h4>Ages 18-39:</h4>
  <ul>
    <li>Blood pressure check every 2 years</li>
    <li>Cholesterol check every 5 years</li>
    <li>Annual dental exam</li>
  </ul>
  
  <h4>Ages 40-65:</h4>
  <ul>
    <li>Annual blood pressure and cholesterol checks</li>
    <li>Diabetes screening every 3 years</li>
    <li>Cancer screenings as recommended</li>
  </ul>
  
  <h4>Ages 65+:</h4>
  <ul>
    <li>All previous screenings plus bone density test</li>
    <li>Annual cognitive assessment</li>
    <li>Fall risk assessment</li>
  </ul>
</div>
<p>Consult with your healthcare provider for personalized recommendations.</p>`,
          },
          {
            question: "How can I access my medical records online?",
            answer: `<p>Access your medical records through our secure patient portal:</p>
<ol>
  <li>Go to <a href="/patient-portal">our patient portal</a></li>
  <li>Log in with your username and password</li>
  <li>Navigate to "Medical Records" section</li>
  <li>View, download, or print your records</li>
</ol>
<p><strong>First-time users:</strong> You'll need your patient ID and date of birth to register. For assistance, call <strong>1-800-RECORDS</strong>.</p>`,
          },
        ]}
      />

      <div className="prose lg:prose-xl max-w-none">
        <div className="bg-blue-50 p-4 rounded-lg mb-8">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This is an example of a health-focused FAQ
            page. In production, FAQ rich results are only available for
            well-known, authoritative government or health websites as
            determined by Google.
          </p>
        </div>

        <h1>Health Services FAQ</h1>
        <p className="lead">
          Find answers to common questions about our health services, insurance,
          and patient resources.
        </p>

        <div className="mt-8 space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">
              What are the symptoms of COVID-19?
            </h2>
            <div className="text-gray-700">
              <p>The most common symptoms of COVID-19 include:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Fever or chills</li>
                <li>Cough</li>
                <li>Shortness of breath or difficulty breathing</li>
                <li>Fatigue</li>
                <li>Muscle or body aches</li>
                <li>Loss of taste or smell</li>
              </ul>
              <p className="mt-3">
                If you experience any of these symptoms,{" "}
                <strong>contact your healthcare provider immediately</strong>.
              </p>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">
              How do I schedule a vaccination appointment?
            </h2>
            <div className="text-gray-700">
              <p>To schedule your vaccination appointment:</p>
              <ol className="list-decimal ml-6 mt-2">
                <li>
                  Visit our{" "}
                  <a
                    href="/vaccine-scheduler"
                    className="text-blue-600 underline"
                  >
                    online scheduling portal
                  </a>
                </li>
                <li>
                  Call our hotline at <strong>1-800-VACCINE</strong>
                </li>
                <li>Visit any participating pharmacy or health center</li>
              </ol>
              <p className="mt-3 italic">
                Appointments are available Monday through Saturday, 8 AM to 6
                PM.
              </p>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">
              What health insurance plans are accepted?
            </h2>
            <div className="text-gray-700">
              <p>We accept most major health insurance plans including:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Medicare (Parts A, B, C, and D)</li>
                <li>Medicaid</li>
                <li>Blue Cross Blue Shield</li>
                <li>Aetna</li>
                <li>UnitedHealthcare</li>
                <li>Cigna</li>
              </ul>
              <p className="mt-3">
                For uninsured patients, we offer{" "}
                <strong>sliding scale fees</strong> based on income. Contact our{" "}
                <a
                  href="/financial-assistance"
                  className="text-blue-600 underline"
                >
                  financial assistance office
                </a>{" "}
                for more information.
              </p>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">
              What preventive health screenings are recommended?
            </h2>
            <div className="text-gray-700">
              <p>
                Recommended preventive health screenings vary by age and risk
                factors:
              </p>
              <div className="mt-3">
                <h4 className="font-semibold">Ages 18-39:</h4>
                <ul className="list-disc ml-6 mb-3">
                  <li>Blood pressure check every 2 years</li>
                  <li>Cholesterol check every 5 years</li>
                  <li>Annual dental exam</li>
                </ul>

                <h4 className="font-semibold">Ages 40-65:</h4>
                <ul className="list-disc ml-6 mb-3">
                  <li>Annual blood pressure and cholesterol checks</li>
                  <li>Diabetes screening every 3 years</li>
                  <li>Cancer screenings as recommended</li>
                </ul>

                <h4 className="font-semibold">Ages 65+:</h4>
                <ul className="list-disc ml-6 mb-3">
                  <li>All previous screenings plus bone density test</li>
                  <li>Annual cognitive assessment</li>
                  <li>Fall risk assessment</li>
                </ul>
              </div>
              <p className="mt-3">
                Consult with your healthcare provider for personalized
                recommendations.
              </p>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">
              How can I access my medical records online?
            </h2>
            <div className="text-gray-700">
              <p>
                Access your medical records through our secure patient portal:
              </p>
              <ol className="list-decimal ml-6 mt-2">
                <li>
                  Go to{" "}
                  <a href="/patient-portal" className="text-blue-600 underline">
                    our patient portal
                  </a>
                </li>
                <li>Log in with your username and password</li>
                <li>Navigate to "Medical Records" section</li>
                <li>View, download, or print your records</li>
              </ol>
              <p className="mt-3">
                <strong>First-time users:</strong> You'll need your patient ID
                and date of birth to register. For assistance, call{" "}
                <strong>1-800-RECORDS</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
