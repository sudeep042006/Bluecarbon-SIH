import Link from 'next/link';
import { Leaf, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type SiteHeaderProps = {
  onLogin: () => void;
  onRegister: () => void;
  onCorporateLogin: () => void;
};

export function SiteHeader({ onLogin, onRegister, onCorporateLogin }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg">Blue Carbon Registry</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" onClick={onLogin}>
            NGO Login
          </Button>
          <Button onClick={onRegister} className="hidden sm:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground">
            Register NGO
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Briefcase className="mr-2" /> Corporate
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={onCorporateLogin}>
                    Corporate Login
                </DropdownMenuItem>
                 <DropdownMenuItem onClick={() => onRegister()}>
                    Register Corporate
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
