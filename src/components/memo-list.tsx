import {Memo, Reply} from "@/types";
import {MessageCircle, Pen, X} from "lucide-react";
import {useState} from "react";
import DeleteAlert from "./delete-alert";
import Form from "./form";
import ReplyList from "./reply-list";
import {Button} from "./ui/button";
import clsx from "clsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type MemoListProps = {
  memos: Memo[];
  replys: Reply[];
  addContent: (content: string, parentId?: number) => void;
  deleteContent: (id: number, type: "memo" | "reply") => void;
  updateContent: (id: number, content: string, type: "memo" | "reply") => void;
  borderStyle?: boolean;
};

export default function MemoList({
  memos,
  replys,
  addContent,
  deleteContent,
  updateContent,
}: MemoListProps) {
  const [onReplyId, setOnReplyId] = useState<number | null>(null);
  const [onEditId, setOnEditId] = useState<{
    id: number;
    type: "memo" | "reply";
  } | null>(null);

  const filterReplys = (parentId: number) => {
    return replys.filter((reply) => reply.parentId === parentId);
  };

  return (
    <div className="max-w-2xl mt-12">
      {memos.map((memo) => (
        <div
          key={memo.id}
          className={clsx("bg-white rounded-lg border py-4 px-5 mb-8 shadow-sm", onEditId && "pb-6",)}
        >
          <div className="text-muted-foreground flex justify-between items-center">
            {!(onEditId?.type === "memo" && onEditId.id === memo.id) && (
              <p>{memo.timestamp}</p>
            )}
            {!onEditId && !onReplyId && (
              <div className="flex items-center">
                <DeleteAlert
                  memoId={memo.id}
                  handleDeleteContent={deleteContent}
                />
                <TooltipProvider>
                  <Tooltip delayDuration={800} disableHoverableContent>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="py-0 text-emerald-500 cursor-pointer"
                        onClick={() => {
                          setOnEditId({id: memo.id, type: "memo"});
                        }}
                      >
                        <Pen />
                        <span className="sr-only">編集</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>編集</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
          <div className="pt-3 pb-8 border-b">
            {onEditId?.type === "memo" && onEditId?.id === memo.id ? (
              <div className="flex gap-3">
                <div className="w-full sm:w-[500px]">
                <Form
                  mode="edit"
                  initialValue={memo.content}
                  memoId={memo.id}
                  updateContent={updateContent}
                  onEditId={onEditId}
                  setOnEditId={setOnEditId}
                  borderStyle
                />
                </div>
                <TooltipProvider>
                  <Tooltip delayDuration={800} disableHoverableContent>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="py-0 text-emerald-500 cursor-pointer"
                        onClick={() => {
                          setOnEditId(null);
                        }}
                      >
                        <X />
                        <span className="sr-only">編集</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>キャンセル</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ) : (
              <div className="whitespace-pre-wrap">{memo.content}</div>
            )}
          </div>
          {filterReplys(memo.id)?.map((reply) => (
            <ReplyList
              key={reply.id}
              reply={reply}
              onReplyId={onReplyId}
              deleteContent={deleteContent}
              updateContent={updateContent}
              onEditId={onEditId}
              setOnEditId={setOnEditId}
            />
          ))}
          {!onEditId && !onReplyId && (
            <p className="mt-2">
              <TooltipProvider>
                <Tooltip delayDuration={800} disableHoverableContent>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-emerald-500 cursor-pointer"
                      onClick={() => {
                        if (!onReplyId) {
                          setOnReplyId(memo.id);
                        } else {
                          setOnReplyId(null);
                        }
                      }}
                    >
                      {onReplyId === memo.id ? (
                        <>
                          <X />
                          <span className="sr-only">キャンセル</span>
                        </>
                      ) : (
                        <>
                          <MessageCircle />
                          <span className="sr-only">リプライ</span>
                        </>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {onReplyId === memo.id ? (
                      <p>キャンセル</p>
                    ) : (
                      <p>リプライ</p>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </p>
          )}
          {onReplyId === memo.id && (
            <div className="flex gap-2">
              <p className="mt-3">
                <TooltipProvider>
                  <Tooltip delayDuration={800} disableHoverableContent>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-emerald-500 cursor-pointer"
                        onClick={() => {
                          setOnReplyId(null);
                        }}
                      >
                        <X />
                        <span className="sr-only">キャンセル</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>キャンセル</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </p>
              <div className="mt-6 mb-2 ml-auto w-[calc(100%-2.5rem)]">
                <Form
                  mode="add"
                  addContent={addContent}
                  parentId={memo.id}
                  onReplyId={onReplyId}
                  setOnReplyId={setOnReplyId}
                  placeholder="リプライを入力..."
                  initialValue=""
                  borderStyle
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
