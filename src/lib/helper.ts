export const transformOptions = (
    options: string[],
    iconMap?: Record<string, React.ComponentType<{ className?: string }>>
) =>
    options.map((value) => ({
        label: value
            .replace(/_/g, " ")
            .toLowerCase()
            .replace(/\b\w/g, (c) => c.toUpperCase()),
        value: value,
        icon: iconMap ? iconMap[value] : undefined,
    }));