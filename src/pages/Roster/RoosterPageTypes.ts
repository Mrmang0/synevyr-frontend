export type GuildMember = {
  name: string;
  image: string;
  rank: string;
  rio: number;
  characterClass: string;
  spec: string;
  itemLevel: number;
};

export type RosterPageState = {
  roster: GuildMember[];
  isDescending: boolean;
  search: string;
  sortField:
    | "Name"
    | "Image"
    | "Rank"
    | "Rio"
    | "CharacterClass"
    | "Spec"
    | "ItemLevel";
};
