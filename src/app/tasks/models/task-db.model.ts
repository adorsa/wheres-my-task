export interface TaskDb {
    id: string;
    title: string;
    description: string | null;
    status: 'active' | 'completed' | 'cancelled';
    time_start: string | null;
    time_end: string | null;
    latitude: number | null;
    longitude: number | null;
    created_at: string;
}