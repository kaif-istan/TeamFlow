import { ModeToggle } from "@/components/ui/theme-toggle";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Overpowered Slack!!</h1>
      <ModeToggle />
    </div>
  );
}
