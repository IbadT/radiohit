declare global {
    interface Window {
        ym: (id: number, event: string, goal: string) => void;
    }
}
export {};