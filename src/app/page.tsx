"use client"
import { useEffect, useState } from 'react';
import { Button } from '../components/component/ui/button'
import CardSf from '../components/component/cardComponent';

interface Tournament {
  status: string
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

      const tournamentInfo = data.status.map((_: TournamentItem, i: number) => ({
        status: data.status[i],
        title: data.title[i + 1], //potential out of bounds error
        participants: data.participants[i],
        style: data.style[i],
        game: data.game[i],
        date: data.date[i],
        time: data.time[i]
      }));

      setSaltMine(tournamentInfo);
    }

    loadData();
  }, []);
  return (
    <main className=" flex items-center flex-col" style={{ backgroundImage: `url('/sfbg.webp')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <Button onClick={getTournament}> TEST </Button>
      <div className='grid min-h-screen grid-cols-4 gap-4 items-center justify-between p-24 '>
        {saltMine.map(tournament => (
          <CardSf status={tournament.status} title={tournament.title} participants={tournament.participants} style={tournament.style} game={tournament.game} date={tournament.date} time={tournament.time} />
        ))}
      </div>
    </main>
  );
}
