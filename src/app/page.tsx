"use client"
import { useEffect, useState } from 'react';
import { Button } from '../components/component/ui/button'
import CardSf from '../components/component/cardComponent';
import { SkeletonCard } from '@/components/component/skeletonCard';
import OfflineCard from '@/components/component/offlineCard';

interface Tournament {
  status: string
  community: string,
  url: string,
  title: string;
  participants: string,
  style: string,
  game: string,
  date: string,
  time: string;
}

interface TournamentItem {
  tournament: Tournament;
}

export default function Home(props: TournamentItem) {

  // Test button to see if data is coming through /*

  const getTournament = async () => {
    const response = await fetch('/api/getSubTournament');
    const data = await response.json();
    console.log(data); //data is coming through
  }

  const [saltMine, setSaltMine] = useState<Tournament[]>([]);
  const [loadig, setLoading] = useState(true);
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await fetch('/api/getTournament');
      const data = await res.json();
      console.log(data);  //data is coming through
      setSaltMine(data);
      setLoading(false);
    }

    loadData();
  }, []);

  const communities = ["salt", "c2c", "cls8", "wolf", "salty", "new"];
  const missingCommunities = communities.filter(community =>
    !saltMine.some(tournament => tournament.url.toLowerCase().includes(community))
  );

  return (
    <main className="flex items-center flex-col bg-[#0c0a09]">
      <Button onClick={getTournament} className=''> TEST </Button>
      <div className='text-center py-10'>
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] md:block text-[#fafaf9]">Tournaments at a glance</h1>
        <span className='max-w-[750px] text-lg text-muted-foreground sm:text-xl'>SF6 Online tournaments for the EU region</span>
      </div>
      <div className='overflow-hidden rounded-[0.5rem] border-2 border-[#27272a] bg-dark shadow-md md:shadow-xl'>
        <div className='grid min-h-screen grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-14 items-center justify-between p-12 '>
          {saltMine.map(tournament => (
            <CardSf status={tournament.status} url={tournament.url} community={tournament.community} title={tournament.title} participants={tournament.participants} style={tournament.style} game={tournament.game} date={tournament.date} time={tournament.time} />
          ))}

          {loadig ? (
            Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
          ) : missingCommunities.map(community => (
            <OfflineCard community={community} status={''} url={''} title={''} participants={''} style={''} game={''} date={''} time={''} />
          ))}
        </div>
      </div>

    </main>
  );
}
