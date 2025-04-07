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
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type DeleteAlertProps =
  | {
      mode: "memo";
      memoId: number;
      handleDeleteMemo: (id: number) => void;
      handleDeleteReply?: undefined;
      replyId?: undefined;
    }
  | {
      mode: "reply";
      replyId: number;
      handleDeleteReply: (id: number) => void;
      handleDeleteMemo?: undefined;
      memoId?: undefined;
    };

export default function DeleteAlert({
  mode,
  handleDeleteMemo,
  handleDeleteReply,
  memoId,
  replyId,
}: DeleteAlertProps) {
  const actionButtonStyle = "bg-emerald-600 text-white cursor-pointer";

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
                  "hover:bg-white": mode === "reply",
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

          {mode === "memo" && (
            <AlertDialogAction asChild>
              <Button
                className={actionButtonStyle}
                onClick={() => {
                  handleDeleteMemo(memoId);
                }}
              >
                削除する
              </Button>
            </AlertDialogAction>
          )}
          {mode === "reply" && (
            <AlertDialogAction asChild>
              <Button
                className={actionButtonStyle}
                onClick={() => {
                  handleDeleteReply(replyId);
                }}
              >
                削除する
              </Button>
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}