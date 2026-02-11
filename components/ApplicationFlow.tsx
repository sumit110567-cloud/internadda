'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, Clock } from 'lucide-react'

interface ApplicationFlowProps {
  internshipId: string
  internshipTitle: string
  company: string
  onComplete?: () => void
}

type Step = 'intro' | 'details' | 'payment' | 'test' | 'success'

export function ApplicationFlow({
  internshipId,
  internshipTitle,
  company,
  onComplete,
}: ApplicationFlowProps) {
  const [currentStep, setCurrentStep] = useState<Step>('intro')
  const [formData, setFormData] = useState({
    phone: '',
    college: '',
    currentYear: '',
    cgpa: '',
  })
  const [testAnswers, setTestAnswers] = useState<Record<number, string>>({})
  const [testScore, setTestScore] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const handleDetailsSubmit = () => {
    if (formData.phone && formData.college && formData.currentYear) {
      setCurrentStep('payment')
    }
  }

  const handlePaymentSuccess = () => {
    setCurrentStep('test')
  }

  const handleTestSubmit = () => {
    // Calculate score based on correct answers
    const correctAnswers = { 0: 'a', 1: 'b', 2: 'c', 3: 'a', 4: 'c' }
    let score = 0
    for (let i = 0; i < 5; i++) {
      if (testAnswers[i] === correctAnswers[i as keyof typeof correctAnswers]) {
        score++
      }
    }
    const percentage = (score / 5) * 100
    setTestScore(percentage)
    if (percentage >= 50) {
      setCurrentStep('success')
      setSubmitted(true)
    } else {
      setCurrentStep('success')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {currentStep === 'intro' && (
        <IntroStep
          internshipTitle={internshipTitle}
          company={company}
          onNext={() => setCurrentStep('details')}
        />
      )}
      {currentStep === 'details' && (
        <DetailsStep
          formData={formData}
          setFormData={setFormData}
          onNext={handleDetailsSubmit}
          onBack={() => setCurrentStep('intro')}
        />
      )}
      {currentStep === 'payment' && (
        <PaymentStep
          amount={199}
          onSuccess={handlePaymentSuccess}
          onBack={() => setCurrentStep('details')}
        />
      )}
      {currentStep === 'test' && (
        <TestStep
          answers={testAnswers}
          setAnswers={setTestAnswers}
          onSubmit={handleTestSubmit}
          onBack={() => setCurrentStep('payment')}
        />
      )}
      {currentStep === 'success' && (
        <SuccessStep score={testScore} onComplete={onComplete} />
      )}
    </div>
  )
}

function IntroStep({
  internshipTitle,
  company,
  onNext,
}: {
  internshipTitle: string
  company: string
  onNext: () => void
}) {
  return (
    <motion.div
      className="space-y-6 p-6 sm:p-8 bg-card rounded-2xl border border-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-black text-foreground">
          Welcome to {company}!
        </h2>
        <p className="text-lg text-muted-foreground">
          You're applying for <span className="font-bold text-foreground">{internshipTitle}</span>
        </p>
      </div>

      <div className="bg-primary/10 rounded-xl p-6 space-y-4">
        <h3 className="font-bold text-foreground">Here's what happens next:</h3>
        <ul className="space-y-3">
          {[
            'Tell us a bit about yourself',
            'Pay ₹199 to unlock the entrance test',
            'Complete 25 tough MCQ questions in 30 minutes',
            'Score 50%+ to get your interview slot',
            'Receive interview link via email within 24 hours',
          ].map((step, idx) => (
            <li key={idx} className="flex gap-3 items-start">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        onClick={onNext}
        className="w-full bg-primary text-white hover:bg-primary/90 font-bold text-base py-6"
      >
        Let's Get Started
        <ArrowRight className="ml-2" size={20} />
      </Button>
    </motion.div>
  )
}

function DetailsStep({
  formData,
  setFormData,
  onNext,
  onBack,
}: {
  formData: any
  setFormData: any
  onNext: () => void
  onBack: () => void
}) {
  return (
    <motion.div
      className="space-y-6 p-6 sm:p-8 bg-card rounded-2xl border border-border"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <h2 className="text-2xl font-black text-foreground">Tell us about yourself</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="+91 99999 00000"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            College / University
          </label>
          <input
            type="text"
            placeholder="Your college name"
            value={formData.college}
            onChange={(e) =>
              setFormData({ ...formData, college: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Current Year
          </label>
          <select
            value={formData.currentYear}
            onChange={(e) =>
              setFormData({ ...formData, currentYear: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select year</option>
            <option value="1st">1st Year</option>
            <option value="2nd">2nd Year</option>
            <option value="3rd">3rd Year</option>
            <option value="4th">4th Year</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            CGPA (Optional)
          </label>
          <input
            type="number"
            placeholder="8.5"
            value={formData.cgpa}
            onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            step="0.1"
            min="0"
            max="10"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 border-border text-foreground hover:bg-muted bg-transparent font-bold py-3"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          className="flex-1 bg-primary text-white hover:bg-primary/90 font-bold py-3"
        >
          Continue
          <ArrowRight className="ml-2" size={18} />
        </Button>
      </div>
    </motion.div>
  )
}

function PaymentStep({
  amount,
  onSuccess,
  onBack,
}: {
  amount: number
  onSuccess: () => void
  onBack: () => void
}) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate Cashfree payment integration
    setTimeout(() => {
      setIsProcessing(false)
      onSuccess()
    }, 2000)
  }

  return (
    <motion.div
      className="space-y-6 p-6 sm:p-8 bg-card rounded-2xl border border-border"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-foreground">Unlock Your Test</h2>
        <p className="text-muted-foreground">
          Secure your spot in the entrance exam
        </p>
      </div>

      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 space-y-4 text-center">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Test Fee</p>
          <p className="text-4xl font-black text-primary">₹{amount}</p>
        </div>
        <div className="border-t border-border pt-4 space-y-2">
          <p className="text-sm text-foreground">
            25 MCQ questions • 30 minutes • High difficulty
          </p>
          <p className="text-xs text-muted-foreground">
            Score 50%+ to get interview shortlist
          </p>
        </div>
      </div>

      <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
        <p className="text-sm text-green-700 font-semibold">
          ✓ Secure payment via Cashfree • 100% safe
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 border-border text-foreground hover:bg-muted bg-transparent font-bold py-3"
        >
          Back
        </Button>
        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className="flex-1 bg-primary text-white hover:bg-primary/90 font-bold py-3"
        >
          {isProcessing ? 'Processing...' : `Pay ₹${amount}`}
        </Button>
      </div>
    </motion.div>
  )
}

function TestStep({
  answers,
  setAnswers,
  onSubmit,
  onBack,
}: {
  answers: Record<number, string>
  setAnswers: any
  onSubmit: () => void
  onBack: () => void
}) {
  const questions = [
    {
      id: 0,
      question: 'What is the primary advantage of microservices architecture?',
      options: [
        'a) Increased scalability and flexibility',
        'b) Reduced development costs',
        'c) Simpler database management',
        'd) Better UI/UX',
      ],
    },
    {
      id: 1,
      question: 'In React, what is the purpose of the useEffect hook?',
      options: [
        'a) To manage component styling',
        'b) To handle side effects and lifecycle events',
        'c) To create state variables',
        'd) To pass props between components',
      ],
    },
    {
      id: 2,
      question: 'What does SQL JOIN do?',
      options: [
        'a) Deletes duplicate records',
        'b) Sorts data alphabetically',
        'c) Combines rows from multiple tables based on related columns',
        'd) Encrypts data',
      ],
    },
    {
      id: 3,
      question: 'What is the time complexity of binary search?',
      options: [
        'a) O(log n)',
        'b) O(n)',
        'c) O(n²)',
        'd) O(n log n)',
      ],
    },
    {
      id: 4,
      question: 'What is REST in API development?',
      options: [
        'a) Rapid Enhancement Software Tools',
        'b) Remote Execution Service Tier',
        'c) Representational State Transfer - architectural style for APIs',
        'd) Reserved Entry System Token',
      ],
    },
  ]

  return (
    <motion.div
      className="space-y-6 p-6 sm:p-8 bg-card rounded-2xl border border-border"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-foreground">Entrance Test</h2>
        <Badge className="bg-primary text-white">25 Questions</Badge>
      </div>

      <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20 flex items-start gap-3">
        <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          <strong>30 minutes</strong> to complete • Questions are intentionally difficult • Focus on accuracy
        </p>
      </div>

      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
        {questions.map((q) => (
          <div key={q.id} className="border-b border-border pb-6 last:border-0">
            <p className="font-semibold text-foreground mb-3">
              {q.id + 1}. {q.question}
            </p>
            <div className="space-y-2">
              {q.options.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer hover:bg-muted transition-colors"
                >
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    value={option[0]}
                    checked={answers[q.id] === option[0]}
                    onChange={(e) =>
                      setAnswers({ ...answers, [q.id]: e.target.value })
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-foreground">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 border-border text-foreground hover:bg-muted bg-transparent font-bold py-3"
        >
          Back
        </Button>
        <Button
          onClick={onSubmit}
          className="flex-1 bg-primary text-white hover:bg-primary/90 font-bold py-3"
        >
          Submit Test
        </Button>
      </div>
    </motion.div>
  )
}

function SuccessStep({
  score,
  onComplete,
}: {
  score: number
  onComplete?: () => void
}) {
  const passed = score >= 50

  return (
    <motion.div
      className="space-y-6 p-6 sm:p-8 bg-card rounded-2xl border border-border text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
          passed ? 'bg-green-500/20' : 'bg-amber-500/20'
        }`}
      >
        <span className="text-4xl font-black">
          {passed ? '✓' : '⚠'}
        </span>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-black text-foreground">
          {passed ? 'Congratulations! 🎉' : 'Keep Trying!'}
        </h2>
        <p className="text-lg text-muted-foreground">
          Your score: <span className="font-bold text-foreground">{score.toFixed(0)}%</span>
        </p>
      </div>

      {passed ? (
        <div className="bg-green-500/10 rounded-lg p-6 space-y-4 border border-green-500/20">
          <p className="font-semibold text-green-700">Test Passed!</p>
          <p className="text-sm text-green-600">
            You've qualified for the interview. Check your email within 24 hours for interview details.
          </p>
          <div className="space-y-2 text-sm text-foreground">
            <p>• Interview link will be sent shortly</p>
            <p>• Stay tuned to your email & phone</p>
            <p>• Prepare well for the next round!</p>
          </div>
        </div>
      ) : (
        <div className="bg-amber-500/10 rounded-lg p-6 space-y-4 border border-amber-500/20">
          <p className="font-semibold text-amber-700">Need 50% to Qualify</p>
          <p className="text-sm text-amber-600">
            You scored {score.toFixed(0)}%. You can apply again after 7 days. Keep learning!
          </p>
        </div>
      )}

      <Button
        onClick={onComplete}
        className="w-full bg-primary text-white hover:bg-primary/90 font-bold py-6 text-base"
      >
        Back to Home
        <ArrowRight className="ml-2" size={20} />
      </Button>
    </motion.div>
  )
}
