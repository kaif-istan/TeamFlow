import WorkspaceHeader from "./_components/WorkspaceHeader";
import { CreateNewChannel } from "./_components/CreateNewChannel";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import ChannelList from "./_components/ChannelList";
import WorkspaceMembersList from "./_components/WorkspaceMembersList";


const ChannelListLayout = () => {

  return (
    <>
      <div className="flex flex-col h-full w-80 bg-secondary border-r border-border">
        <div className="flex flex-col h-full">
          <div className="flex items-center px-4 h-14 border-b border-border">
            <WorkspaceHeader />
          </div>
          <div className="px-4 py-2 ">
            <CreateNewChannel />
          </div>
          {/* Channel list */}
          <div className="flex-1 overflow-y-auto px-4">
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full px-2 py-1 text-sm font-medium text-muted-foreground hover:text-accent-foreground">
                Main
                <ChevronDown />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ChannelList />
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Members list */}
          <div className="px-4 py-2 border-t border-border">
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full px-2 py-1 text-sm font-medium text-muted-foreground hover:text-accent-foreground [&[data-state=open]>svg]:rotate-180 transition-all duration-200">
                Members
                <ChevronUp />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <WorkspaceMembersList />
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChannelListLayout;