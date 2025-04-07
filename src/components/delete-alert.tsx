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
import {Trash2} from "lucide-react";

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
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 cursor-pointer"
        >
          <Trash2 />
          <span className="sr-only">削除</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>削除しますか？</AlertDialogTitle>
          <AlertDialogDescription>
            この操作は取り消せません。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">キャンセル</AlertDialogCancel>

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
