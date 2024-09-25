import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react"; // Ajout de useEffect et useState

export default function TableUser() {
  const [users, setUsers] = useState([]); // État pour stocker les utilisateurs

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users"); // Remplacez 1 par l'ID utilisateur approprié
      const data = await response.json();
      setUsers(data); // Met à jour l'état avec les données récupérées
    };

    fetchUsers();
  }, []);

  return (
    <Table>
      <TableCaption>
        La liste de tout les utilisateurs disponible dans le systeme.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length > 0
          ? users.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.invoice}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.method}</TableCell>
                <TableCell className="text-right">{item.amount}</TableCell>
              </TableRow>
            ))
          : null}
      </TableBody>
    </Table>
  );
}
