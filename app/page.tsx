import Draggable from '@/components/Draggable';
import { LandingPage } from '@/components/Landing';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between ">
            {/* <LandingPage /> */}
            <Draggable />
        </main>
    );
}
