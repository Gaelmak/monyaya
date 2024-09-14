export const timelineData = [
  {
    id: 1,
    title: "First event",
    date: "2022-01-01",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio euismod lacinia at quis risus sed vulputate odio ut. Quam viverra orci sagittis eu volutpat odio facilisis mauris.",
  },
  {
    id: 2,
    title: "Second event",
    date: "2022-02-01",
    description:
      "Aut eius excepturi ex recusandae eius est minima molestiae. Nam dolores iusto ad fugit reprehenderit hic dolorem quisquam et quia omnis non suscipit nihil sit libero distinctio. Ad dolorem tempora sit nostrum voluptatem qui tempora unde? Sit rerum magnam nam ipsam nesciunt aut rerum necessitatibus est quia esse non magni quae.",
  },
  {
    id: 3,
    title: "Third event",
    date: "2022-03-01",
    description:
      "Sit culpa quas ex nulla animi qui deleniti minus rem placeat mollitia. Et enim doloremque et quia sequi ea dolores voluptatem ea rerum vitae. Aut itaque incidunt est aperiam vero sit explicabo fuga id optio quis et molestiae nulla ex quae quam. Ab eius dolores ab tempora dolorum eos beatae soluta At ullam placeat est incidunt cumque.",
  },
];

export type TimelineData = (typeof timelineData)[number];

export interface TimelineElement {
  id: number;
  title: string;
  date: string;
  description: string;
}

export type DataConfig = typeof dataConfig;

export const dataConfig = {
  speicalTricks: [
    {
      id: crypto.randomUUID(),
      name: "The 900",
      points: 9000,
    },
    {
      id: crypto.randomUUID(),
      name: "Indy Backflip",
      points: 4000,
    },
    {
      id: crypto.randomUUID(),
      name: "Pizza Guy",
      points: 1500,
    },
    {
      id: crypto.randomUUID(),
      name: "360 Varial McTwist",
      points: 5000,
    },
    {
      id: crypto.randomUUID(),
      name: "Kickflip Backflip",
      points: 3000,
    },
    {
      id: crypto.randomUUID(),
      name: "FS 540",
      points: 4500,
    },
    {
      id: crypto.randomUUID(),
      name: "Ghetto Bird",
      points: 3500,
    },
    {
      id: crypto.randomUUID(),
      name: "Casper Flip 360 Flip",
      points: 2500,
    },
  ],
};
