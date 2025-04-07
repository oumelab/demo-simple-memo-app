import {Reply} from "@/types";
import {Button} from "./ui/button";
import {Trash2, X, Pen} from "lucide-react";
import Form from "./form";
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
  borderStyle,
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
            <Button
              size="icon"
              variant="ghost"
              className="text-red-500 cursor-pointer hover:bg-white"
              onClick={() => deleteReply(reply.id)}
            >
              <Trash2 />
              <span className="sr-only">Delete</span>
            </Button>
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
      <div className="mt-5">
        {onEditReplyIds.includes(reply.id) ? (
          <Form
            initialValue={reply.content}
            replyId={reply.id}
            updateReply={updateReply}
            onEditReplyIds={onEditReplyIds}
            setOnEditReplyIds={setOnEditReplyIds}
            borderStyle={borderStyle}
          />
        ) : (
          <>{reply.content}</>
        )}
      </div>
    </div>
  );
}
