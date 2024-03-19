"use client"
import { useEffect, useState } from 'react';
import { Button } from '../components/component/ui/button'
import CardSf from '../components/component/cardComponent';
import { SkeletonCard } from '@/components/component/skeletonCard';
import OfflineCard from '@/components/component/offlineCard';
import Image from 'next/image';

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
  /*
    const getTournament = async () => {
      try {
        const response = await fetch('/api/getSubTournament');
        const data = await response.json();
        console.log(data, "tournament");
      } catch (error) {
        console.error("Failed to fetch tournaments:", error);
      }
    };
    */
  const [saltMine, setSaltMine] = useState<Tournament[]>([]);
  const [subDomain, setSubDomain] = useState<Tournament[]>([]);
  const [loadig, setLoading] = useState(true);
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await fetch('/api/getTournament');
      const data = await res.json();
      const res2 = await fetch('/api/getSubTournament');
      const data2 = await res2.json();
      setSubDomain(data2);
      setSaltMine(data);
      setLoading(false);
    }

    loadData();
  }, []);

  const communities = ["salt", "c2c", "cls8", "wolf"];
  const subCommunities = ["saltyeu", "newchallenger"];
  const missingCommunities = communities.filter(community =>
    !saltMine.some(tournament => tournament.url.toLowerCase().includes(community))
  );
  const missingSubCommunities = subCommunities.filter(community => !subDomain.some(tournament => tournament.url.toLowerCase().includes(community)));
  const allMissingCommunities = [...missingCommunities, ...missingSubCommunities];

  return (
    <main className="flex items-center flex-col bg-[#0c0a09]">
      {/*<Button onClick={getTournament} className=''> TEST </Button> */}
      <div className='text-center py-10'>
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] md:block text-[#fafaf9] pb-4">Tournaments at a glance</h1>
        <span className='max-w-[750px] text-lg text-muted-foreground sm:text-xl'>SF6 Online tournaments for the EU region</span>
      </div>
      <Image src='/eu.png' alt='sftourney' width={50} height={50} className='mb-4 w-auto h-auto rounded' />
      <div className='overflow-hidden rounded-[0.5rem] border-2 border-[#27272a] bg-dark shadow-md md:shadow-xl'>
        <div className='grid min-h-screen grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-14 items-center justify-between p-12 '>
          {subDomain.map(tournament => (<CardSf key={tournament.url} status={tournament.status} url={tournament.url} community={tournament.community} title={tournament.title} participants={tournament.participants} style={tournament.style} game={tournament.game} date={tournament.date} time={tournament.time} />))}
          {saltMine.map(tournament => (
            <CardSf key={tournament.url} status={tournament.status} url={tournament.url} community={tournament.community} title={tournament.title} participants={tournament.participants} style={tournament.style} game={tournament.game} date={tournament.date} time={tournament.time} />
          ))}

          {loadig ? (
            Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
          ) : allMissingCommunities.map(community => (
            <OfflineCard key={community} community={community} status={''} url={''} title={''} participants={''} style={''} game={''} date={''} time={''} />
          ))}
        </div>
      </div>

    </main>
  );
}
