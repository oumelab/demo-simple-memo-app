import {Memo, Reply} from "@/types";
import {MessageCircle, Pen, X} from "lucide-react";
import {useState} from "react";
import DeleteAlert from "./delete-alert";
import Form from "./form";
import ReplyList from "./reply-list";
import {Button} from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type MemoListProps = {
  memos: Memo[];
  replys: Reply[];
  addReply: (content: string, parentId: number) => void;
  deleteMemo: (id: number) => void;
  deleteReply: (id: number) => void;
  updateMemo: (id: number, content: string) => void;
  updateReply: (id: number, content: string) => void;
  borderStyle?: boolean;
};

export default function MemoList({
  memos,
  replys,
  addReply,
  deleteMemo,
  deleteReply,
  updateMemo,
  updateReply,
}: MemoListProps) {
  const [onReplyIds, setOnReplyIds] = useState<number[]>([]);
  const [onEditMemoIds, setOnEditMemoIds] = useState<number[]>([]);
  const [onEditReplyIds, setOnEditReplyIds] = useState<number[]>([]);

  const filterReplys = (parentId: number) => {
    return replys.filter((reply) => reply.parentId === parentId);
  };

  return (
    <div className="max-w-2xl mt-12">
      {memos.map((memo) => (
        <div
          key={memo.id}
          className="bg-white rounded-lg border pt-4 pb-2 px-5 mb-8 shadow-sm"
        >
          <div className="text-muted-foreground flex justify-between items-center">
            <p>{memo.timestamp}</p>
            <div className="flex items-center">
              {!onEditMemoIds.includes(memo.id) && (
                <DeleteAlert
                  mode="memo"
                  memoId={memo.id}
                  handleDeleteMemo={() => deleteMemo(memo.id)}
                />
              )}
              <TooltipProvider>
                <Tooltip delayDuration={800} disableHoverableContent>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="py-0 text-emerald-500 cursor-pointer"
                      onClick={() => {
                        if (onEditMemoIds.includes(memo.id)) {
                          setOnEditMemoIds(
                            onEditMemoIds.filter((formId) => formId !== memo.id)
                          );
                        } else {
                          setOnEditMemoIds([...onEditMemoIds, memo.id]);
                        }
                      }}
                    >
                      {onEditMemoIds.includes(memo.id) ? (
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
                    {onEditMemoIds.includes(memo.id) ? (
                      <p>キャンセル</p>
                    ) : (
                      <p>編集</p>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="py-5 border-b whitespace-pre-wrap">
            {onEditMemoIds.includes(memo.id) ? (
              <Form
                mode="editMemo"
                initialValue={memo.content}
                memoId={memo.id}
                updateMemo={updateMemo}
                onEditMemoIds={onEditMemoIds}
                setOnEditMemoIds={setOnEditMemoIds}
                borderStyle
              />
            ) : (
              <>{memo.content}</>
            )}
          </div>
          {filterReplys(memo.id)?.map((reply) => (
            <ReplyList
              key={reply.id}
              reply={reply}
              deleteReply={deleteReply}
              updateReply={updateReply}
              onEditReplyIds={onEditReplyIds}
              setOnEditReplyIds={setOnEditReplyIds}
            />
          ))}
          <p className="mt-3">
            <TooltipProvider>
              <Tooltip delayDuration={800} disableHoverableContent>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-emerald-500 cursor-pointer"
                    onClick={() => {
                      if (onReplyIds.includes(memo.id)) {
                        setOnReplyIds(
                          onReplyIds.filter((formId) => formId !== memo.id)
                        );
                      } else {
                        setOnReplyIds([...onReplyIds, memo.id]);
                      }
                    }}
                  >
                    {onReplyIds.includes(memo.id) ? (
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
                  {onReplyIds.includes(memo.id) ? (
                    <p>キャンセル</p>
                  ) : (
                    <p>リプライ</p>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </p>
          {onReplyIds.includes(memo.id) && (
            <div className="my-4 ml-auto w-[calc(100%-2.5rem)]">
              <Form
                mode="reply"
                addReply={addReply}
                parentId={memo.id}
                onReplyIds={onReplyIds}
                setOnReplyIds={setOnReplyIds}
                placeholder="リプライを入力..."
                initialValue=""
                borderStyle
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
