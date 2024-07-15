import KanbanView from '@/components/KanbanView';
import { LandingPage } from '@/components/Landing';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between ">
            {/* <LandingPage /> */}
            <KanbanView />
        </main>
    );
}
