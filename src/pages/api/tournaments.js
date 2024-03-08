export default async function (req, res) {
  try {
    const auth = Buffer.from(
      `${process.env.API_USER}:${process.env.API_KEY}`
    ).toString("base64");
    const url = `https://api.challonge.com/v1/tournaments.json?state=pending&subdomain=saltmineleague`;

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
    console.log("Data from the external API:", data);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Server error"});
  }
}
