"use client"

import React, {useEffect, useState} from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "../../../lib/utils"
import { Button } from "../../../components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "../../../components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../../components/ui/popover"

import {supabase} from "../../../config/supabase";


export function MemberSelect() {

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


    const fetchMembers = async () => {
        const {
            data,
            error
        } = await supabase.from("UsersInOrganizations").select("*").eq("organization_id", "cc2bde6a-2087-49d3-bb39-16d6eab68d7e");

        console.log("Members response:", {data, error});

        if (error) {
            console.error("Error fetching data:", error);
        } else {
            console.log(data);
            memberIdsToDisplayNames();
            // setMembers(???);
        }
        setLoading(false);

    }

    const  memberIdsToDisplayNames = () => {
        //
        /*
        TODO:
            现在 fetchMembers() 拿到的是这样的数据: [
                { user_id: "f43e36f4-fa3e-4a1d-b84a-e5dbea4f4309",
                  organization_id: "cc2bde6a-2087-49d3-bb39-16d6eab68d7e",
                  link_id: 2 },
                { user_id: "4a626e13-ed0a-45e6-bdaf-27a54c12d47c",
                  organization_id: "cc2bde6a-2087-49d3-bb39-16d6eab68d7e",
                  link_id: 3 }
                 ]
            需要通过 user_id 访问database拿到用户的 Display Name
            然后把Display Name放到members里面

            之后有更多需求但是目前需要完成这个



         */
    }


    const loadMembers = () => {
        fetchMembers();
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

export default MemberSelect;