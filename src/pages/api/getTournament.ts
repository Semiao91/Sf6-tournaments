import puppeteer from "puppeteer";

const communities = ["C2C", "Saltmineleague", "WolfTV", "2BeCommUnity"];
const communinittiesSub = ["saltyeu", "newchallenger"];
const url = "https://challonge.com/communities/" + communities + "/tournaments";
// const urlSub = "https://" + communinittiesSub[0] + ".challonge.com/";
// const specialUrl =
// "https://sparksgaming.challonge.com/users/untamedgamingfgc/tournaments";

async function getTournamentData(req: any, res: any) {
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
    const url = Array.from(set);

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

    const status = tournamentStatus.map((status: any) => status.textContent);
    const title = tournamentTitle.map((title: any) => title.textContent);
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

    const tournaments = status.map((status, i) => ({
      url: url[i],
      status,
      title: title[i + 1],
      participants: participants[i],
      style: style[i],
      game: game[i],
      date: date[i],
      time: time[i],
    }));
    return tournaments.filter(
      (tournament) => tournament.status !== "Completed"
    );
  });

  await browser.close();
  return data;
}

export default async function handler(req: any, res: any) {
  try {
    const data = await getTournamentData(req, res);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching tournament data:", error);
    res.status(500).json({error: "Failed to fetch tournament data"});
  }
}
