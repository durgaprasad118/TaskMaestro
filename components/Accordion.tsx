import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';

export function AccordionHome() {
    return (
        <Accordion type="single" collapsible className="w-3/5">
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    Why should I use a task management app?
                </AccordionTrigger>
                <AccordionContent>
                    A task management app helps you organize, prioritize, and
                    track your tasks efficiently, boosting productivity and
                    reducing stress.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
                <AccordionTrigger>
                    Is the app customizable to fit different working styles?
                </AccordionTrigger>
                <AccordionContent>
                    Yes, the app offers various view options (list, kanban,
                    calendar) and customizable workflows to adapt to your
                    preferred working style and project management
                    methodologies.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
                <AccordionTrigger>
                    Can I set reminders and receive notifications?
                </AccordionTrigger>
                <AccordionContent>
                    Yes, you can set custom reminders and receive notifications
                    via email or push alerts to ensure you never miss a task.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
