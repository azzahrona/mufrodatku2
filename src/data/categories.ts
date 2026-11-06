export type Category = {
  id: string;
  name: string;
  arabic: string;
  description: string;
  emoji: string;
  color: string;
  accent: string;
};

export const categories: Category[] = [
  {
    "id": "buah",
    "name": "Buah-buahan",
    "arabic": "الْفَوَاكِهُ",
    "description": "Kenali nama buah yang sering kamu temui.",
    "emoji": "🍎",
    "color": "#FFE7DF",
    "accent": "#E36C50"
  },
  {
    "id": "hewan",
    "name": "Hewan",
    "arabic": "الْحَيَوَانَاتُ",
    "description": "Belajar nama hewan di sekitar kita.",
    "emoji": "🐘",
    "color": "#E5F2FF",
    "accent": "#4D8CCB"
  },
  {
    "id": "tubuh",
    "name": "Anggota tubuh",
    "arabic": "أَعْضَاءُ الْجِسْمِ",
    "description": "Kenali bagian-bagian tubuh manusia.",
    "emoji": "👀",
    "color": "#FCE8F1",
    "accent": "#C45B91"
  },
  {
    "id": "kelas",
    "name": "Benda di kelas",
    "arabic": "أَدَوَاتُ الْفَصْلِ",
    "description": "Pelajari benda yang ada di ruang kelas.",
    "emoji": "✏️",
    "color": "#FFF2D8",
    "accent": "#C28B2C"
  },
  {
    "id": "warna",
    "name": "Warna",
    "arabic": "الْأَلْوَانُ",
    "description": "Kenali berbagai warna dalam Bahasa Arab.",
    "emoji": "🎨",
    "color": "#E8F5E8",
    "accent": "#4D9860"
  },
  {
    "id": "keluarga",
    "name": "Keluarga",
    "arabic": "الْأُسْرَةُ",
    "description": "Belajar sebutan anggota keluarga.",
    "emoji": "👨‍👩‍👧",
    "color": "#EEE9FF",
    "accent": "#8066C7"
  }
];
