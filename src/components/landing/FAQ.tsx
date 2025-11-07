import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { Section } from './Section';

export const FAQ = () => {
  return (
    <Section
      title="Frequently Asked Questions"
      subtitle="Have Questions?"
      description="Find answers to common questions about the GDG Fall Hackathon 2025"
    >
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How do I submit my project?</AccordionTrigger>
          <AccordionContent>
            After signing up, navigate to the dashboard and click &quot;Submit Project&quot;. Fill in your project details, add team members, technologies used, demo links, and repository URL. You can save as a draft and continue editing until the deadline.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>What are the judging criteria?</AccordionTrigger>
          <AccordionContent>
            Projects are evaluated on five criteria: Innovation & Creativity (20 points), Technical Implementation (20 points), User Experience & Design (20 points), Impact & Practicality (20 points), and Presentation & Demo (20 points), for a total of 100 points.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Can I work with a team?</AccordionTrigger>
          <AccordionContent>
            Yes! You can add team members to your project submission. Simply enter their email addresses when creating your project, and they&apos;ll be able to collaborate on the submission.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>When is the submission deadline?</AccordionTrigger>
          <AccordionContent>
            The deadline for project submissions is configured by the hackathon organizers. Check your dashboard or the event details for the exact date and time. Late submissions will not be accepted.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>How can I view other projects?</AccordionTrigger>
          <AccordionContent>
            Visit the Project Archive page to browse all submitted projects. You can filter by category, technology, and sort by rankings or submission date. All projects become publicly visible after the submission deadline.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>How is the winner determined?</AccordionTrigger>
          <AccordionContent>
            Winners are determined by the average score from all assigned judges. Scores are calculated based on the five evaluation criteria. The leaderboard updates in real-time as judges submit their evaluations.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Section>
  );
};
