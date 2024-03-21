import {NextApiRequest, NextApiResponse} from "next";

export default async function getSubTournament(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const auth = Buffer.from(
      `${process.env.API_USER}:${process.env.API_KEY}`
    ).toString("base64");

    const communities = ["saltyeu", "newchallenger"];
    const moment = require("moment-timezone");

    const fetchPromises = communities.map(async (community) => {
      const url = `https://api.challonge.com/v1/tournaments.json?state=pending&subdomain=${community}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch the tournaments: ${response.statusText}`
        );
      }

      const data = await response.json();

      const tournaments = data.map((item: any) => {
        const {tournament} = item;
        const dateTime = new Date(tournament.start_at);
        const formattedTime =
          moment(tournament.start_at, "HH:mm:ss").format("h:mm A") + " CET";
        return {
          status: tournament.state,
          community: tournament.subdomain,
          url: tournament.full_challonge_url,
          title: tournament.name,
          participants:
            tournament.participants_count.toString() + " Participants",
          style:
            tournament.tournament_type.charAt(0).toUpperCase() +
            tournament.tournament_type.slice(1),
          game: tournament.game_name,
          date: dateTime.toDateString(),
          time: formattedTime,
        };
      });
      return tournaments;
    });

    const allTournaments = await Promise.all(fetchPromises);
    const flattenedTournaments = allTournaments.flat();

    const filteredTournaments = flattenedTournaments.filter(
      (tournament) =>
        tournament.status !== "Completed" &&
        tournament.game === "Street Fighter 6" &&
        tournament.status !== "group_stages_underway"
    );

    res.status(200).json(filteredTournaments);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Server error"});
  }
}
