"use client"
import { useEffect, useState } from 'react';
import CardSf from '../components/component/cardComponent';

interface Tournament {
  id: number;
  state: string
  name: string;
  participants_count: number,
  tournament_type: string,
  game_name: string,
  start_at: string,
  full_challonge_url: string;
}

interface TournamentItem {
  tournament: Tournament;
}

export default function Home(props: TournamentItem) {
  const [saltMine, setSaltMine] = useState<Tournament[]>([]);
  useEffect(() => {
    async function loadData() {
      const res = await fetch('/api/tournaments');
      const data = await res.json();
      console.log(data);
      const tournamentInfo = data.map((item: TournamentItem) => ({
        id: item.tournament.id,
        state: item.tournament.state,
        name: item.tournament.name,
        participants_count: item.tournament.participants_count,
        tournament_type: item.tournament.tournament_type,
        game_name: item.tournament.game_name,
        start_at: item.tournament.start_at,
        full_challonge_url: item.tournament.full_challonge_url
      }));
      setSaltMine(tournamentInfo);
    }

    loadData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {saltMine.map(tournament => (
        <CardSf id={tournament.id} state={tournament.state} name={tournament.name} participants_count={tournament.participants_count} tournament_type={tournament.tournament_type} game_name={tournament.game_name} start_at={tournament.start_at} full_challonge_url={tournament.full_challonge_url} />
      ))}
    </main>
  );
}
