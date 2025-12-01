"use client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getUserAvatar } from "@/lib/get-avatar";
import { orpc } from "@/lib/orpc";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";



const WorkspaceMembersList = () => {
    const { data: { members } } = useSuspenseQuery(orpc.channel.list.queryOptions())
    return (
        <div className="space-y-0.5 py-1">
            {members.map((member) => (
                <div className="px-3 py-2 hover:bg-accent cursor-pointer transittion-colors flex items-center space-x-3" key={member.id}>
                    <div className="relative">
                        <Avatar>
                            <Image
                                src={getUserAvatar(member.picture ?? null, member.email!)}
                                alt={member.full_name!}
                                className="object cover"
                                fill
                            />
                            <AvatarFallback>{member.full_name?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{member.full_name}</p>
                        <p className="text-sm text-muted-foreground truncate">{member.email}</p>
                    </div>
                </div>
            ))}

        </div>
    );
};

export default WorkspaceMembersList;