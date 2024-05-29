"use client"

import React, {useEffect, useState} from "react"
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

import {supabase} from "../../config/supabase";
import Project from "@/src/types/Project";


export function MultiSelect() {

    const [members, setMembers] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [open, setOpen] = useState(false)
    const [selectedMembers, setSelectedMembers] = useState<string[]>([])

    const handleSelect = (member: string) => {
        if (selectedMembers.includes((member))){
            setSelectedMembers(selectedMembers.filter(members => members !== member))
        } else {
            setSelectedMembers([...selectedMembers, member])
        }
    }

    // React.useEffect(() => {
    //     console.log(selectedMembers);
    // }, [selectedMembers]);


    const fetchMembers = async () => {
        const {
            data,
            error
        } = await supabase.from("UsersInOrganizations").select("*").eq("organization_id", "cc2bde6a-2087-49d3-bb39-16d6eab68d7e");

        console.log("Supabase response:", {data, error});

        if (error) {
            console.error("Error fetching data:", error);
        } else {
            console.log(data);
            setMembers(data as string[]);
        }
        setLoading(false);

    }


    const loadMembers = () => {
        if (members!.length) {
            fetchMembers();
        }
    }



    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                    onClick={loadMembers}
                >
                    Select Members
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button >
            </PopoverTrigger>
            <PopoverContent className="p-0 w-full">
                <Command>
                    <CommandInput placeholder="Search Members" />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandSeparator />
                        <CommandGroup heading="Members">
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