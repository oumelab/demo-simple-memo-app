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
  deleteContent: (id: number, type: "memo" | "reply") => void;
  updateContent: (id: number, content: string, type: "memo" | "reply") => void;
  borderStyle?: boolean;
  onReplyId: number | null;
  onEditId: {id: number; type: "memo" | "reply"} | null;
  setOnEditId: React.Dispatch<
    React.SetStateAction<{id: number; type: "memo" | "reply"} | null>
  >;
};

export default function ReplyList({
  reply,
  deleteContent,
  updateContent,
  onReplyId,
  onEditId,
  setOnEditId,
}: ReplyListProps) {
  return (
    <div
      key={reply.id}
      className="w-[calc(100%-2.5rem)] ml-auto mt-6 rounded-md bg-muted pt-3 pb-6 px-5"
    >
      <div className="text-muted-foreground flex justify-between items-center">
        {!(onEditId?.type === "reply" && onEditId.id === reply.id) && (
          <p>{reply.timestamp}</p>
        )}
        {!onEditId && !onReplyId && (
          <div className="flex items-center">
            <DeleteAlert
              replyId={reply.id}
              handleDeleteContent={deleteContent}
            />
            <TooltipProvider>
              <Tooltip delayDuration={800} disableHoverableContent>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="py-0 text-emerald-500 cursor-pointer hover:bg-white"
                    onClick={() => {
                      setOnEditId({id: reply.id, type: "reply"});
                    }}
                  >
                    <Pen />
                    <span className="sr-only">編集</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>編集</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
      {onEditId?.type === "reply" && onEditId?.id === reply.id ? (
        <div className="mt-3 flex gap-3">
          <div className="flex-1">
          <Form
            mode="edit"
            initialValue={reply.content}
            replyId={reply.id}
            updateContent={updateContent}
            onEditId={onEditId}
            setOnEditId={setOnEditId}
            borderStyle
          />
          </div>
          <div>
            <TooltipProvider>
              <Tooltip delayDuration={800} disableHoverableContent>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="py-0 text-emerald-500 cursor-pointer hover:bg-white"
                    onClick={() => {
                      setOnEditId(null);
                    }}
                  >
                    <X />
                    <span className="sr-only">キャンセル</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  キャンセル
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      ) : (
        <div className="mt-3 whitespace-pre-wrap">{reply.content} </div>
      )}
    </div>
  );
}
