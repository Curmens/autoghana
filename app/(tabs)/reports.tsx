import {
    EmptyState,
    HeaderAction,
    StandardContent,
    StandardFAB,
    StandardHeader,
    StandardPage,
} from '@/components/StandardComponents';
import { router } from 'expo-router';
import React from 'react';
import { FlatList } from 'react-native';
import { theme } from './theme';

// Mock data - replace with your actual data structure
const mockReports = [
    // Empty for demo - will show empty state
];

interface Report {
    id: string;
    title: string;
    description: string;
    date: string;
    status: 'pending' | 'resolved' | 'in-progress';
}

export default function ReportsScreen() {
    const handleCreateReport = () => {
        router.push('/(tabs)/create-report');
    };

    const handleMapView = () => {
        // Navigate to map view
        console.log('Navigate to map view');
    };

    const handleSearch = () => {
        // Open search
        console.log('Open search');
    };

    const renderReport = ({ item }: { item: Report }) => {
        // Report item component would go here
        // Using your existing report card styling
        return null; // Placeholder
    };

    return (
        <StandardPage>

            {/* Standard Header */}
            <StandardHeader
                title="Reports"
                subtitle="Track incidents in your area"
                rightAction={
                    <>
                        <HeaderAction
                            icon="search"
                            onPress={handleSearch}
                            accessibilityLabel="Search reports"
                        />
                        <HeaderAction
                            icon="map"
                            onPress={handleMapView}
                            accessibilityLabel="View on map"
                        />
                    </>
                }
            />

            {/* Content */}
            <StandardContent>
                <FlatList
                    data={mockReports}
                    renderItem={renderReport}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingTop: theme.spacing.sm,
                    }}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <EmptyState
                            icon="report"
                            title="No reports yet"
                            subtitle="Be the first to report in your area"
                            actionTitle="Create Report"
                            onAction={handleCreateReport}
                        />
                    }
                />
            </StandardContent>

            {/* Standard FAB */}
            <StandardFAB
                label="New Report"
                onPress={handleCreateReport}
                icon="add"
            />

        </StandardPage>
    );
}