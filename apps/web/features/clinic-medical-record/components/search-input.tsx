import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";

interface SearchMedicalRecordInputProps {
  onChange: (value: string) => unknown;
}

export function SearchMedicalRecordInput({
  onChange,
}: SearchMedicalRecordInputProps): React.JSX.Element {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const onChangeRef =
    useRef<SearchMedicalRecordInputProps["onChange"]>(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    onChangeRef.current(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <Input
      className="py-2 h-fit"
      onChange={(e) => {
        setSearch(e.target.value);
      }}
      placeholder="Cari berdasarkan nama, nomor rekam medis, atau tempat tinggal"
      value={search}
    />
  );
}
