import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

const members = [
    {
        id: 1,
        name: "Md Kaif",
        imageUrl: "https://avatars.githubusercontent.com/u/124599?v=4",
        email: "kaifbiber@gmail.com"
    },
]

const WorkspaceMembersList = () => {
    return (
        <div className="space-y-0.5 py-1">
            {members.map((member) => (
                <div className="px-3 py-2 hover:bg-accent cursor-pointer transittion-colors flex items-center space-x-3" key={member.id}>
                    <div className="relative">
                        <Avatar>
                            <Image
                                src={member.imageUrl}
                                alt={member.name}
                                className="object cover"
                                fill
                            />
                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{member.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{member.email}</p>
                    </div>
                </div>
            ))}

        </div>
    );
};

export default WorkspaceMembersList;