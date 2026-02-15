import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    { q: "Is InternAdda MSME registered?", a: "Yes, InternAdda is a Udyam Govt. of India registered enterprise." },
    { q: "How many students are on the platform?", a: "We currently support over 7,200 active students." }
  ]

  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-extrabold text-[#0A2647] mb-12 text-center">Frequently Asked Questions</h1>
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
