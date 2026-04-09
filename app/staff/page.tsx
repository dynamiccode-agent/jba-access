import StaffClient from "./StaffClient";
import tokens from "@/app/data/tokens.json";

export default function StaffPage() {
  const allCodes = Object.values(
    tokens as Record<string, { code: string; label: string }>
  ).map((t) => t.code);

  return <StaffClient codes={allCodes} />;
}
