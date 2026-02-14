import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CircleCheck, Trash2 } from "lucide-react";

interface IProps {
    onSold: (id: number) => Promise<void>;
    car: {
        id: number;
        brand: string;
        model: string;
    }
}

export default function SoldCarDialog({ onSold, car }: IProps) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <CircleCheck color="black" className="w-4 h-4 cursor-pointer" />
        </AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Marcar {car.brand} {car.model} como vendido?
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel variant="outline" size="sm">
              Cancelar
            </AlertDialogCancel>

            <AlertDialogAction
              variant="success"
              size="sm"
              onClick={() => onSold(car.id)}
            >
              Vendido
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
