import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import clsx from "clsx";
import {Trash2} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type DeleteAlertProps = {
  memoId?: number;
  replyId?: number;
  handleDeleteContent: (id: number, type: "memo" | "reply") => void;
};
export default function DeleteAlert({
  memoId,
  replyId,
  handleDeleteContent,
}: DeleteAlertProps) {

  return (
    <AlertDialog>
      <TooltipProvider>
        <Tooltip delayDuration={800}>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={clsx("text-red-500 cursor-pointer", {
                  "hover:bg-white": replyId && "reply",
                })}
              >
                <Trash2 />
                <span className="sr-only">削除</span>
              </Button>
            </AlertDialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>削除</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>削除しますか？</AlertDialogTitle>
          <AlertDialogDescription>
            この操作は取り消せません。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            キャンセル
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className="bg-emerald-600 text-white cursor-pointer"
              onClick={() => {
                const type = memoId ? "memo" : "reply";
                handleDeleteContent(memoId ?? replyId ?? 0, type);
              }}
            >
              削除する
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
