import { AnimatedModalDemo } from '@/components/Update';
import KanbanView from '@/components/KanbanView';
import { LandingPage } from '@/components/Landing';
import DialogDemo from '../components/Test';
export default function Home() {
    return (
        <main className="flex  flex-col items-center justify-between ">
            {/* <LandingPage /> */}
            <KanbanView />
            <DialogDemo />
            <AnimatedModalDemo />
        </main>
    );
}
