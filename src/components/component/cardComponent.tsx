import { Badge } from "@/components/component/ui/badge";
import { CardContent, Card } from "@/components/component/ui/card";

interface CardSfProps {
  status: string
  title: string;
  participants: string,
  style: string,
  game: string,
  date: string,
  time: string;
}

const CardSf: React.FC<CardSfProps> = ({
  status,
  title,
  participants,
  style,
  game,
  date,
  time
}) => {

  const moment = require('moment-timezone');
  const formattedDate = moment(date).format('ddd, MMM D, YYYY');
  return (
    <a target="_blank" rel="noopener noreferrer" className="no-underline">
      <Card key={title} className="w-[328px] bg-[#242424] text-white rounded-lg overflow-hidden">
        <div className="relative">
          <img
            alt="Card image"
            className="w-full opacity-60"
            height="100"
            src="/sml_start2.png"
            style={{
              aspectRatio: "328/100",
              objectFit: "cover",
            }}
            width="328"
          />
          <Badge className="absolute top-2 right-2" variant="secondary">
            {status}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex items-center mt-4 space-x-2 text-sm">
            <UsersIcon className="text-[#71717A]" />
            <span>{participants}</span>
          </div>
          <div className="flex items-center mt-2 space-x-2 text-sm">
            <RepeatIcon className="text-[#71717A]" />
            <span>{style}</span>
          </div>
          <div className="flex items-center mt-2 space-x-2 text-sm">
            <GamepadIcon className="text-[#71717A]" />
            <span>{game}</span>
          </div>
          <div className="flex items-center mt-2 space-x-2 text-sm">
            <CalendarIcon className="text-[#71717A]" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center mt-2 space-x-2 text-sm">
            <ClockIcon className="text-[#71717A]" />
            <span>{time}</span>
          </div>
        </CardContent>
      </Card>
    </a>
  );
};

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function RepeatIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

function GamepadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="6" x2="10" y1="12" y2="12" />
      <line x1="8" x2="8" y1="10" y2="14" />
      <line x1="15" x2="15.01" y1="13" y2="13" />
      <line x1="18" x2="18.01" y1="11" y2="11" />
      <rect width="20" height="12" x="2" y="6" rx="2" />
    </svg>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export default CardSf;
