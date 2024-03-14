import puppeteer from "puppeteer";

const communities = ["C2C", "Saltmineleague", "WolfTV", "2BeCommUnity"];
// const communinittiesSub = ["saltyeu", "newchallenger"];
// const urlSub = "https://" + communinittiesSub[0] + ".challonge.com/";
// const specialUrl =
// "https://sparksgaming.challonge.com/users/untamedgamingfgc/tournaments";

async function getTournamentData(community: any) {
  const url = `https://challonge.com/communities/${community}/tournaments`;
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto(url);

  const clickFirstPopup = page
    .waitForSelector("button[onclick=\"__npcmp('save')\"]", {timeout: 5000})
    .then(() => page.click("button[onclick=\"__npcmp('save')\"]"))
    .catch((e) => console.log("First popup not found"));

  const clickSecondPopup = page
    .waitForSelector(".fc-cta-consent", {
      timeout: 5000,
    })
    .then(() => page.click(".fc-cta-consent"))
    .catch((e) => console.log("Second popup not found"));

  await Promise.race([clickFirstPopup, clickSecondPopup]);

  const data = await page.evaluate(() => {
    const tournamentUrl = Array.from(
      document.querySelectorAll(".tournament-block > a")
    );
    const urlFilter = tournamentUrl.map((url: any) => url.href);
    const set = new Set(urlFilter);
    const urls = Array.from(set);

    const tournamentCommunity = Array.from(
      document.querySelectorAll(".name > .text")
    );

    const tournamentStatus = Array.from(
      document.querySelectorAll(".ribbon-tag")
    );
    const tournamentTitle = Array.from(
      document.querySelectorAll(".details > h3")
    );
    const tournamentParticipants = Array.from(
      document.querySelectorAll(".item > .fa-user")
    );
    const tournamentStyle = Array.from(
      document.querySelectorAll(".item > .fa-trophy")
    );
    const tournamentGame = Array.from(
      document.querySelectorAll(".item > .fa-gamepad")
    );
    const tournamentDate = Array.from(
      document.querySelectorAll(".item > .fa-calendar")
    );
    const tournamentTime = Array.from(
      document.querySelectorAll(".item > .fa-clock")
    );

    const status = tournamentStatus.map((status) => status.textContent);
    const community = tournamentCommunity.map((community: any) =>
      community.parentElement.textContent.trim()
    );
    const title = tournamentTitle.map((title) => title.textContent);
    const participants = tournamentParticipants.map(
      (participant: any) => participant.parentElement.textContent
    );
    const style = tournamentStyle.map(
      (style: any) => style.parentElement.textContent
    );
    const game = tournamentGame.map(
      (game: any) => game.parentElement.textContent
    );
    const date = tournamentDate.map(
      (date: any) => date.parentElement.textContent
    );
    const time = tournamentTime.map(
      (time: any) => time.parentElement.textContent
    );

    const tournaments = urls.map((url, i) => ({
      url,
      community: community[i],
      status: status[i],
      title: title[i + 1],
      participants: participants[i],
      style: style[i],
      game: game[i],
      date: date[i],
      time: time[i],
    }));
    return tournaments.filter(
      (tournament) =>
        tournament.status !== "Completed" &&
        tournament.game === "Street Fighter 6"
    );
  });

  await browser.close();
  return data;
}

export default async function handler(req: any, res: any) {
  try {
    const promises = communities.map((community) =>
      getTournamentData(community)
    );
    const results = await Promise.allSettled(promises);
    const data = results
      .filter((result) => result.status === "fulfilled")
      .map((result: any) => result.value);
    res.status(200).json(data.flat());
  } catch (error) {
    console.error("Error fetching tournament data:", error);
    res.status(500).json({error: "Failed to fetch tournament data"});
  }
}
