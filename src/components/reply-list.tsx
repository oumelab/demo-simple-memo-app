import { Reply } from "@/types";
import { Pen, X } from "lucide-react";
import DeleteAlert from "./delete-alert";
import Form from "./form";
import { Button } from "./ui/button";
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
        <p className="flex items-center">
          {!onEditReplyIds.includes(reply.id) && (
            <DeleteAlert
            mode="reply"
            replyId={reply.id}
            handleDeleteReply={deleteReply}
            />
          )}
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
              </>
            ) : (
              <>
                <Pen />
              </>
            )}
            <span className="sr-only">Edit</span>
          </Button>
        </p>
      </div>
      <div className="mt-5 whitespace-pre-wrap">
        {onEditReplyIds.includes(reply.id) ? (
          <Form
            mode = "editReply"
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
