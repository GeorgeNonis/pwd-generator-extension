export interface InitialState {
  component: string;
  history: boolean;
  pwds: string[];
  theme: "light" | "dark";
  excludeAmbiguous: boolean;
}
