import Main from '@/layouts/main';
import { Link } from '@inertiajs/react';
import React from 'react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface ScheduledShow {
    id: number;
    title: string;
    slug: string;
    description: string;
    host: string;
    schedule_day: string;
    schedule_time: string; // "18:00:00"
}

interface ScheduleProps {
    shows: ScheduledShow[];
}

function formatTime(time: string): string {
    const [hourStr, minuteStr] = time.split(':');
    const hour = parseInt(hourStr, 10);
    const minute = minuteStr;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const h = hour % 12 || 12;
    return `${h}:${minute} ${ampm}`;
}

const Schedule: React.FC<ScheduleProps> = ({ shows }) => {
    const byDay = DAYS.reduce<Record<string, ScheduledShow[]>>((acc, day) => {
        acc[day] = shows.filter((s) => s.schedule_day === day).sort((a, b) => a.schedule_time.localeCompare(b.schedule_time));
        return acc;
    }, {});

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    return (
        <Main>
            <div className="min-h-screen bg-[#0f0f0f] text-white">
                <section className="border-b border-gray-700 bg-[#2d3a1f] py-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold">Schedule</h1>
                    <p className="text-lg text-gray-300">Tune in to your favourite shows</p>
                </section>

                <section className="px-6 py-12">
                    <div className="mx-auto max-w-5xl space-y-10">
                        {DAYS.map((day) => (
                            <div key={day}>
                                <h2
                                    className={`mb-4 text-2xl font-bold ${day === today ? 'text-[#a78bfa]' : 'text-white'}`}
                                >
                                    {day}
                                    {day === today && (
                                        <span className="ml-3 rounded-full bg-[#4a3d5c] px-3 py-0.5 text-sm font-normal">
                                            Today
                                        </span>
                                    )}
                                </h2>

                                {byDay[day].length === 0 ? (
                                    <p className="text-sm text-gray-500">No shows scheduled</p>
                                ) : (
                                    <div className="space-y-3">
                                        {byDay[day].map((show) => (
                                            <div
                                                key={show.id}
                                                className="flex items-center gap-6 rounded-lg bg-[#1a1a1a] p-5"
                                            >
                                                <div className="w-20 shrink-0 text-center">
                                                    <span className="text-lg font-semibold text-[#a78bfa]">
                                                        {formatTime(show.schedule_time)}
                                                    </span>
                                                </div>
                                                <div className="flex-1">
                                                    <Link
                                                        href={`/shows/${show.slug}`}
                                                        className="text-lg font-semibold hover:underline"
                                                    >
                                                        {show.title}
                                                    </Link>
                                                    {show.host && (
                                                        <p className="text-sm text-gray-400">Hosted by {show.host}</p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </Main>
    );
};

export default Schedule;
