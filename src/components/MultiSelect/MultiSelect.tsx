"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "../ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"


const members = [
    "Peter", "Anteater", "Banteater", "Canteater"
];

export function MultiSelect() {
    const [open, setOpen] = React.useState(false)
    const [selectedMembers, setSelectedMembers] = React.useState<string[]>([])

    const handleSelect = (member: string) => {
        if (selectedMembers.includes((member))){
            setSelectedMembers(selectedMembers.filter(members => members !== member))
        } else {
            setSelectedMembers([...selectedMembers, member])
        }
    }

    React.useEffect(() => {
        console.log(selectedMembers);
    }, [selectedMembers]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                >
                    Select Members
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-full">
                <Command>
                    <CommandInput placeholder="Search Members" />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandSeparator />
                        <CommandGroup heading="Settings">
                            {members.map((member) => (
                                <CommandItem
                                    key={member}
                                    onSelect={() => {
                                        handleSelect(member);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedMembers.includes( member) ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {member}
                                </CommandItem>
                            ))}

                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default MultiSelect;