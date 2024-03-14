"use client"
import { useEffect, useState } from 'react';
import { Button } from '../components/component/ui/button'
import { CardContent, Card } from "@/components/component/ui/card";
import CardSf from '../components/component/cardComponent';

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
    const response = await fetch('/api/getTournament');
    const data = await response.json();
    console.log(data); //data is coming through
  }

  const [saltMine, setSaltMine] = useState<Tournament[]>([]);
  useEffect(() => {
    async function loadData() {
      const res = await fetch('/api/getTournament');
      const data = await res.json();
      console.log(data);  //data is coming through
      setSaltMine(data);
    }

    loadData();
  }, []);
  return (
    <main className="flex items-center flex-col bg-[#0c0a09]">
      <Button onClick={getTournament} className='hidden'> TEST </Button>
      <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] md:block text-[#fafaf9]">Tournaments at a glance</h1>
      <span className='max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl'>SF6 Online tournaments for the EU region</span>
      <div className='grid min-h-screen grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-14 items-center justify-between p-12 '>
        {saltMine.map(tournament => (
          <CardSf status={tournament.status} url={tournament.url} community={tournament.community} title={tournament.title} participants={tournament.participants} style={tournament.style} game={tournament.game} date={tournament.date} time={tournament.time} />
        ))}
        <Card className="w-[328px] bg-[#0c0a09]  rounded-lg overflow-hidden">
          <div className="relative">
            <img
              alt="Card image"
              className="w-full opacity-60"
              height="100"
              src="/sml.png"
              style={{
                aspectRatio: "328/100",
                objectFit: "cover",
              }}
              width="328"
            />

          </div>
          <CardContent className="p-4 text-[#a59f9c]">
            <h3 className="text-lg font-semibold h-[56px] text-[#fafaf9]"></h3>
            <div className="flex items-center mt-4 space-x-2 text-sm">

              <span></span>
            </div>
            <div className="flex items-center mt-2 space-x-2 text-sm">

              <span></span>
            </div>
            <div className="flex items-center mt-2 space-x-2 text-sm">

              <span></span>
            </div>
            <div className="flex items-center mt-2 space-x-2 text-sm">

              <span></span>
            </div>
            <div className="flex items-center mt-2 space-x-2 text-sm">

              <span></span>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
