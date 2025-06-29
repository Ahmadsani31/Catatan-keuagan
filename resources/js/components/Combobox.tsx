import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"

type Combobox = {
    title: string
    placeholder: string
    items: ComboboxItem[]
    onChange: (value: string) => void
}

type ComboboxItem = {
    value: number
    label: string
}


export function Combobox({ title, items, placeholder, onChange }: Combobox) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    return (
        <div>
            <Popover open={open} onOpenChange={setOpen}>
                <label htmlFor={title} className="block text-sm font-medium mb-2">
                    {title}
                </label>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-start text-left font-normal"
                    >
                        {value
                            ? items.find((framework) => framework.value.toString() === value)?.label
                            : `Select ${placeholder}...`}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-96 p-0">
                    <Command>
                        <CommandInput placeholder={`Search ${placeholder}...`} className="h-9" />
                        <CommandList>
                            <CommandEmpty>data not found.</CommandEmpty>
                            <CommandGroup>
                                {items.map((framework) => (
                                    <CommandItem
                                        key={framework.value}
                                        value={framework.value.toString()}
                                        onSelect={(currentValue) => {
                                            onChange(currentValue === value ? "" : currentValue)
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                        }}
                                    >
                                        {framework.label}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                value === framework.value.toString() ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
