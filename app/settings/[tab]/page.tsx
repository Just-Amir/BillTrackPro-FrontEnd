import { notFound } from 'next/navigation';
import ProfileContent from './content/ProfileContent';
import BusinessInfoContent from './content/BusinessInfoContent';
import TeamContent from './content/TeamContent';
import BillingContent from './content/BillingContent';
import NotificationsContent from './content/NotificationsContent';
import SecurityContent from './content/SecurityContent';


// Define valid tabs
const validTabs = ['profile', 'business-info', 'team', 'billing', 'notifications', 'security'];

// Component map
const tabComponents: Record<string, React.ComponentType> = {
    'profile': ProfileContent,
    'business-info': BusinessInfoContent,
    'team': TeamContent,
    'billing': BillingContent,
    'notifications': NotificationsContent,
    'security': SecurityContent,
};

interface SettingsTabPageProps {
    params: Promise<{ tab: string }>;
}

export default async function SettingsTabPage({ params }: SettingsTabPageProps) {
    const { tab } = await params;

    // Validate tab parameter
    if (!validTabs.includes(tab)) {
        notFound();
    }

    const TabComponent = tabComponents[tab];

    return <TabComponent />;
}

// Generate static params for all valid tabs
export function generateStaticParams() {
    return validTabs.map((tab) => ({ tab }));
}
