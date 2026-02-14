'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { Plus } from 'lucide-react'

import { cn } from '@/lib/utils'

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        'mb-4 overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white transition-all hover:border-blue-200 hover:shadow-md', 
        className
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'flex flex-1 items-center justify-between gap-4 px-6 py-6 text-left text-base font-bold text-[#0A2647] transition-all outline-none disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]]:bg-slate-50/50 [&[data-state=open]>div]:rotate-45 [&[data-state=open]>div]:bg-[#0A2647] [&[data-state=open]>div]:text-white',
          className,
        )}
        {...props}
      >
        {children}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-all duration-300">
          <Plus className="size-4" />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm transition-all"
      {...props}
    >
      <div className={cn('px-6 pt-0 pb-6 text-slate-500 font-medium leading-relaxed', className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
