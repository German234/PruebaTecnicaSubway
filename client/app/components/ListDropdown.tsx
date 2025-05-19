
import { useLists } from "../hooks/useList";

interface ListDropdownProps {
  selectedListId: string | null;
  onListChange: (listId: string) => void;
}

export function ListDropdown({ selectedListId, onListChange }: ListDropdownProps) {
  const { data: lists, isLoading, error } = useLists();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onListChange(event.target.value);
  };

  return (
    <div className="mb-6">
      <label htmlFor="listDropdown" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        Selecciona una lista
      </label>
      {isLoading ? (
        <p className="text-gray-500 dark:text-gray-400">Cargando listas...</p>
      ) : error ? (
        <p className="text-red-500">Error al cargar listas</p>
      ) : (
        <select
          id="listDropdown"
          value={selectedListId ?? ""}
          onChange={handleChange}
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="" disabled>
            -- Selecciona una lista --
          </option>
          {lists?.map((list: any) => (
            <option key={list.id} value={list.id}>
              {list.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}