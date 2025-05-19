"use client";

import { useEffect, useState } from "react";
import { useListsStore } from "../../stores/listStore";
import ListCard from "../Cards/ListCard";
import ListModal from "../Modals/ListModal";

export default function ListContainer() {
  const lists = useListsStore((s) => s.lists);
  const isLoading = useListsStore((s) => s.isLoading);
  const error = useListsStore((s) => s.error);
  const fetchLists = useListsStore((s) => s.fetchlists);

  const [selectedId, setSelectedId] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-25 my-24">
        {lists.map((h) => (
          <ListCard
            key={h.id}
            list={h}
            onClick={() => {
              setSelectedId(h.id);
              setOpen(true);
            }}
          />
        ))}
      </div>

      <ListModal
        listId={selectedId}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
