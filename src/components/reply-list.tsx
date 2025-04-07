import {Reply} from "@/types";
import {Pen, X} from "lucide-react";
import DeleteAlert from "./delete-alert";
import Form from "./form";
import {Button} from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type ReplyListProps = {
  reply: Reply;
  deleteReply: (id: number) => void;
  updateReply: (id: number, content: string) => void;
  borderStyle?: boolean;
  onEditReplyIds: number[];
  setOnEditReplyIds: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function ReplyList({
  reply,
  deleteReply,
  updateReply,
  onEditReplyIds,
  setOnEditReplyIds,
}: ReplyListProps) {
  return (
    <div
      key={reply.id}
      className="w-[calc(100%-2.5rem)] ml-auto mt-5 rounded-md bg-muted pt-4 pb-5 px-5"
    >
      <div className="text-muted-foreground flex justify-between items-center">
        <p>{reply.timestamp}</p>
        <div className="flex items-center">
          {!onEditReplyIds.includes(reply.id) && (
            <DeleteAlert
              mode="reply"
              replyId={reply.id}
              handleDeleteReply={deleteReply}
            />
          )}
          <TooltipProvider>
            <Tooltip delayDuration={800} disableHoverableContent>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="py-0 text-emerald-500 cursor-pointer hover:bg-white"
                  onClick={() => {
                    if (onEditReplyIds.includes(reply.id)) {
                      const newOnEditReplyIds = onEditReplyIds.filter(
                        (formId) => formId !== reply.id
                      );
                      setOnEditReplyIds(newOnEditReplyIds);
                    } else {
                      setOnEditReplyIds([...onEditReplyIds, reply.id]);
                    }
                  }}
                >
                  {onEditReplyIds.includes(reply.id) ? (
                    <>
                      <X />
                      <span className="sr-only">キャンセル</span>
                    </>
                  ) : (
                    <>
                      <Pen />
                      <span className="sr-only">編集</span>
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {onEditReplyIds.includes(reply.id) ? "キャンセル" : "編集"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="mt-5 whitespace-pre-wrap">
        {onEditReplyIds.includes(reply.id) ? (
          <Form
            mode="editReply"
            initialValue={reply.content}
            replyId={reply.id}
            updateReply={updateReply}
            onEditReplyIds={onEditReplyIds}
            setOnEditReplyIds={setOnEditReplyIds}
            borderStyle
          />
        ) : (
          <>{reply.content}</>
        )}
      </div>
    </div>
  );
}
