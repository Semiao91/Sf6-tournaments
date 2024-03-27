import { CardContent, Card } from "@/components/component/ui/card";
import { CardSfProps } from './cardComponent';
import { Badge } from "@/components/component/ui/badge";
import Image from "next/image";

interface OfflineCard {
    community: string,
    url: string,

}
const OfflineCard: React.FC<CardSfProps> = ({
    community,
    url
}) => {
    const getImage = (community: string) => {

        switch (true) {
            case community === "saltyeu":
                return '/salty.png';
            case community === "Saltmineleague":
                return '/sml.png';
            case community === "C2C":
                return '/c2c.png';
            case community === "2BeCommUnity":
                return '/2bcu.jpg';
            case community === "WolfTV":
                return '/wolftv.png';
            case community === "newchallenger":
                return '/new.png';
            default:
                return '/sfbg.webp';
        }
    };

    const getUrl = (community: string) => {
        switch (true) {
            case community === "saltyeu":
                return 'https://saltyeu.challonge.com/';
            case community === "Saltmineleague":
                return "https://challonge.com/communities/saltmineleague";
            case community === "C2C":
                return "https://challonge.com/communities/C2C";
            case community === "2BeCommUnity":
                return "https://challonge.com/communities/2BeCommUnity";
            case community === "WolfTV":
                return "https://challonge.com/communities/WolfTV";
            case community === "newchallenger":
                return 'https://newchallenger.challonge.com/';
            default:
                return "https://challonge.com/dashboard";
        }
    }

    return (
        <a href={getUrl(community)} target="_blank" rel="noopener noreferrer" >
            <Card className="w-[328px] h-[354px] bg-[#0c0a09]  rounded-lg overflow-hidden border-2 border-[#27272a]">
                <div className="relative">
                    <Image
                        alt="Card image"
                        className="w-full opacity-60"
                        height="100"
                        src={getImage(community)}
                        style={{
                            aspectRatio: "328/100",
                            objectFit: "cover",
                        }}
                        width="328"
                    />
                    <Badge className="absolute top-2 right-2 bg-red-500" variant="secondary">
                        Offline
                    </Badge>
                </div>

                <CardContent className="p-4 text-[#a59f9c]">
                    <h2 className="text-lg font-semibold h-[56px] text-[#fafaf9]">{community} is offline</h2>
                    <div className="flex items-center mt-4 space-x-2 text-sm">
                        <span>Check back later</span>
                    </div>
                </CardContent>
            </Card>
        </a>
    );
}

export default OfflineCard;

