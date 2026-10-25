import { Archivo, Source_Serif_4 } from "next/font/google";

// The Hurdles brand faces: Archivo for headings and labels, Source Serif 4 for reading.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--display-face",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--serif-face",
});

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${archivo.variable} ${sourceSerif.variable}`}>{children}</div>;
}
