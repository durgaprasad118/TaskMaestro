import { AnimatedModalDemo } from '@/components/Update';
import KanbanView from '@/components/KanbanView';
import { LandingPage } from '@/components/Landing';

export default function Home() {
    return (
        <main className="flex  flex-col items-center justify-between ">
            {/* <LandingPage /> */}
            <KanbanView />
            <AnimatedModalDemo />
        </main>
    );
}
