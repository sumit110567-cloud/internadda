import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    // General
    { q: "Is InternAdda MSME registered?", a: "Yes, InternAdda is a Udyam Govt. of India registered enterprise (Registration No. UDYAM-xx-xx-xxxxxx)." },
    { q: "How many students are on the platform?", a: "We currently support over 7,200 active students and have partnered with 150+ colleges across India." },
    { q: "Is InternAdda a legitimate platform?", a: "Absolutely. We are a registered Indian company with a physical office in Bangalore. We have helped thousands of students get internships and work experience." },
    { q: "Who can join InternAdda?", a: "Any student (school, college, or recent graduate) can join. We have opportunities for various skill levels and domains." },
    { q: "Is there any fee to register on InternAdda?", a: "Registration is completely free. You only pay when you apply for certain premium internships or certification programs, which are clearly mentioned." },

    // Internship Process
    { q: "How do I apply for an internship?", a: "Simply create a profile, browse internships, and click 'Apply'. Some internships may require a small fee for processing and certification." },
    { q: "What is the selection process?", a: "After applying, you may be asked to complete a short assessment or submit a portfolio. The employer then reviews and selects candidates." },
    { q: "Are internships remote or in-office?", a: "We offer both remote and in-office internships depending on the company's requirements. Each listing clearly mentions the mode." },
    { q: "What is the typical duration of an internship?", a: "Internships usually range from 1 to 6 months. The exact duration is mentioned in the job description." },
    { q: "Do interns get a stipend?", a: "Some internships are paid, others are unpaid but offer valuable experience and certification. Stipend details are mentioned in the posting." },

    // Certificates & Benefits
    { q: "Will I receive a certificate after completing an internship?", a: "Yes, upon successful completion, you will receive a verified digital certificate that can be shared on LinkedIn and resume." },
    { q: "Are the certificates recognized by companies?", a: "Our certificates are widely recognized by partner companies and can boost your resume. They include a unique ID and QR code for verification." },
    { q: "Do you offer placement assistance?", a: "Yes, we provide career guidance, resume reviews, and interview preparation tips. Some programs include direct placement support." },
    { q: "Can I add InternAdda experience to my LinkedIn?", a: "Absolutely! We encourage you to add your internship under 'Experience' and share your certificate." },

    // Payments & Refunds
    { q: "What payment methods do you accept?", a: "We accept UPI, credit/debit cards, net banking, and popular wallets." },
    { q: "Is there a refund policy?", a: "If you are not satisfied with a paid internship within 7 days of payment, you can request a refund (subject to terms). Please see our refund policy page." },
    { q: "Do I have to pay for every internship I apply?", a: "No, only some premium internships have an application fee. Most are free to apply." },

    // Technical Support
    { q: "I'm facing issues with my account. What should I do?", a: "Please contact our support team at support@internadda.com or use the chat option on our website. We typically respond within 24 hours." },
    { q: "How do I reset my password?", a: "Click on 'Forgot Password' on the login page and follow the instructions sent to your email." },
    { q: "Can I edit my profile after registration?", a: "Yes, you can update your profile information, skills, and resume anytime from your dashboard." },

    // Partnerships & Collaborations
    { q: "How can my company partner with InternAdda?", a: "We welcome companies to post internships for free. Please visit our 'Partner with Us' page or email partnerships@internadda.com." },
    { q: "Do you offer college collaborations?", a: "Yes, we partner with colleges to provide internships and training programs. Contact us at college@internadda.com." },
  ]

  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-extrabold text-[#0A2647] mb-4 text-center">Frequently Asked Questions</h1>
      <p className="text-center text-gray-600 mb-12">Find answers to common questions about InternAdda internships, certificates, payments, and more.</p>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left font-bold">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-gray-600">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  )
}
