// Combobox.tsx
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Combobox: React.FC<ComboboxProps> = ({
  options,
  value,
  onChange,
  placeholder,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (option: ComboboxOption) => {
    onChange(option.value);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? options.find((option) => option.value === value)?.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  const selectedOption = options.find((option) => option.value === currentValue);
                  if (selectedOption) {
                    handleSelect(selectedOption);
                  }
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};


// --------------------------------------------------------------
// Example usage
// --------------------------------------------------------------
/**
 *
/**
 * An array of framework options
 * @typedef {Object[]} FrameworkOptions
 * @property {string} value - The value of the framework (e.g. "next.js")
 * @property {string} label - The display label of the framework (e.g. "Next.js")

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },

];

/**
 * State variable to store the selected framework
 * @type {string}


const [selectedFramework, setSelectedFramework] = React.useState('');

/**
 * Combobox component
 * @param {FrameworkOptions} options - The array of framework options
 * @param {string} value - The currently selected framework value
 * @param {(value: string) => void} onChange - Callback function to handle changes to the selected framework
 * @param {string} placeholder - The placeholder text to display when no option is selected


<Combobox
  options={frameworks}
  value={selectedFramework}
  onChange={(value) => setSelectedFramework(value)}
  placeholder='Select a framework...'
/>
*/
