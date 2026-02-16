import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
const faqs = [

  // About Internadda (Trust + Authority)
  { 
    q: "What is Internadda and is it a legitimate platform?", 
    a: "Internadda is a Delhi-based MSME-registered Indian startup focused on providing affordable and skill-based internship programs for students across India. We operate with complete transparency, verified certifications, and structured skill assessment processes to ensure real learning and career growth."
  },

  { 
    q: "Is Internadda Government registered?", 
    a: "Yes. Internadda is a Udyam (MSME) registered enterprise under the Government of India. We operate as a legally recognized startup providing internship training and certification programs."
  },

  { 
    q: "Who is the founder of Internadda?", 
    a: "Internadda was founded by Lucky Tiwari with the mission of making internships accessible, affordable, and skill-focused for students across India. The platform operates with a transparent partnership structure and student-first approach."
  },

  { 
    q: "How many students trust Internadda?", 
    a: "Thousands of students across India have enrolled in our internship and skill assessment programs. We continuously collaborate with colleges and growing startups to expand opportunities."
  },

  // Fees Transparency (Very Important for SEO + Trust)
  { 
    q: "Is registration on Internadda free?", 
    a: "Yes. Registration on Internadda is completely free. Students can create a profile, explore internships, and browse opportunities without paying anything."
  },

  { 
    q: "Is there any hidden fee on Internadda?", 
    a: "No. Internadda follows a strict no hidden fee policy. All charges, if applicable, are clearly mentioned before enrollment."
  },

  { 
    q: "Why is there a ₹199 fee for some internship programs?", 
    a: "The ₹199 fee is not a registration charge. It is a Skill Assessment & Certification Fee for selected internship programs. This covers structured evaluation, project review, and generation of a verified digital certificate. We keep it affordable to ensure accessibility for students across India."
  },

  { 
    q: "Do I have to pay ₹199 for every internship?", 
    a: "No. Only specific structured internship programs that include skill assessment and verified certification require a ₹199 fee. Many opportunities remain free to explore."
  },

  // Internship Process
  { 
    q: "How does the Internadda internship process work?", 
    a: "Students create a profile, select their desired internship domain, complete the structured tasks or assessment, and upon successful completion receive a verified internship certificate."
  },

  { 
    q: "Are Internadda internships remote or offline?", 
    a: "Most Internadda internships are remote and flexible, allowing students across India to participate. Some partner programs may include hybrid or offline opportunities depending on the organization."
  },

  { 
    q: "What is the duration of Internadda internships?", 
    a: "Internship durations typically range from 1 month to 3 months depending on the selected program and skill domain."
  },

  // Certificates & Career Value
  { 
    q: "Will I receive a certificate after completion?", 
    a: "Yes. Upon successful completion of tasks and assessment, students receive a verified digital internship certificate with unique verification credentials."
  },

  { 
    q: "Is the Internadda certificate valid for resume and LinkedIn?", 
    a: "Yes. Our certificates are designed to be resume-friendly and LinkedIn-ready. Students can add them under Experience or Licenses & Certifications."
  },

  { 
    q: "How is Internadda different from free internship portals?", 
    a: "Unlike random listing portals, Internadda focuses on structured skill-based internships with assessment, evaluation, and certification. Our goal is real skill development, not just application forwarding."
  },

  // Support & Credibility
  { 
    q: "How can I contact Internadda support?", 
    a: "Students can contact our support team via email or through the official website contact page. We aim to respond within 24 working hours."
  },

  { 
    q: "Can colleges collaborate with Internadda?", 
    a: "Yes. We actively collaborate with colleges and training institutes to provide structured internship and skill programs for students."
  },

  { 
    q: "How can companies partner with Internadda?", 
    a: "Startups and organizations can partner with Internadda to offer internship opportunities or skill-based training programs. Visit our Partner page for collaboration details."
  },

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
