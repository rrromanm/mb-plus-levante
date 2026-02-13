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
import { Trash2 } from "lucide-react";

interface IProps {
    onDelete: (id: number) => Promise<void>;
    car: {
        id: number;
        brand: string;
        model: string;
    }
}

export default function DeleteCarDialog(IProps: IProps) {
    const { onDelete, car } = IProps;
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Trash2 color="black" className="w-4 h-4 cursor-pointer" />
        </AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Eliminar {car.brand} {car.model}?
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel variant="outline" size="sm">
              Cancelar
            </AlertDialogCancel>

            <AlertDialogAction
              variant="destructive"
              size="sm"
              onClick={() => onDelete(car.id)}
            >
              Si, eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
